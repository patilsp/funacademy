import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from "@/utils/database";
import QuizQuestion from "@/models/QuizQuestion";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      await dbConnect()

      // Log the raw request body
      console.log('Received raw body:', req.body)

      let questions
      try {
        questions = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
      } catch (parseError) {
        console.error('Error parsing request body:', parseError)
        return res.status(400).json({ success: false, message: 'Invalid JSON in request body' })
      }

      console.log('Parsed questions:', questions)

      if (!Array.isArray(questions) || questions.length === 0) {
        return res.status(400).json({ success: false, message: 'Invalid question data: expected non-empty array' })
      }

      // Transform the data to match our schema
      const formattedQuestions = questions.map((q: any) => ({
        text: q.text,
        options: q.options.map((opt: string, index: number) => ({
          text: opt,
          isCorrect: index === q.correctAnswer
        }))
      }))

      // Save all questions
      const savedQuestions = await QuizQuestion.insertMany(formattedQuestions)

      res.status(201).json({ success: true, message: 'Questions saved successfully', data: savedQuestions })
    } catch (error) {
      console.error('Error saving questions:', error)
      res.status(500).json({ success: false, message: 'Error saving questions', error: error.message })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}