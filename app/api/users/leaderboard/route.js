import { NextResponse } from 'next/server';
import Result from '@/models/result';
import { connectToDB } from '@/utils/database'; 

export const GET = async () => {
  try {
    await connectToDB();

    // Fetch and sort the results by score in descending order
    const results = await Result.find({})
      .sort({ score: -1 })
      .exec();

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return NextResponse.json({ message: 'Failed to fetch leaderboard', error: error.message }, { status: 500 });
  }
};
