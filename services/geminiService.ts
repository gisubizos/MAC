
import { GoogleGenAI } from "@google/genai";
import { Language } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you might want to handle this more gracefully,
  // but for this example, we'll throw an error if the key is missing.
  console.warn("API_KEY environment variable not set. Gemini features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const languageMap: Record<Language, string> = {
    rw: 'Kinyarwanda',
    en: 'English',
    fr: 'French',
    sw: 'Swahili'
};

export const generateStory = async (prompt: string, language: Language): Promise<string> => {
  if (!API_KEY) {
      return "Gemini API key is not configured. This is a sample story. Once upon a time, in a land of code, a developer forgot their API key, but lived happily ever after by remembering to set it up.";
  }
  
  const fullLanguageName = languageMap[language];

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            systemInstruction: `You are a creative storyteller for children. Write a simple, engaging story in ${fullLanguageName} with a clear moral lesson based on the user's prompt. The story should be short, around 3-5 paragraphs.`,
            temperature: 0.8,
        }
    });

    return response.text;
  } catch (error) {
    console.error("Error generating story with Gemini:", error);
    return `An error occurred while generating the story in ${fullLanguageName}. Please try again.`;
  }
};
