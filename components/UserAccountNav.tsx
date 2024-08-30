'use client'

import Link from 'next/link'
import Image from 'next/image'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuShortcut
} from "@/components/ui/dropdown-menu"
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";


const UserAccountNav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <>
      {session?.user ? (
        <DropdownMenu className="p-1">
          <DropdownMenuTrigger>
            <Image
              src={session.user.image || "/avatars/02.png"}
              width={65}
              height={65}
              className='rounded-full'
              alt='profile'
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className='h-[340px] w-[275px]' align='end'>
            <div className='flex items-center justify-start gap-2 p-1'>
              <div className='flex flex-col leading-none'>
                <div className='flex items-center gap-1'>
                  <Image
                    src={session.user.image || "/avatars/02.png"}
                    width={37}
                    height={37}
                    className='rounded-full'
                    alt='profile'
                  />
                  <div className='flex flex-col'>
                    <h1 className='text-base font-bold'>{session.user.name}</h1>
                    <p className='text-sm font-medium'>{session.user.email}</p>
                  </div>
                </div>  
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="p-2" asChild>
              <Link href='/dashboard'>
                Dashboard
                <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-2" asChild>
              <Link href='/refer'>
                Refer your friend
                <DropdownMenuShortcut>⌘R</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-2" asChild>
              <Link href='/issue'>
                Report an issue
                <DropdownMenuShortcut>⌘I</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
      
            <DropdownMenuItem className="p-2" asChild>
              <Link href='/FAQ'>
                FAQ
                <DropdownMenuShortcut>⌘F</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
         
            <DropdownMenuItem className="p-2" asChild>
              <Link href='/forms'>
                Profile Settings
                <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-2" asChild>
              <ModeToggle />
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem
              className='h-8 w-full cursor-pointer bg-black text-center font-bold text-white dark:bg-white dark:text-slate-700'
              onClick={() => {
                signOut({
                  callbackUrl: `${window.location.origin}/`,
                });
              }}
            >
              Sign out
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
           
           
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          {providers &&
            Object.values(providers).map((provider: any) => (
              <Button
                type='button'
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className='btn btn-primary'
              >
                Sign In
              </Button>
            ))}
        </>
      )}
    </>
  );
}

export default UserAccountNav;
