"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { Button } from "@/registry/new-york/ui/button";


const PromptCard = ({ post, handleEdit, handleDelete, handleTagClick }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState("");

  const handleProfileClick = () => {

    if (post.creator?._id === session?.user.id) return router.push("/userprofile");

    router.push(`/userprofile/${post.creator?._id}?name=${post.creator?.username}`);
  };

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    
      <div className='prompt_card'>
        <div className='flex items-start justify-between gap-5'>
            {/* <div
              className='flex flex-1 cursor-pointer items-center justify-start gap-3'
              onClick={handleProfileClick}
            >
              <Image
                src={post.creator?.image}
                alt='user_image'
                width={40}
                height={40}
                className='rounded-full object-contain'
              />

              <div className='flex flex-col'>
                <h3 className=' font-semibold text-gray-900'>
                  {post.creator?.username}
                </h3>
                <p className='font-inter text-sm text-gray-500'>
                  {post.creator?.email}
                </p>
              </div>
            </div> */}

          <div className='copy_btn' onClick={handleCopy}>
            <Image
              src={
                copied === post.prompt
                  ? "/icons/tick.svg"
                  : "/icons/copy.svg"
              }
              alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
              width={12}
              height={12}
            />
          </div>
        </div>

        <p className=' my-4 text-sm text-gray-700'>{post.prompt}</p>
        <p
          className='font-inter blue_gradient cursor-pointer text-sm'
          onClick={() => handleTagClick && handleTagClick(post.tag)}
        >
          #{post.tag}
        </p>

        {session?.user.id === post.creator?._id && pathName === "/profile" && (
          <div className='flex-center mt-5 gap-4 border-t border-gray-100 pt-3'>
            <p
              className='font-inter green_gradient cursor-pointer text-sm'
              onClick={handleEdit}
            >
              Edit
            </p>
            <p
              className='font-inter orange_gradient cursor-pointer text-sm'
              onClick={handleDelete}
            >
              Delete
            </p>
          </div>
        )}
      </div>

  );
};


export default PromptCard;
