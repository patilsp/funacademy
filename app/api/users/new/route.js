import User from "@/models/user";
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
  try {
    await connectToDB();

    const { userId, username, email, phone, dateOfBirth, role } = await request.json();

    console.log('Received Data:', { userId, username, email, phone, dateOfBirth, role });

    // Validate payload
    if (!userId || !username || !email || !phone || !dateOfBirth || !role) {
      console.log('Validation Error: Missing required fields');
      return new Response(JSON.stringify({ message: "Missing required fields" }), { status: 400 });
    }

    // Create a new user
    const newUser = new User({
      userId,
      username,
      email,
      phone,
      dateOfBirth: new Date(dateOfBirth), // Ensure date is in correct format
      role
    });

    await newUser.save();
    console.log('User Created:', newUser);

    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error.message, error.stack);
    return new Response(JSON.stringify({ message: "Failed to create user", error: error.message }), { status: 500 });
  }
};
