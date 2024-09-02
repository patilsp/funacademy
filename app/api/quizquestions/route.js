import { connectToDB } from "@/utils/database";
import Question from "@/models/question";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await connectToDB();

      const { questions } = req.body;

      if (!Array.isArray(questions) || questions.length === 0) {
        return res.status(400).json({ message: 'Invalid input: expected a non-empty array of questions' });
      }

      // Insert questions into the database
      const savedQuestions = await Question.insertMany(questions);
      
      return res.status(201).json({ message: 'Questions saved successfully', savedQuestions });
    } catch (error) {
      console.error('Error saving questions:', error);
      return res.status(500).json({ message: 'Failed to save questions' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
