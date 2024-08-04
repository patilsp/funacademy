import User from "@/models/user";
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
  try {
    await connectToDB();

    const { userId, username, dateOfBirth, age } = await request.json();


    // Validate payload
    if (!userId || !username || !dateOfBirth || !age) {
      console.log('Validation Error: Missing required fields');
      return new Response(JSON.stringify({ message: "Missing required fields" }), { status: 400 });
    }

    // Create a new user
    const newUser = new User({
      userId,
      username,
      dateOfBirth: new Date(dateOfBirth),
      age
    });

    await newUser.save();
    console.log('User Created:', newUser);

    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error.message, error.stack);
    return new Response(JSON.stringify({ message: "Failed to create user", error: error.message }), { status: 500 });
  }
};
