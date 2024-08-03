"use client";

import { useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs"; 
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/registry/new-york/ui/card";
import { Button } from "@/registry/new-york/ui/button";
import { format } from "date-fns";
import { motion } from "framer-motion";

const ComplaintCard = ({ complaint, handleEdit, handleDelete, handleTagClick }) => {
  const pathName = usePathname();
  const router = useRouter();

  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const { isSignedIn, user } = useUser();

  const [copied, setCopied] = useState("");

  const handleCopy = () => {
    setCopied(complaint.name);
    navigator.clipboard.writeText(complaint.name);
    setTimeout(() => setCopied(""), 3000);
  };

  return (
    <Card className="glassmorphism p_0 mx-auto mb-6 w-full max-w-md rounded p-0 shadow-md ring-1 ring-gray-900/5 transition-all duration-300 ease-in-out hover:shadow-lg dark:bg-slate-900">
      <CardHeader className="flex flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          
          <div>
            <p className='rounded border bg-gray-100 px-4 py-1 text-sm font-semibold text-orange-500 dark:bg-slate-700 dark:text-gray-200'>{complaint.status}</p>
            <p className='text-sm text-gray-600 dark:text-gray-400'>{complaint.date && format(new Date(complaint.date), "dd MMM yyyy")}</p>
          </div>
        </div>
        <div className='relative mt-2 md:mt-0'>
          <Button
            variant="outline"
            onClick={handleCopy}
            className="p-1 px-2"
          >
            <Image
              src={copied === complaint.name ? "/icons/tick.svg" : "/icons/copy.svg"}
              alt={copied === complaint.name ? "tick_icon" : "copy_icon"}
              width={16}
              height={16}
            />
          </Button>
          {copied && (
            <span className="absolute right-0 top-0 rounded bg-gray-800 p-1 text-xs text-white">
              Copied!
            </span>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="mb-2">
          <h3 className="flex justify-between gap-4 text-lg font-semibold text-gray-800 dark:text-gray-200">Details</h3>
            <p className='text-sm text-gray-700 dark:text-gray-400'>{complaint.name}</p>
            <p className='text-sm text-gray-700 dark:text-gray-400'>{complaint.mobile}</p>
            <p className='text-sm text-gray-700 dark:text-gray-400'>{complaint.address}</p>
        </div>
      </CardContent>
      
    
    </Card>
  );
};

export default ComplaintCard;
