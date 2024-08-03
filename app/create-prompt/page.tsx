"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Form from "@/components/Form";
import { useAuth, useUser } from "@clerk/nextjs"


const CreatePrompt = () => {
  
  const router = useRouter();
  const { isLoaded, userId, getToken } = useAuth();
  const { isSignedIn, user } = useUser();

  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });

  const createPrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId:userId,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        toast.success("Post has been created! 🔥");
        router.push("/posts");
      }
    } catch (error) {
      // console.log(error);
      toast.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type='Create'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
