import { NextResponse } from 'next/server';
import Result from '@/models/result';
import { connectToDB } from '@/utils/database'; 

export const GET = async (request, { params }) => {
  const { userId } = params;

  try {
    await connectToDB();

    // Fetch all results for the given user
    const results = await Result.find({ userId }).exec();

    return NextResponse.json(results);
  } catch (error) {
    console.error('Error fetching results:', error);
    return NextResponse.json({ message: 'Failed to fetch results', error: error.message }, { status: 500 });
  }
};
