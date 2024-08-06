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
import { Button } from "@/components/ui/button"

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
          <DropdownMenuTrigger className="p-1">
            <Image
              src={session.user.image || "/avatars/02.png"}
              width={40}
              height={40}
              className='rounded-full'
              alt='profile'
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className='h-[365px] w-[265px]' align='end'>
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
                  <div className='flex flex-col space-y-1'>
                    <h1 className='font-bold'>{session.user.name}</h1>
                    <p className='font-medium'>{session.user.email}</p>
                  </div>
                </div>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="p-2" asChild>
              <Link href='/'>
                Dashboard
                <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-2" asChild>
              <Link href='/r/create'>
                Create Community
                <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-2" asChild>
              <Link href='/settings'>
                Change Username
                <DropdownMenuShortcut>⌘U</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-2" asChild>
              <Link href='/Help'>
                Command Menu
                <DropdownMenuShortcut className="flex gap-1 rounded-sm border">Ctrl K</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-2" asChild>
              <Link href='/FAQ'>
                FAQ
                <DropdownMenuShortcut>⌘F</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-2" asChild>
              <Link href='/'>
                Theme
                <DropdownMenuShortcut>⌘T</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-2" asChild>
              <Link href='/forms'>
                Profile Settings
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className='h-8 w-full cursor-pointer bg-black text-center font-bold text-white dark:bg-white dark:text-slate-700'
              onClick={() => {
                signOut({
                  callbackUrl: `${window.location.origin}/sign-in`,
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
                className='black_btn'
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
