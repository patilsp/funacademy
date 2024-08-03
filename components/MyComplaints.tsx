"use client";

import { useSession } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ComplaintCard from "@/components/ComplaintCard";

const MyComplaints = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [myComplaints, setMyComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      if (session?.user?.id) {
        const response = await fetch(`/api/users/${session.user.id}/complaints`);
        const data = await response.json();

        setMyComplaints(data);
      }
    };

    fetchComplaints();
  }, [session?.user?.id]);

  const handleEdit = (complaint) => {
    router.push(`/update-complaint?id=${complaint._id}`);
  };

  const handleDelete = async (complaint) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this complaint?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/complaint/${complaint._id.toString()}`, {
          method: "DELETE",
        });

        const filteredComplaints = myComplaints.filter(
          (item) => item._id !== complaint._id
        );

        setMyComplaints(filteredComplaints);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className='profile'>
      <h1 className='mb-4 text-2xl font-bold'>My Complaints</h1>
      <p className='mb-8'>
        Welcome to your personalized complaints page. Manage your complaints here, update or delete them as needed.
      </p>

      <div className='space-y-4'>
        {myComplaints.map((complaint) => (
          <ComplaintCard
            key={complaint._id}
            complaint={complaint}
            handleEdit={() => handleEdit(complaint)}
            handleDelete={() => handleDelete(complaint)}
          />
        ))}
      </div>
    </div>
  );
};

export default MyComplaints;
