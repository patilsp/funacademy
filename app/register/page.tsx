"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import RegisterForm from '@/components/RegisterForm';

const CreateUser = () => {
  const router = useRouter();
  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/users/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        toast.success("User has been created! 🔥");
        router.push("/dashboard");
      } else {
        toast.error(responseData.message || "Failed to create user");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <RegisterForm
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={handleSubmit}
    />
  );
};

export default CreateUser;
