"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import UserForm from '@/components/UserForm';
import { useAuth, useUser } from '@clerk/nextjs';

const CreateUser = () => {
  const router = useRouter();
  const { isLoaded, userId } = useAuth();
  const { isSignedIn } = useUser();
  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({
    userId: "",
    username: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    role: "",
  });

  useEffect(() => {
    if (isLoaded && isSignedIn && userId) {
      setPost(prevPost => ({ ...prevPost, userId }));
    }
  }, [isLoaded, isSignedIn, userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/users/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
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
    <UserForm
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={handleSubmit}
    />
  );
};

export default CreateUser;
