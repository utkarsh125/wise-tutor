import { AIGenerate } from "@/lib/gemini";
import { NextResponse } from "next/server";
import { z } from "zod";

const GenerateRequestSchema = z.object({
  grade: z.string().optional(),
  marker: z.number().optional(),
  boardType: z.string().optional(),
  subject: z.string().optional(),
  input: z.string().optional(),
  difficulty: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = GenerateRequestSchema.parse(await req.json());
    const { grade, marker, boardType, subject, input, difficulty } = body;
    const result = await AIGenerate(grade, marker, boardType, subject, input, difficulty);
    return NextResponse.json({ text: result });
  } catch (error) {
    console.error("Error in /api/gemini:", error);
    return NextResponse.error();
  }
}
