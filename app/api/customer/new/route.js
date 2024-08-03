import Customer from "@/models/customer";
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
    const { userId, name, email, phone, address, dateofbirth, status, area, pincode } = await request.json();
      
    console.log('Request Data:', { userId, name, email, phone, address, dateofbirth, status,area, pincode  });

    try {
      await connectToDB();
      const newCustomer = new Customer({ userId, name, email, phone, address, dateofbirth, status, area, pincode });

      await newCustomer.save();
      
      return new Response(JSON.stringify(newCustomer), { status: 201 });
    } catch (error) {
      console.error('Error creating customer:', error);
      return new Response("Failed to create a new customer", { status: 500 });
    }
  };
  
  