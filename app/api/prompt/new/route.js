import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
    const { userId, prompt, tag } = await request.json();

    try {
        await connectToDB();
        const newPrompt = new Prompt({ creator: userId, prompt, tag });

        await newPrompt.save();
        return new Response(JSON.stringify(newPrompt), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new prompt", { status: 500 });
    }
}

export const PATCH = async (request, { params }) => {
    try {
        // Connect to the database
        await connectToDB();

        // Parse the request JSON
        const { username, dateOfBirth, age } = await request.json();

        // Find the existing user by ID
        const user = await User.findById(params.id);

        if (!user) {
            return new Response("User not found", { status: 404 });
        }

        // Update the user with new data
        if (username) user.username = username;
        if (dateOfBirth) user.dateOfBirth = new Date(dateOfBirth);
        if (age) user.age = age;

        // Save the updated user
        await user.save();

        return new Response("Successfully updated the user", { status: 200 });
    } catch (error) {
        console.error('Error updating user:', error.message, error.stack);
        return new Response("Error updating user", { status: 500 });
    }
};
