import Story from "@/models/story";
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
    const {  title, description } = await request.json();

    try {
        await connectToDB();
        const newStory = new Story({ title, description });

        await newStory.save();
        return new Response(JSON.stringify(newStory), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new Story", { status: 500 });
    }
}
