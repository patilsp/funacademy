

'use client'

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { format } from "date-fns"
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Cake, Rocket, Star, X } from "lucide-react";

import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import toast from 'react-hot-toast';

const StudentForm = ({ type, post, setPost, submitting, handleSubmit }) => {
  const [date, setDate] = useState(post.dateOfBirth ? new Date(post.dateOfBirth) : undefined);
  const [age, setAge] = useState(post.age || 1);
  const [profileImageUrl, setProfileImageUrl] = useState(post.profileImage || '');

  useEffect(() => {
    if (date) {
      setPost((prevPost) => ({
        ...prevPost,
        dateOfBirth: format(date, "yyyy-MM-dd"),
      }));
    }
  }, [date, setPost]);

  useEffect(() => {
    if (age) {
      setPost((prevPost) => ({
        ...prevPost,
        age,
      }));
    }
  }, [age, setPost]);

  useEffect(() => {
    if (profileImageUrl) {
      setPost((prevPost) => ({
        ...prevPost,
        profileImage: profileImageUrl,
      }));
    }
  }, [profileImageUrl, setPost]);

  const handleUploadComplete = async (res) => {
    const uploadedImageUrl = res[0].url;
    setProfileImageUrl(uploadedImageUrl);
    toast.success('Profile image updated successfully!');
  };

  const handleUploadError = (error) => {
    toast.error(`Error uploading image: ${error.message}`);
  };

  const handleDeleteImage = async () => {
    try {
      const response = await fetch(`/api/student/deleteImage`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profileImage: null }),
      });

      if (response.ok) {
        setProfileImageUrl('');
        toast.success('Profile image deleted successfully!');
      } else {
        toast.error('Failed to delete profile image');
      }
    } catch (error) {
      console.error('Error deleting profile image:', error);
      toast.error('An error occurred while deleting profile image');
    }
  };

  const ageEmojis = ['👶', '🧒', '👦', '👧', '🧑', '👱', '🧑‍🦱'];

  return (
    <section className="relative flex min-h-screen items-center justify-center ">
      <motion.div
        className="w-full max-w-3xl rounded-3xl bg-white p-8 shadow-2xl"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.form
          onSubmit={handleSubmit}
          className='flex flex-col gap-6 text-slate-800'
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1 className='my-2 text-center text-4xl font-bold text-purple-600'>
            Student Registration! 🌟
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Profile Image Upload Section */}
            <div className="flex flex-col items-center md:items-start">
              <div className="relative flex flex-col items-center justify-center">
                {profileImageUrl ? (
                  <div className="relative size-32">
                    <Image
                      src={profileImageUrl}
                      alt="Profile"
                      fill
                      className="rounded-full object-cover"
                    />
                    <button
                      onClick={handleDeleteImage}
                      className="absolute top-1 right-1 p-1 text-white bg-red-500 rounded-full hover:bg-red-600"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="mt-2 flex size-32 items-center justify-center rounded-full bg-gray-200">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}

                <UploadButton<OurFileRouter>
                  endpoint="profileImage"
                  onClientUploadComplete={handleUploadComplete}
                  onUploadError={handleUploadError}
                />
              </div>
            </div>

            <div className="flex flex-col space-y-6">
              <div>
                <Label htmlFor="username" >Whats your name, superstar?</Label>
                <Input
                  id="username"
                  value={post.username}
                  onChange={(e) => setPost({ ...post, username: e.target.value })}
                  placeholder='Type your awesome name here!'
                  className='mt-2 border-2 placeholder:text-purple-300'
                />
              </div>

              <div>
                <Label htmlFor="dateOfBirth" >Whens your birthday?</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="mt-2 w-full justify-start rounded border border-purple-300 text-left font-normal hover:bg-purple-100 focus:border-purple-500 focus:ring-purple-500"
                    >
                      <Cake className="mr-2 size-5 text-pink-500" />
                      {date ? format(date, "MMMM d, yyyy") : <span>Pick your special day!</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(selectedDate) => {
                        setDate(selectedDate)
                        setPost((prevPost) => ({
                          ...prevPost,
                          dateOfBirth: format(selectedDate, "yyyy-MM-dd"),
                        }))
                      }}
                      initialFocus
                      className="rounded-xl border-2 border-purple-300"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label htmlFor="age" >How old are you?</Label>
                <div className="mt-2 flex flex-wrap gap-4">
                  {[1, 2, 3, 4, 5, 6, 7].map((ageOption) => (
                    <motion.button
                      key={ageOption}
                      type="button"
                      onClick={() => setAge(ageOption)}
                      className={`flex size-16 items-center justify-center rounded-full text-2xl ${
                        age === ageOption ? 'bg-purple-500 text-white' : 'bg-purple-100 text-purple-500'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {ageEmojis[ageOption - 1]} {ageOption}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <motion.div
            className='mt-6 flex justify-center'
            whileHover={{ scale: 1.05 }}
          >
            <Button
              type='submit'
              disabled={submitting}
              className='btn-black w-full max-w-60'
            >
              {submitting ? (
                <Star className="mr-2 size-6 animate-spin" />
              ) : (
                <Rocket className="mr-2 size-6" />
              )}
              {submitting ? "Blasting Off..." : "Register"}
            </Button>
          </motion.div>
        </motion.form>
      </motion.div>
    </section>
  )
}

export default StudentForm
