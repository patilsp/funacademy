import Complaint from "@/models/complaint";
import { connectToDB } from "@/utils/database";

export const PATCH = async (request, { params }) => {
    const { assignUser, status } = await request.json();

    try {
        await connectToDB();

        // Find the existing Complaint by ID
        const existingComplaint = await Complaint.findById(params.id);

        if (!existingComplaint) {
            console.error(`Complaint with ID ${params.id} not found.`);
            return new Response("Complaint not found", { status: 404 });
        }

        // Update only the specified fields
        let updated = false;
        if (assignUser !== undefined) {
            existingComplaint.assignUser = assignUser;
            updated = true;
        }
        if (status !== undefined) {
            existingComplaint.status = status;
            updated = true;
        }

        if (!updated) {
            console.error("No fields to update.");
            return new Response("No fields to update", { status: 400 });
        }

        await existingComplaint.save();

        return new Response("Successfully updated the Complaint", { status: 200 });
    } catch (error) {
        console.error("Error Updating Complaint:", error);
        return new Response("Error Updating Complaint", { status: 500 });
    }
};
