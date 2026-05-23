
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
Eres el asistente virtual de "Pinturas Japri", la empresa líder en pintura y reformas en Valencia.
Debes informar específicamente sobre estos 7 servicios:
1. Pintura de pisos: Renovación rápida y limpia, ideal para alquileres o mudanzas.
2. Pintura de casas: Proyectos integrales de hogar con asesoramiento cromático.
3. Pintura de chalets: Especialistas en interiores y exteriores con pinturas climáticas.
4. Quitar gotelé: Alisado maestro con lijado sin polvo.
5. Pintura decorativa de paredes: Estucos, tierras florentinas, efectos arena y acabados de lujo.
6. Pintura de locales comerciales: Trabajo nocturno/fin de semana para no interrumpir el negocio.
7. Rehabilitación de fachadas: Impermeabilización y pinturas de alta resistencia.

Valores: Limpieza absoluta, puntualidad y garantía Caubal Japri.
Ubicación: Valencia y toda su área metropolitana (Torrent, Paterna, Burjassot, etc.).
Objetivo: Convencer al usuario de pedir un presupuesto gratuito indicando su teléfono.
`;

export async function sendMessageToAI(message: string, history: {role: 'user' | 'model', text: string}[]) {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history.map(h => ({ role: h.role, parts: [{ text: h.text }] })),
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    return response.text || "Lo siento, no pude procesar tu solicitud. Por favor, llámanos al 612 34 56 78.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Tengo problemas de conexión. Por favor, contacta con Sergio Japri directamente al 612 34 56 78.";
  }
}
