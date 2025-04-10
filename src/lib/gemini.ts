import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "@/env";

const apiKey = env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not defined");
}
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

export const AIGenerate = async(
  grade?: string,
  marker?: number,
  boardType?: string,
  subject?: string,
  input?: string,
  difficulty?: string
) => {
  const prompt = `
    You are an expert teacher with in-depth knowledge of different educational boards.
    Create an exam question for students in Grade ${grade ?? "unspecified"} following the ${boardType ?? "unspecified"} curriculum.
    The question should be designed for a ${subject ?? "generic subject"}.
    It should be worth ${marker ?? "a default number of"} marks.
    ${difficulty ? `Ensure the question is of ${difficulty} difficulty.` : ""}
    ${input ? `The question should focus on the following topic: ${input}.` : ""}
    If the subject is not provided or unsupported, reply with "Sorry, I cannot help with that subject."
    Avoid content that is sexual, violent, or hateful.
    Provide both the question and its solution in markdown format without filler phrases.
    The question must be clear, concise, grammatically correct, and suitable as an exam question.
    Support multiple languages when asked
  `;
  const response = await model.generateContent([prompt]);
  return response.response.text();
};


//console.log(await AIGenerate("10", 5, "CBSE", "Mathematics", "Algebra", "easy"));