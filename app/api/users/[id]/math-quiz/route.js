import { NextResponse } from 'next/server';
import Result from '@/models/result';
import { connectToDB } from '@/utils/database'; 

export const POST = async (request) => {
    try {
      const { userId, levelId, score } = await request.json();
  
      await connectToDB();
  
      const result = await Result.updateOne(
        { userId, levelId },
        { $set: { score, timestamp: new Date() } },
        { upsert: true }
      );
  
      if (result.nModified === 0 && result.upsertedCount === 0) {
        console.warn('No documents were modified or upserted');
      }
  
      return NextResponse.json({ message: 'Result stored successfully!' }, { status: 200 });
    } catch (error) {
      console.error('Error storing result:', error);
      return NextResponse.json({ message: 'Failed to store result', error: error.message }, { status: 500 });
    }
  };
  
