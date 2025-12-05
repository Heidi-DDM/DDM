import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

let chatSession: Chat | null = null;

// Initialize the API client
// Note: In a real production app, you should proxy these requests through a backend
// to protect your API key. For this demo, we assume process.env.API_KEY is available.
const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

export const initializeChat = async () => {
  if (!apiKey) {
    console.warn("API Key is missing. Chat functionality will be mocked.");
    return;
  }

  try {
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
  } catch (error) {
    console.error("Failed to initialize chat:", error);
  }
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!apiKey || !chatSession) {
    // Fallback mock response if no API key
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("I'm currently in demo mode (no API Key). Based on your data, I recommend smoother braking to improve your score from 78 to over 80!");
      }, 1000);
    });
  }

  try {
    const response: GenerateContentResponse = await chatSession.sendMessage({ message });
    return response.text || "I couldn't generate a response at the moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I'm having trouble connecting to the network right now.";
  }
};