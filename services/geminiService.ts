import { GoogleGenAI } from "@google/genai";
import type { Message } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const CHATBOT_SYSTEM_INSTRUCTIONS = `You are a friendly and conversational AI chat partner. 
Your name is Sparky.
Keep your responses concise, natural, and engaging, like you're texting a friend. 
Respond quickly and conversationally. Avoid long paragraphs. Use emojis where appropriate.`;

export const getChatResponse = async (history: Message[]): Promise<string> => {
    try {
        // Map our Message[] format to what the Gemini API expects
        const contents = history.map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }],
        }));

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: contents, // Pass the whole history for context
            config: {
                systemInstruction: CHATBOT_SYSTEM_INSTRUCTIONS,
                temperature: 0.9,
                thinkingConfig: { thinkingBudget: 0 } // For quick responses
            },
        });
        
        const text = response.text.trim();
        
        if (!text) {
            return "Hmm, I'm not sure what to say. Try asking something else!";
        }
        return text;
    } catch (error) {
        console.error("Error getting chat response:", error);
        return "Oops! I'm having a little trouble connecting right now. Please try again in a moment.";
    }
};
