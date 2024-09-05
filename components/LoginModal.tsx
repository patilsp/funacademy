"use client";

import Image from 'next/image';
import * as React from "react";
import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import { motion } from 'framer-motion';

const LoginModal = () => {
  
  const { status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  useEffect(() => {
    if (status === "unauthenticated") {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [status]);

  if (status === "authenticated") return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogContent className="p-0">
        <div className="relative flex flex-col items-center justify-center">
          
          {/* Image Background */}
          <div className="relative h-80 w-full">
            <Image
              src="/images/abc.jpg" // Replace with your image path
              alt="Fun Academy"
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
            />
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
             
            </motion.div>
          </div>

          {/* Form Section */}
          <div className="flex flex-col items-center rounded-b-lg bg-white p-6">

            <h1 className="my-1 text-3xl font-bold">
                Join Fun Academy
              </h1>


            <Button onClick={() => signIn()} className="mt-10 w-full rounded font-bold">
              Sign In with Google
            </Button>
            <p className="mt-4 px-8 text-center text-sm text-gray-600">
              By clicking continue, <br /> you agree to our terms and conditions.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
