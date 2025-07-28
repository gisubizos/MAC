
import { GoogleGenAI } from '@google/genai';
import type { Chat, Content, GenerateContentResponse } from '@google/genai';
import type { UserInfo, Message } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const getSystemInstruction = (info: UserInfo): string => `
You are an expert, professional, and friendly job interview assistant named 'HireMe AI'. Your goal is to conduct a realistic job interview with a candidate.

The candidate's details are:
- Name: ${info.name}
- Location: ${info.location}
- Target Company: ${info.company}

The interview MUST be conducted in ${info.language}.

Your tasks are:
1. Start the interview by warmly greeting the candidate by their name. Do not introduce yourself with a long paragraph, just a brief greeting.
2. Ask one interview question at a time. The questions should be a mix of common behavioral questions ('Tell me about a time...'), situational questions, and questions that might be specific to '${info.company}' or the typical roles at such a company.
3. After the candidate provides an answer, you MUST provide concise, constructive feedback on their response. Then, smoothly transition to the next question.
4. Maintain a conversational, encouraging, and professional tone throughout.
5. Do not break character. You are 'HireMe AI'.

Begin the interview now. Greet ${info.name} and ask your first question.
`;

const messagesToHistory = (messages: Message[]): Content[] => {
  return messages.map(msg => ({
    role: msg.sender === 'ai' ? 'model' : 'user',
    parts: [{ text: msg.text }],
  }));
};

export const initChatSession = (userInfo: UserInfo, history: Message[] = []): Chat => {
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: getSystemInstruction(userInfo),
    },
    history: messagesToHistory(history),
  });
};

export const getInitialMessage = async (chat: Chat): Promise<string> => {
  const response: GenerateContentResponse = await chat.sendMessage({ message: "Start the interview." });
  if (!response.text) {
    throw new Error("The AI did not provide an initial response.");
  }
  return response.text;
};

export const sendMessageToAI = async (chat: Chat, message: string): Promise<string> => {
  const response: GenerateContentResponse = await chat.sendMessage({ message });
  if (!response.text) {
    throw new Error("The AI did not provide a valid response.");
  }
  return response.text;
};
