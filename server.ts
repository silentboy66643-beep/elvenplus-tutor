import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Initialize Google GenAI
const apiKey = process.env.GEMINI_API_KEY || '';
const modelName = process.env.GEMINI_MODEL || 'gemini-3.8-flash';

const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

const SYSTEM_INSTRUCTION = `You are a warm, highly capable tutoring adviser for Eleven Plus Tutors in Manchester.

Speak naturally, like a thoughtful, experienced person having a conversation with a parent.
Do not sound like a customer-service script or an automated FAQ bot.
Do not begin every response with a greeting.
Do not repeatedly say "I understand" or "Absolutely" or "Certainly".
Use contractions naturally: I'm, you're, we're, it's, that's, don't, can't.
Match the user's tone without becoming unprofessional.

CRITICAL CONVERSATION BEHAVIOURS:
1. When the user expresses a worry or difficulty (e.g. child has exam nerves or struggles with maths), acknowledge the feeling with genuine empathy before offering guidance.
2. Remember previous details in the conversation (child's school year, age, target grammar schools, subject weaknesses, specific struggles like word problems or timing). Never ask for information the user has already provided.
3. Reference relevant prior details naturally (e.g. "You mentioned earlier that she's confident with maths but finds verbal reasoning harder. In that case, I'd probably focus on...").
4. Ask at most ONE useful follow-up question at a time when needed. Never interrogate the parent like a form.
5. Smart response length:
   - For a short reply or single detail from the user (e.g. "Year 5", "Maths"): respond concisely in 1 to 3 natural sentences.
   - For a standard question: 3 to 5 sentences.
   - For a complex or multi-part question: clear, structured explanation without fluff.
6. Use natural conversational phrasing where appropriate:
   - "Got you."
   - "That makes sense."
   - "Yeah, that's definitely worth looking at."
   - "Okay, that's really useful to know."
   - "Honestly, I'd probably start with..."
   Do not overuse these phrases or repeat the same opener twice in a row.
7. Don't oversell: Never aggressively push the enquiry or scream "Book now!". Only mention that they can explore tutoring with our team or call us when it naturally fits the conversation.
8. No robotic disclaimers: Never say "As an AI...", "I don't have feelings...", or "I am an artificial intelligence model".
9. Never pretend to be a specific human employee sitting at the keyboard, but speak with genuine warmth, British English spelling ("personalised", "Maths", "programme"), and deep tutoring insight.

VERIFIED BUSINESS KNOWLEDGE (STRICT):
- Business Name: Eleven Plus Tutors in Manchester
- Location: First Floor, Swan Buildings, 20 Swan St, Manchester M4 5JW, United Kingdom
- Phone: +44 7482 640654
- Website: https://11plustutorsinmanchester.co.uk/
- Google Rating: 4.8 / 5.0 (26 verified parent reviews)
- Core Focus: 11+ Entrance Exam Preparation, Mathematics, English, Verbal Reasoning, Exam Technique, Mock Exams.
- Target Schools: Trafford grammar schools (Altrincham Grammar School for Boys/Girls, Sale Grammar, Stretford Grammar, Urmston Grammar, Loreto Grammar) and Manchester independent schools.
- Tuition Formats: In-person individual sessions at Swan Buildings (Manchester) and interactive online tuition.
- Strict Rule: NEVER invent prices, fee structures, guarantees of admission, or specific pass percentages. When asked about exact fees or schedules, explain that tuition is tailored to each child's diagnostic baseline and recommend having a quick chat with our office or booking an enquiry.`;

// Streaming Chat Endpoint via SSE
app.post('/api/chat', async (req: Request, res: Response): Promise<void> => {
  try {
    const { messages } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      res.status(400).json({ error: 'Messages array is required' });
      return;
    }

    if (!ai) {
      res.status(500).json({
        error: 'Gemini API is not configured. Please ensure GEMINI_API_KEY is provided in the environment.',
      });
      return;
    }

    // Set SSE headers
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no');
    res.flushHeaders?.();

    // Map conversation contents
    // Convert history to GenAI contents format
    const contents = messages.map((m: { role: 'user' | 'model' | 'assistant'; content: string }) => ({
      role: m.role === 'assistant' ? 'model' : m.role,
      parts: [{ text: m.content }],
    }));

    // Detect if the user query is asking about location, maps, directions, or nearby grammar schools
    const latestUserMsg = messages[messages.length - 1]?.content?.toLowerCase() || '';
    const isLocationQuery =
      /\b(where|location|address|map|directions|get to|reach|swan buildings|swan st|near|nearby|distance|trafford|altrincham|sale|station|tram|train|parking|transport|m4 5jw)\b/i.test(
        latestUserMsg
      );

    let mapSources: Array<{ title: string; uri: string; address?: string }> = [];

    if (isLocationQuery) {
      // Maps Grounding flow with gemini-3.1-flash-lite first for rapid retrieval
      const mapsCandidates = ['gemini-3.1-flash-lite', 'gemini-3.5-flash', 'gemini-3.8-flash'];
      let mapsSuccess = false;

      for (const mName of mapsCandidates) {
        try {
          const mapResponse = await ai.models.generateContent({
            model: mName,
            contents,
            config: {
              systemInstruction: SYSTEM_INSTRUCTION,
              tools: [{ googleMaps: {} }],
              toolConfig: {
                retrievalConfig: {
                  latLng: {
                    latitude: 53.4848,
                    longitude: -2.2349, // Swan Buildings, 20 Swan St, Manchester M4 5JW
                  },
                },
              },
            },
          });

          // Extract Maps Grounding URLs
          const chunks = mapResponse.candidates?.[0]?.groundingMetadata?.groundingChunks;
          if (Array.isArray(chunks)) {
            for (const chunk of chunks) {
              if (chunk.maps?.uri) {
                mapSources.push({
                  title: chunk.maps.title || 'View location on Google Maps',
                  uri: chunk.maps.uri,
                  address: chunk.maps.text || '',
                });
              }
            }
          }

          if (mapSources.length > 0) {
            res.write(`data: ${JSON.stringify({ mapSources })}\n\n`);
          }

          const responseText = mapResponse.text;
          if (responseText) {
            // Stream text in small chunks for smooth natural arrival
            const words = responseText.split(' ');
            for (let i = 0; i < words.length; i += 3) {
              const slice = words.slice(i, i + 3).join(' ') + (i + 3 < words.length ? ' ' : '');
              res.write(`data: ${JSON.stringify({ text: slice })}\n\n`);
            }
          }

          res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
          res.end();
          mapsSuccess = true;
          break;
        } catch (err) {
          console.warn(`Maps grounding with ${mName} encountered an issue, trying fallback...`);
        }
      }

      if (mapsSuccess) {
        return;
      }
    }

    // Standard streaming flow: prioritize ultra-low-latency models
    const candidateModels = [
      'gemini-3.1-flash-lite',
      'gemini-3.8-flash',
      'gemini-3.5-flash',
      'gemini-flash-latest',
    ];

    let stream = null;
    let lastError: unknown = null;

    for (const modelToTry of candidateModels) {
      try {
        stream = await ai.models.generateContentStream({
          model: modelToTry,
          contents,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            thinkingConfig: { thinkingLevel: ThinkingLevel.MINIMAL },
            temperature: 0.7,
            topP: 0.9,
            maxOutputTokens: 350,
          },
        });
        if (stream) break;
      } catch (err) {
        lastError = err;
        console.warn(`Model ${modelToTry} attempt failed, trying next candidate if available...`);
      }
    }

    if (!stream) {
      throw lastError || new Error('All model candidates unavailable');
    }

    for await (const chunk of stream) {
      const text = chunk.text;
      if (text) {
        res.write(`data: ${JSON.stringify({ text })}\n\n`);
        if (typeof (res as any).flush === 'function') {
          (res as any).flush();
        }
      }
    }

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (error: unknown) {
    console.error('Chat error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown generation error';
    if (!res.headersSent) {
      res.status(500).json({ error: errorMessage });
    } else {
      res.write(`data: ${JSON.stringify({ error: errorMessage, done: true })}\n\n`);
      res.end();
    }
  }
});

// Enquiry submission simulation endpoint
app.post('/api/enquiry', (req: Request, res: Response) => {
  const { parentName, email, phone, childYear, subjects, goal, tutoringFormat, message } = req.body;
  console.log('New 11+ Enquiry Received:', { parentName, email, phone, childYear, subjects, goal, tutoringFormat, message });
  res.json({
    success: true,
    message: "Thanks! Your enquiry has been received. We'll be in touch shortly.",
  });
});

// Development vs Production serving
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

startServer();
