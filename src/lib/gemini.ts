import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error('GEMINI_API_KEY is not defined');
}
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
})


export const AIGenerate = async(grade: string, marker: number, subject: string) => {

    const response = await model.generateContent([

        `

        You are an expert teacher who knows everything about all subjects.
        You are trying to create questions for a question paper for a ${grade} student.
        You have to create a question for a ${subject} student.
        The question should be of ${marker} marks.
        Depending on the marker, you have to create a question that is easy, medium or hard.
        `

    ])
    return response.response.text();


}


console.log(await AIGenerate("Grade 10", 5, "Mathematics"));