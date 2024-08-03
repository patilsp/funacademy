"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import StoryForm from "@/components/storyForm";
import { useAuth, useUser } from "@clerk/nextjs";

const CreateStory = () => {
  const router = useRouter();
  const { isLoaded, userId, getToken } = useAuth();
  const { isSignedIn, user } = useUser();

  const [submitting, setIsSubmitting] = useState(false);
  const [story, setStory] = useState({
    title: "",
    description: "",
    userId: "",
  });

  const createStory = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/story/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`,
        },
        body: JSON.stringify({
          userId: story.userId,
          title: story.title,
          description: story.description,
        }),
      });

      if (response.ok) {
        router.push("/admin");
        toast.success("Story has been added successfully! 🔥");
      } else {
        toast.error("Failed to add story.");
      }
    } catch (error) {
      toast.error("An error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <StoryForm
      type="Create"
      story={story}
      setStory={setStory}
      submitting={submitting}
      handleSubmit={createStory}
    />
  );
};

export default CreateStory;
