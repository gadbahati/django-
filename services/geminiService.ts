
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateTaskSuggestions = async (projectName: string, description: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Based on the project "${projectName}" described as "${description}", suggest 5 actionable tasks with priority levels.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            priority: { type: Type.STRING, enum: ['low', 'medium', 'high'] }
          },
          required: ['title', 'description', 'priority']
        }
      }
    }
  });

  return JSON.parse(response.text || '[]');
};

export const chatWithAssistant = async (history: { role: 'user' | 'model', parts: { text: string }[] }[]) => {
  const ai = getAI();
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: "You are the Nexus Project Manager Assistant. Be concise, professional, and helpful with task management and project planning.",
    }
  });

  // Since it's a new chat instance in this wrapper, we'd normally pass history. 
  // For simplicity in this demo, we use the last message.
  const lastMessage = history[history.length - 1].parts[0].text;
  const result = await chat.sendMessage({ message: lastMessage });
  return result.text;
};

export const getProjectInsights = async (tasks: any[]) => {
  const ai = getAI();
  const prompt = `Analyze these tasks and provide a brief status report:\n${JSON.stringify(tasks)}`;
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      systemInstruction: "You are an expert project data analyst. Provide 3 short bullet points about project health."
    }
  });
  return response.text;
};
