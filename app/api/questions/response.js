 import QuizResponse from "@/models/response";
 import { connectToDB } from "@/utils/database";
  
  export const POST = async (request) => {
      const { userId, questions, selectedOptions } = await request.json();
  
      try {
          await connectToDB();
          const newQuizResponse = new QuizResponse({ creator: userId,  questions, selectedOptions });
  
          await newQuizResponse.save();
          return new Response(JSON.stringify(newQuizResponse), { status: 201 })
      } catch (error) {
        return new Response("Failed to create a new Recommendation", { status: 500 });
      }
  }
  