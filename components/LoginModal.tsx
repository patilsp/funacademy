"use client";

import Image from 'next/image';
import Link from 'next/link';
import * as React from "react";
import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
    <Dialog className="w-full max-w-full rounded-none border-0 p-0" open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogContent className="w-full max-w-full rounded-none border-0 p-0">
        <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
          <Link
            href="/examples/authentication"
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'absolute right-4 top-4 hidden md:right-8 md:top-8'
            )}
          >
            Login
          </Link>
          <div className="relative hidden h-full flex-col bg-black p-10 text-white dark:border-r lg:flex">
          
            <div className="relative z-20 flex items-center text-lg font-medium">
              <Link href="/" className="hidden md:block">
                <Image
                  src="/images/logo.jpg"
                  className="rounded-full object-contain"
                  width={60}
                  height={60}
                  alt="Fun Academy Logo"            
                />
              </Link>   
            </div>
            <div className="relative z-20 mt-auto">
              <blockquote className="space-y-2 text-left">
                <p className="space-y-2 text-xl font-semibold">
                 Welcome to Fun Academy!  <br />  &ldquo;Learning is fun when its colorful and exciting. Join us and explore the world of knowledge!&rdquo;
                </p>
                <footer className="text-lg">- The FA Team</footer>
              </blockquote>
            </div>
          </div>
          <div className="flex h-full items-center p-4 lg:p-8">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
              <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-3xl font-bold text-purple-600">
                  Join Fun Academy
                </h1>
                {/* <p className="text-md text-blue-600">
                  Enter your email to start your learning adventure!
                </p> */}
              </div>
              <div className="flex flex-col items-center">
                
                <motion.div
                  className="mt-4"
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                <Image
                  src="/images/login.svg"
                  alt="Kids Learning"
                  layout="intrinsic"
                  width={200}
                  height={200}
                  className="rounded-md object-cover"
                />
                </motion.div>
                <button onClick={() => signIn()} className="btn-primary mt-10 h-12 w-full rounded   text-white">
                    Sign In with Google
                  </button>
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-dashed border-purple-600" />
                  </div>
                </div>
              </div>
              <p className="px-8 text-center text-sm text-gray-600">
                By clicking continue, you agree to our{' '}
                <Link
                  href="/terms"
                  className="underline underline-offset-4 hover:text-purple-600"
                >
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link
                  href="/privacy"
                  className="underline underline-offset-4 hover:text-purple-600"
                >
                  Privacy Policy
                </Link>.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
