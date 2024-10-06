"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
const Contact = () => {

  const [hasMounted, setHasMounted] = React.useState(false);
  React.useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return null;
  }

  return (
    <>
      <section id="support" className="bg-gradient-to-b from-indigo-100 via-blue-200 to-purple-200 px-4 py-10 dark:bg-gradient-to-b dark:from-gray-800 dark:via-gray-900 dark:to-black md:px-8 2xl:px-0">
        <div className="max-w-c-1390 px-7.5 lg:px-15 relative mx-auto xl:px-20">

          <div className="flex flex-col-reverse flex-wrap gap-8 md:flex-row md:flex-nowrap md:justify-between xl:gap-20">
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  y: -20,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="xl:p-15 w-full rounded-lg bg-white p-8 shadow-xl  dark:border dark:bg-gray-800 md:w-3/5 lg:w-3/4"
            >
              <h2 className="mb-8 text-3xl font-bold text-gray-900 dark:text-gray-100">
                Send a Message
              </h2>

              <form
                action="/send"
                method="POST"
              >
                <div className="mb-7 flex flex-col gap-4 space-y-2 lg:flex-row lg:justify-between lg:gap-14">
                  <Input
                    type="text"
                    placeholder="Full Name"
                    className="w-full border-b border-gray-300 bg-transparent "
                  />
                  <Input
                    type="email"
                    placeholder="Email Address"
                    className="w-full border-b border-gray-300 bg-transparent "
                  />
                </div>

                <div className="mb-8 flex flex-col gap-4 space-y-2 lg:flex-row lg:justify-between lg:gap-14">
                  <Input
                    type="text"
                    placeholder="Subject"
                    className="w-full border-b border-gray-300 bg-transparent "
                  />
                  <Input
                    type="text"
                    placeholder="Phone Number"
                    className="w-full border-b border-gray-300 bg-transparent "
                  />
                </div>

                <div className="mb-8">
                  <textarea
                    placeholder="Message"
                    rows={4}
                    className="w-full border-b border-gray-300 bg-transparent pb-3.5 text-gray-800 placeholder:text-gray-500 focus:border-indigo-500 focus:placeholder:text-gray-900 focus-visible:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-indigo-400 dark:focus:placeholder:text-gray-400"
                  ></textarea>
                </div>

                <div className="flex flex-wrap gap-4 xl:justify-between">
                  <div className="flex items-center">
                    <input
                      id="terms-checkbox"
                      type="checkbox"
                      className="peer sr-only"
                    />
                    <span className="flex size-5 items-center justify-center rounded border border-gray-300 bg-gray-100 text-indigo-600 peer-checked:bg-indigo-600 dark:border-gray-600 dark:bg-gray-700">
                      <svg
                        className="opacity-0 peer-checked:opacity-100"
                        width="10"
                        height="8"
                        viewBox="0 0 10 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M9.70704 0.792787C9.89451 0.980314 9.99983 1.23462 9.99983 1.49979C9.99983 1.76495 9.89451 2.01926 9.70704 2.20679L4.70704 7.20679C4.51951 7.39426 4.26521 7.49957 4.00004 7.49957C3.73488 7.49957 3.48057 7.39426 3.29304 7.20679L0.293041 4.20679C0.110883 4.01818 0.0100885 3.76558 0.0123669 3.50339C0.0146453 3.24119 0.119814 2.99038 0.305222 2.80497C0.490631 2.61956 0.741443 2.51439 1.00364 2.51211C1.26584 2.50983 1.51844 2.61063 1.70704 2.79279L4.00004 5.08579L8.29304 0.792787C8.48057 0.605316 8.73488 0.5 9.00004 0.5C9.26521 0.5 9.51951 0.605316 9.70704 0.792787Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                    <label
                      htmlFor="terms-checkbox"
                      className="ml-3 text-gray-800 dark:text-gray-100"
                    >
                      I agree to the terms and conditions.
                    </label>
                  </div>

                  <button
                    aria-label="Send Message"
                    className="inline-flex items-center gap-2.5 rounded-full bg-indigo-600 px-6 py-3 font-medium text-white transition-all duration-300 ease-in-out hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                  >
                    Send Message
                    <svg
                      className="fill-white"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.4767 6.16664L6.00668 1.69664L7.18501 0.518311L13.6667 6.99998L7.18501 13.4816L6.00668 12.3033L10.4767 7.83331H0.333344V6.16664H10.4767Z"
                        fill="white"
                      />
                    </svg>
                  </button>
                </div>
              </form>
            </motion.div>

            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  y: -20,
                },

                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 2, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_top md:p-7.5 xl:pt-15 w-full md:w-2/5 lg:w-[26%]"
            >
              <h2 className="mb-12.5 xl:text-section title2 text-3xl font-semibold text-black dark:text-white">
                Find us
              </h2>

              <div className="5 mb-7">
                <h3 className="text-meta title3 mb-4 font-medium text-black dark:text-white">
                  Our Location
                </h3>
                <p>20tn Main, Marenahalli, Vijayanagar, Bengaluru, Karnataka 560040
                </p>
              </div>
              <div className="5 mb-7">
                <h3 className="text-meta title3 mb-4 font-medium text-black dark:text-white">
                  Email Address
                </h3>
                <p>
                  <a href="#">santoshpatil2526@gmail.com</a>
                </p>
              </div>
              <div>
                <h4 className="text-meta title3 mb-4 font-medium text-black dark:text-white">
                  Phone Number
                </h4>
                <p>
                  <a href="#">+91-9876543210</a>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
