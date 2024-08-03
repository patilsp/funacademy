"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CustomerForm from "@/components/CustomerForm";
import toast from 'react-hot-toast';

const UpdateCustomer = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const customerId = searchParams.get("id"); 

  const [customer, setPosts] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    dateofbirth: "",
    customerId: "",
    area: "",
    picode: "",
  });
  const [submitting, setIsSubmitting] = useState(false);

  // console.log(customerId);

  useEffect(() => {
    const getCustomerDetails = async () => {
      try {
        const response = await fetch(`/api/customer`); 
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch customers:", error);
      }
    };

    if (customerId) getCustomerDetails();
  }, [customerId]);

  
// console.log(customerId);

const updateCustomer = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  if (!customerId) {
    alert("Missing CustomerId!");
    setIsSubmitting(false);
    return;
  }

  try {
    const response = await fetch(`/api/customer/${customerId}`, { 
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        dateofbirth: customer.dateofbirth,
        area: customer.area,
        pincode: customer.pincode,
      }),
    });

    const responseData = await response.json(); // Parse response as JSON
    if (response.ok) {
      toast.success(responseData.message || "Customer has been updated! 🔥"); // Use response message
      router.push("/customers");
    } else {
      throw new Error(responseData.message || "Failed to update customer"); // Include error message from API
    }
  } catch (error) {
    toast.error(`Failed to update customer! ${error.message}`);
  } finally {
    setIsSubmitting(false);
  }
};



  return (
    <CustomerForm
      type="Edit"
      post={customer}
      setPost={setPosts}
      submitting={submitting}
      handleSubmit={updateCustomer}
    />
  );
};

export default UpdateCustomer;
