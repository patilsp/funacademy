"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import CustomerProfile from "@/components/CustomerProfile";

const MyCustomers = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [myCustomers, setMyCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/customers`);
      const data = await response.json();

      setMyCustomers(data);
    };

    if (session?.user.id) fetchCustomers();
  }, [session?.user.id]);

  const handleEdit = (customer) => {
    router.push(`/update-customer?id=${customer._id}`);
  };

  const handleDelete = async (customer) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this customer?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/customer/${customer._id.toString()}`, {
          method: "DELETE",
        });

        const filteredCustomers = myCustomers.filter((item) => item._id !== customer._id);

        setMyCustomers(filteredCustomers);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <CustomerProfile
      name='My Customers'
      desc='Welcome to your customer management page. Here you can manage all your customers effectively.'
      data={myCustomers}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyCustomers;
