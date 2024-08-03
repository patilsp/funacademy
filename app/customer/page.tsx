"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import CustomerCard from "@/components/CustomerCard";

const HomePage = () => {
  const { user } = useUser();
  const [customers, setPosts] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch(`/api/customer`); // Corrected URL for fetching all customers
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Fetched customers:", data); // Debugging
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  const handleDelete = async (customer) => {
    const hasConfirmed = confirm("Are you sure you want to delete this customer?");
    
    if (hasConfirmed) {
      try {
        const response = await fetch(`/api/customers/${customer._id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete customer");
        }

        const filteredCustomers = customers.filter((item) => item._id !== customer._id);
        setPosts(filteredCustomers);
      } catch (error) {
        console.error("Failed to delete customer:", error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Customers</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {customers.map((customer) => (
          <CustomerCard
            key={customer._id}
            customer={customer}
            handleEdit={() => console.log("Edit customer:", customer)}
            handleDelete={() => handleDelete(customer)} // Ensure handleDelete is used here
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
