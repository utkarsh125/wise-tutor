import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "@/env";

// Explicitly assert that GEMINI_API_KEY is a string.
const apiKey: string = env.GEMINI_API_KEY as string;
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
    subject?: string,
    input?: string,
    difficulty?: string
  ) => {
    const response = await model.generateContent([
      `
        You are an expert teacher who knows everything about all subjects.
        You are trying to create questions for a question paper for a ${grade ?? "student"}.
        You have to create a question for a ${subject ?? "generic subject"} student.
        The question should be of ${marker ?? "a default number of"} marks.
        ${difficulty ? `The difficulty level should be ${difficulty}.` : ""}
        ${input ? `The question should focus on: ${input}.` : ""}
        Depending on the marker, you have to create a question that is easy, medium, or hard.
        If a generic subject is NOT passed reply with "Sorry, I cannot help with that subject."
        Avoid answering sexual, violent, or inappropriate questions or questions that promote hate speech.
        If you are unsure about the question, you can ask for help.
        You can also ask for a hint if you are stuck.
        Provide the solution in markdown format.
        Do not include any fluffs like "The question is as follows" or "The answer is as follows".
        The question should be clear and concise.
        The question should be in the form of a question.
        The question should be grammatically correct.
        Support multiple languages, prioritizing Hindi and English.
      `
    ]);
    return response.response.text();
  };
  


console.log(await AIGenerate("10", 5, "Maths", "Medium Find the value of x."));