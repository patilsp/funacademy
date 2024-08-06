"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UserForm from "@/components/UserForm";
import { useSession } from "next-auth/react";

const UpdateUser = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [post, setPost] = useState({ dateOfBirth: "", age: "" });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getUserDetails = async () => {
      if (!session?.user?.id) return;

      try {
        const response = await fetch(`/api/users/${session.user.id}/profile`);
        if (!response.ok) {
          console.error("Failed to fetch user details");
          return;
        }

        const data = await response.json();
        setPost({
          dateOfBirth: data.dateOfBirth,
          age: data.age
        });
      } catch (error) {
        console.error("An error occurred while fetching user details:", error);
      }
    };

    getUserDetails();
  }, [session?.user?.id]);

  const updateUser = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/users/${session.user.id}/profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });

      if (response.ok) {
        router.push("/users");
      } else {
        const errorData = await response.json();
        console.error("Failed to update user:", errorData.message);
        alert(`Failed to update user: ${errorData.message}`);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <UserForm
      type='Edit'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updateUser}
    />
  );
};

export default UpdateUser;
