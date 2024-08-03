"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ComplaintForm from "@/components/ComplaintForm";
import toast from 'react-hot-toast';

const UpdateComplaint = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const complaintId = searchParams.get("id");

  const [complaint, setComplaint] = useState({
    id: "",
    userId: "",
    productType: "",
    complaintType: "",
    mobile: "",
    address: "",
    visitDate: "",
    status: "",
    name: "",
    assignUser:"",
  });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getComplaintDetails = async () => {
      try {
        const response = await fetch(`/api/complaint`);
        if (!response.ok) {
          const errorMessage = await response.text(); 
          throw new Error(errorMessage || "Network response was not ok");
        }
        const data = await response.json();
        setComplaint(data);
      } catch (error) {
        console.error("Failed to fetch complaint:", error);
        toast.error(`Failed to fetch complaint: ${error.message}`); // Show error message in toast
      }
    };

    if (complaintId) getComplaintDetails();
  }, [complaintId]);

  
  useEffect(() => {
    const getComplaintDetails = async () => {
      try {
        const response = await fetch(`/api/complaint`); 
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch complaints:", error);
      }
    };

    if (complaintId) getComplaintDetails();
  }, [complaintId]);


  

  const updateComplaint = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!complaintId) {
        alert("Missing ComplaintId!");
        setIsSubmitting(false);
        return;
    }

    try {
        const response = await fetch(`/api/complaint/${complaintId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: complaint.username,
                productType: complaint.productType,
                complaintType: complaint.complaintType,
                mobile: complaint.mobile,
                address: complaint.address,
                visitDate: complaint.visitDate,
                status: complaint.status,
                assignUser: "Admin",
    
            }),
        });

        // Attempt to parse JSON response
        const responseData = await response.json(); 

        if (response.ok) {
            toast.success(responseData.message || "Complaint has been updated! 🔥");
            router.push("/complaints");
        } else {
            throw new Error(responseData.message || "Failed to update complaint");
        }
    } catch (error) {
        console.error("Update error:", error);
        toast.error(`Failed to update complaint! ${error.message}`);
    } finally {
        setIsSubmitting(false);
    }
};


  return (
    <ComplaintForm
      type="Edit"
      complaint={complaint}
      setComplaint={setComplaint}
      submitting={submitting}
      handleSubmit={updateComplaint}
    />
  );
};

export default UpdateComplaint;
