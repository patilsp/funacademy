import Product from "@/models/product";
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
    const { name, description, price, model, capacity, technology, warranty } = await request.json();

    try {
        await connectToDB();
        const newProduct = new Product({ name, description, price, model, capacity, technology, warranty });

        await newProduct.save();
        return new Response(JSON.stringify(newProduct), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new product", { status: 500 });
    }
}
