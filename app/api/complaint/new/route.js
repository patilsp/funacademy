import Complaint from "@/models/complaint";
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
    const { userId, name, productType, complaintType, mobile, visitDate, status, address, assignUser } = await request.json();

    try {
        await connectToDB();
        const newComplaint = new Complaint({ userId, name, productType, complaintType, mobile, visitDate, status, address, assignUser});
        await newComplaint.save();

        return new Response(JSON.stringify({ id: newComplaint._id }), { status: 201 });
    } catch (error) {
        console.error('Failed to create a new complaint:', error);
        return new Response("Failed to create a new Complaint", { status: 500 });
    }
};
