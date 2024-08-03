"use client";

import { useState } from "react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { Card, CardContent, CardTitle, CardDescription, CardFooter } from "@/registry/new-york/ui/card";
import { Button } from "@/registry/new-york/ui/button";

const CustomerCard = ({ customer, handleEdit, handleDelete }) => {
  const { user } = useUser();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState("");

  const handleProfileClick = () => {
    if (customer.customerId === user.id) return router.push("/profile");

    router.push(`/CustomerProfile/${customer.customerId}`);
  };

  const handleCopy = () => {
    setCopied(customer.email);
    navigator.clipboard.writeText(customer.email);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <Card className='mx-auto w-full max-w-sm rounded border shadow'>
      <CardContent className='pt-4'>
        <div
          className='flex cursor-pointer flex-col items-center'
          onClick={handleProfileClick}
        >
          <div className='mb-4 flex '>
            <Image
              src="/avatars/01.png"
              alt="Customer Avatar"
              width={50}
              height={50}
              className="rounded-full"
            />
            <div className='ml-4'>
              <CardTitle className='text-lg font-semibold text-gray-900'>
                {customer.name}
              </CardTitle>
              <CardDescription className='text-sm text-gray-500'>
                {customer.email}
              </CardDescription>
            </div>
          </div>
          <p className='text-sm text-gray-700'>{customer.phone}</p>
          <p className='text-sm text-gray-700'>{customer.address}</p>
          <p className='mt-5 rounded bg-slate-700 p-2 text-sm text-white'>{customer.status}</p>
        </div>
      </CardContent>
      
        {/* <CardFooter className='flex justify-center gap-2 border-t border-gray-200 p-4'>
          <Button
            variant="outline"
            onClick={handleEdit}
            className='text-green-600'
          >
            Edit
          </Button>
          <Button
            variant="outline"
            onClick={handleDelete}
            className='text-red-600'
          >
            Delete
          </Button>
        </CardFooter> */}
     
    </Card>
  );
};

export default CustomerCard;
