import { GoogleGenAI, Modality } from "@google/genai";
import { Dialogue } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateSpeech(dialogue: Dialogue, voiceName: string): Promise<string> {
    try {
        // The prompt now directly uses the tone from the dialogue object, which includes the language guarantee note.
        const prompt = `${dialogue.tone}. Diga o seguinte: "${dialogue.verbatim_text}"`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-tts",
            contents: [{ parts: [{ text: prompt }] }],
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: { voiceName },
                    },
                },
            },
        });

        const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        
        if (!base64Audio) {
            throw new Error("No audio data received from the API.");
        }

        return base64Audio;
    } catch (error) {
        console.error("Error generating speech:", error);
        throw new Error("Failed to generate speech. Please check the console for details.");
    }
}