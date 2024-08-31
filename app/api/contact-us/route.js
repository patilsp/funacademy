import Contact from "@/models/Contact";
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
    const { userId, name, email, message } = await request.json();

    try {
        await connectToDB();
        const newContact = new Contact({ creator: userId,  name, email, message });

        await newContact.save();
        return new Response(JSON.stringify(newContact), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new Contact", { status: 500 });
    }
}
