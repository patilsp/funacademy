import Complaint from "@/models/complaint";
import { connectToDB } from "@/utils/database";

export const GET = async (request) => {
    try {
        await connectToDB()

        const complaints = await Complaint.find({})

        return new Response(JSON.stringify(complaints), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all Complaints", { status: 500 })
    }
} 