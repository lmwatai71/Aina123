import { GoogleGenAI } from "@google/genai";
import { AINA_SYSTEM_PROMPT } from '../constants';
import { Message } from '../types';

let genAI: GoogleGenAI | null = null;

const getAIClient = (): GoogleGenAI => {
  if (!genAI) {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY is not set in environment variables.");
    }
    genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return genAI;
};

export const sendMessageToAinaMind = async (
  history: Message[],
  newMessage: string
): Promise<string> => {
  try {
    const ai = getAIClient();
    
    // Transform existing history for the prompt context if needed, 
    // or use the chat model's history feature.
    // For simplicity and strict control, we will start a fresh chat session 
    // configured with the system prompt each time, passing recent history if strictly necessary,
    // but here we will let the SDK handle the chat session state if we were persisting it.
    // Since we are stateless between reloads in this simple app, we reconstruct the chat.

    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: AINA_SYSTEM_PROMPT,
        temperature: 0.7, // Balanced creativity and groundedness
      },
      history: history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.content }]
      }))
    });

    const result = await chat.sendMessage({
      message: newMessage
    });

    return result.text || "E kala mai, I could not generate a response. Please try again.";
  } catch (error) {
    console.error("Error communicating with AinaMind:", error);
    return "Aloha. I am having trouble connecting to the ʻāina of knowledge right now. Please check your connection or API key.";
  }
};
