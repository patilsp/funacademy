import User from '@/models/user';
import { connectToDB } from '@/utils/database';

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const users = await User.find({ creator: params.id }).populate('creator');

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Failed to fetch users created by user', { status: 500 });
  }
};
export const PATCH = async (request, { params }) => {
  const { dateOfBirth, age } = await request.json();
  const userId = params.id;

  try {
    await connectToDB();

    // Find the existing user by ID
    const user = await User.findById(userId);

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }

    // Update user details
    user.dateOfBirth = new Date(dateOfBirth);
    user.age = age;

    await user.save();

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error.message);
    return new Response(JSON.stringify({ message: "Failed to update user", error: error.message }), { status: 500 });
  }
};