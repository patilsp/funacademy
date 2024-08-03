import Complaint from "@/models/complaint";
import { connectToDB } from "@/utils/database";

export const GET = async (request) => {
    try {
        await connectToDB();

        const url = new URL(request.url);
        const productType = url.searchParams.get('productType');
        const visitDate = url.searchParams.get('visitDate');

        if (!productType || !visitDate) {
            return new Response("Product type and visit date are required.", { status: 400 });
        }

        // Ensure visitDate is in the right format (e.g., YYYY-MM-DD or ISO string)
        const startOfDay = new Date(visitDate);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(visitDate);
        endOfDay.setHours(23, 59, 59, 999);

        // Query to check if a complaint exists for the same product type and visit date
        const complaints = await Complaint.find({
            productType: productType,
            visitDate: {
                $gte: startOfDay,
                $lte: endOfDay,
            },
        });

        const exists = complaints.length > 0;
        return new Response(JSON.stringify({ exists }), { status: 200 });
    } catch (error) {
        console.error("Error fetching complaints:", error);
        return new Response("Failed to fetch complaints", { status: 500 });
    }
}
