import Service from "@/models/service";
import { connectToDB } from "@/utils/database";

import twilio from 'twilio';

// Initialize Twilio client
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export const POST = async (request) => {
    const { username, name, mobile, note, inquiryType, model} = await request.json();

    try {
        await connectToDB();
        const newService = new Service({ username, name, mobile, note, inquiryType, model });
        await newService.save();

        // Send SMS notification
        await client.messages.create({
            body: `New Inquiry from ${username} (Mobile: ${mobile}): ${note || 'No additional notes'}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: process.env.NOTIFICATION_PHONE_NUMBER,
        });

        return new Response(JSON.stringify({ id: newService._id }), { status: 201 });
    } catch (error) {
        console.error('Failed to create a new Inquiry:', error);
        return new Response("Failed to create a new Inquiry", { status: 500 });
    }
};
