"use client";

import Image from 'next/image';
import * as React from "react";
import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { motion } from 'framer-motion';
import logoImage from '../public/images/logo.webp';

import GoogleIcon from '@/components/icons'

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
      <DialogContent className="p-6 sm:p-8">
        <div className="flex flex-col items-center">
         
          
          <DialogHeader className="items-enter mb-4 flex justify-center text-center">
          <Image
              src="/images/login1.svg"
              alt="Banner"
              layout="intrinsic"
              width={200}
              height={200}
              className="rounded-md object-cover"
            />
            
          </DialogHeader>
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
           
             <DialogTitle className="mb-4 text-center">Continue with Google</DialogTitle>
             {/* <DialogDescription>
              Please Sign in with Google.
            </DialogDescription> */}
          </motion.div>

         

          <div className="flex w-52 justify-center">
            {/* <Button
              onClick={() => signIn()}
              className="w-full"
            >
              <GoogleIcon className="h-6 "/>Sign In with Google
            </Button> */}
          <Button onClick={() => signIn()} className="w-full border ">
                Sign In with Google
            </Button>
          </div>
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            {/* <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div> */}
          </div>

          {/* <form onSubmit={onSubmit} className="mx-auto w-full max-w-md">
            <div className="grid gap-4">
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="email">
                  Email
                </Label>
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading}
                />
              </div>
              <Button disabled={isLoading} className="w-full">
                {isLoading && (
                  <p className="mr-2 size-4 animate-spin" />
                )}
                Sign In with Email
              </Button>
            </div>
          </form> */}


        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
