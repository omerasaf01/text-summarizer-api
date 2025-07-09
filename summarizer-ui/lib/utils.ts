import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from "axios"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function summarizeText(text: string): Promise<string> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, ""); // sondaki / karakterini sil
    const endpoint = "/tools/summarizer";

    console.log("Calling API:", `${baseUrl}${endpoint}`);

    let response = await axios.post(`${baseUrl}${endpoint}`, { text });

    return response.data.result
  } catch (error) {
    console.error("Error summarizing text:", error)

    throw new Error("Failed to summarize text")
  }
}