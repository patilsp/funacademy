import User from '@/models/user';
import { connectToDB } from '@/utils/database';

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const users = await User.find({})

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Failed to fetch users created by user', { status: 500 });
  }
};