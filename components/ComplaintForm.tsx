"use client";
import Link from "next/link";
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from 'framer-motion';

const ComplaintForm = ({ type, complaint, setComplaint, submitting, handleSubmit }) => {

  return (
    <section className="flex w-full justify-center bg-white p-1 dark:bg-black dark:text-white md:px-4">
      <div className="container flex flex-col items-center justify-center gap-6 p-4 lg:flex-row lg:p-8">
        
          {/* Image Section */}

        {/* Form Section */}
        <motion.div 
          className="w-full rounded-lg border bg-white p-2 shadow-lg dark:bg-black dark:text-white md:p-6 lg:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="py-1">
            <h1 className='head_text text-center'>
              <span className='text-2xl font-bold text-[#7c3aed]'>{type} Issue</span>
            </h1>
            <p className='py-1 text-center text-base text-slate-600 dark:text-gray-50'>
              Let us know whats bothering you, <br /> and well help you fix it!
            </p>
          </div>

          <motion.div 
            className="flex items-center justify-center"      
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
          <Image
            src="/images/chat.png"
            alt="Kids Learning"
            width={300}
            height={300}
            className="object-contain"
          />
        </motion.div>

          <form
            onSubmit={handleSubmit}
            className='mt-2 flex w-full flex-col gap-5 p-4'
          >
            <div className="grid grid-cols-1 gap-4">
              <div className="grid w-full gap-2">
                <Label htmlFor="address" className="text-sm">Whats the issue?</Label>
                <Textarea
                  value={complaint.name}
                  onChange={(e) => setComplaint({ ...complaint, name: e.target.value })}
                  placeholder="Describe your problem..."
                  required
                  className="form_textarea border bg-white"
                />
              </div>
              <input type="hidden" name="hiddenAssignUser" value="Admin" />

              <div className='mt-6 flex justify-center gap-4'>
                <Link href='/complains' className='flex items-center rounded bg-red-400 p-1 px-4 text-sm text-white shadow hover:bg-red-600'>
                  Cancel
                </Link>

                <Button
                  type='submit'
                  disabled={submitting}
                  className='rounded bg-primary px-5 py-2 text-sm  hover:bg-slate-950'
                >
                  {submitting ? `${type}ing...` : type}
                </Button>
              </div>
            </div>
          </form>
        </motion.div>

      
      </div>
    </section>
  );
};

export default ComplaintForm;
