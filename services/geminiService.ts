
import { GoogleGenAI, Type } from "@google/genai";
import type { TechStack } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const technologySchema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING, description: "Name of the technology." },
    version: { type: Type.STRING, description: "Version of the technology, if available.", nullable: true },
    details: { type: Type.STRING, description: "Any extra details, like 'used on a subdomain' or 'used until recently'.", nullable: true },
  },
  required: ['name'],
};

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    contentManagementSystem: { type: Type.ARRAY, items: technologySchema, nullable: true },
    serverSideLanguages: { type: Type.ARRAY, items: technologySchema, nullable: true },
    clientSideLanguages: { type: Type.ARRAY, items: technologySchema, nullable: true },
    jsLibraries: { type: Type.ARRAY, items: technologySchema, nullable: true },
    reverseProxyServices: { type: Type.ARRAY, items: technologySchema, nullable: true },
    dnsProvider: { type: Type.ARRAY, items: technologySchema, nullable: true },
    sslCertificateAuthorities: { type: Type.ARRAY, items: technologySchema, nullable: true },
    trafficAnalysisTools: { type: Type.ARRAY, items: technologySchema, nullable: true },
    advertisingNetworks: { type: Type.ARRAY, items: technologySchema, nullable: true },
    tagManagers: { type: Type.ARRAY, items: technologySchema, nullable: true },
    siteElements: { type: Type.ARRAY, items: technologySchema, nullable: true },
    structuredDataFormats: { type: Type.ARRAY, items: technologySchema, nullable: true },
    imageFormats: { type: Type.ARRAY, items: technologySchema, nullable: true },
    topLevelDomain: { type: Type.ARRAY, items: technologySchema, nullable: true },
    contentLanguage: { type: Type.ARRAY, items: technologySchema, nullable: true },
  },
};

export async function analyzeHtml(html: string): Promise<TechStack> {
  const prompt = `
    You are an expert web technology analyst. Analyze the following raw HTML content 
    and identify the technologies used to build the website. 
    Pay close attention to details like library versions, and any hints about server-side tech.
    Structure your response as a JSON object that strictly adheres to the provided schema.
    For each technology, provide its name and any available version or other details.
    If a category has no identifiable technologies, omit the key or provide an empty array.

    HTML Content to analyze:
    ${html}
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const jsonText = response.text.trim();
    const parsedJson = JSON.parse(jsonText);
    return parsedJson as TechStack;

  } catch (error) {
    console.error("Error analyzing HTML with Gemini API:", error);
    throw new Error("Failed to get a valid analysis from the API.");
  }
}
