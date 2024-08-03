
import Complaint from "@/models/complaint";
import { connectToDB } from "@/utils/database";

export const GET = async (request, { params }) => {
    try {
      console.log(`Fetching complaint with ID: ${params.id}`); // Add this line
      await connectToDB();
      const complaint = await Complaint.findById(params.id);
      if (!complaint) return new Response("Complaint Not Found", { status: 404 });
      return new Response(JSON.stringify(complaint), { status: 200 });
    } catch (error) {
      console.error("Error fetching complaint:", error);
      return new Response("Internal Server Error", { status: 500 });
    }
  };
  
  export const PATCH = async (request, { params }) => {
    const { name, mobile, address, complaintType, productType, visitDate, status, assignUser } = await request.json();

    try {
        await connectToDB();

        // Find the existing Complaint by ID
        const existingComplaint = await Complaint.findById(params.id);

        if (!existingComplaint) {
            return new Response(JSON.stringify({ message: "Complaint not found" }), { status: 404, headers: { "Content-Type": "application/json" } });
        }

        // Update the Complaint with new data
        existingComplaint.name = name;
        existingComplaint.mobile = mobile;
        existingComplaint.address = address;
        existingComplaint.complaintType = complaintType;
        existingComplaint.productType = productType;
        existingComplaint.visitDate = visitDate;
        existingComplaint.status = status;
        existingComplaint.assignUser = assignUser;

        await existingComplaint.save();

        return new Response(JSON.stringify({ message: "Successfully updated the Complaint" }), { status: 200, headers: { "Content-Type": "application/json" } });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Error Updating Complaint" }), { status: 500, headers: { "Content-Type": "application/json" } });
    }
};


export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        // Find the Complaint by ID and remove it
        await Complaint.findByIdAndRemove(params.id);

        return new Response("Complaint deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting Complaint", { status: 500 });
    }
};
