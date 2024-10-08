"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ComplaintForm from "@/components/ComplaintForm";
import { useSession } from "next-auth/react";


const Issue = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setIsSubmitting] = useState(false);
  const [complaint, setComplaint] = useState({
    userId: "",
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
        toast.success("Issue has been created! 🔥");
        router.push("/");
      } else {
        throw new Error("Failed to create Issue");
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

export default Issue;
