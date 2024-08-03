"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ComplaintForm from "@/components/ComplaintForm";
import { useAuth, useUser } from "@clerk/nextjs";


const CreateComplaint = () => {
  const router = useRouter();
  const { isLoaded, userId } = useAuth();
  const { isSignedIn } = useUser();

  useEffect(() => {
    if (isLoaded && isSignedIn && userId) {
      setComplaint((prevComplaint) => ({ ...prevComplaint, userId }));
    }
  }, [isLoaded, isSignedIn, userId]);

  const [submitting, setIsSubmitting] = useState(false);
  const [complaint, setComplaint] = useState({
    userId: "",
    productType: "",
    complaintType: "",
    mobile: "",
    address: "",
    visitDate: "",
    status: "",
    name: "",
    assignUser:"Admin",
  });

  const createComplaint = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/complaint/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(complaint),
      });

      if (response.ok) {
        toast.success("Complaint has been created! 🔥");
        router.push("/complains");
      } else {
        throw new Error("Failed to create complaint");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ComplaintForm
      type='Create'
      complaint={complaint}
      setComplaint={setComplaint}
      submitting={submitting}
      handleSubmit={createComplaint}
    />
  );
};

export default CreateComplaint;
