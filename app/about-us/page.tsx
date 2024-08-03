"use client";

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const AboutUs = () => {
  return (
    <div>
      <section>
        {/* Container */}
        <div className="mx-auto w-full max-w-7xl px-5 py-12 md:px-10 md:py-16 lg:py-20">
          {/* Component */}
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
            {/* Content */}
            <motion.div
              className="flex flex-col gap-8 lg:w-3/5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Heading */}
              <h2 className="mb-8 text-3xl font-bold md:text-5xl">About Us</h2>
              <p className="text-sm sm:text-base">
                At Excellent Service Services, we are committed to providing top-quality water filtration and purification solutions. With over a decade of experience, our team is dedicated to ensuring that every drop of water is pure, safe, and clean for you and your family.
              </p>
              <a
                href="#"
                className="w-36 rounded-md bg-blue-600 px-6 py-3 text-center font-semibold text-white"
              >
                Learn More
              </a>
              {/* Divider */}
              <div className="my-8 h-px w-full bg-blue-600"></div>
              {/* Testimonials */}
              <div className="grid gap-8 md:grid-cols-2 md:gap-4">
                <motion.div
                  className="flex flex-col gap-4 rounded-md border border-solid bg-gray-100 p-6 md:p-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-sm">
                    Excellent Service Services has been a game-changer for our household. The installation process was smooth, and the difference in water quality is remarkable.
                  </p>
                  <div className="flex items-center gap-2 sm:gap-x-4">
                    <div className="flex items-center gap-x-2">
                      <Image
                        src="/images/image1.png"
                        alt="Customer"
                        height={50}
                        width={50}
                        className="size-12 rounded-full object-cover"
                      />
                      <p className="text-sm font-semibold sm:text-base">
                        John Doe
                      </p>
                    </div>
                    {/* Divider */}
                    <div className="h-5 w-px bg-gray-300"></div>
                    <div className="flex items-center gap-x-2">
                      <p className="text-sm font-semibold sm:text-base">5.0</p>
                      <div className="flex text-yellow-500">
                        {[...Array(5)].map((_, index) => (
                          <svg
                            key={index}
                            className="size-4"
                            xmlns="http://www.w3.org/2000/svg"
                            width="100%"
                            height="100%"
                            preserveAspectRatio="xMidYMid meet"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"
                            ></path>
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  className="flex flex-col gap-4 rounded-md border border-solid bg-gray-100 p-6 md:p-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-sm">
                    The water quality has improved significantly since using Excellent Service Services. Their customer support is also exceptional.
                  </p>
                  <div className="flex items-center gap-2 sm:gap-x-4">
                    <div className="flex items-center gap-x-2">
                      <Image
                        src="/images/image1.png"
                        alt="Customer"
                        width={50}
                        height={50}
                        className="size-12 rounded-full object-cover"
                      />
                      <p className="text-sm font-semibold sm:text-base">
                        Jane Smith
                      </p>
                    </div>
                    {/* Divider */}
                    <div className="h-5 w-px bg-gray-300"></div>
                    <div className="flex items-center gap-x-2">
                      <p className="text-sm font-semibold sm:text-base">5.0</p>
                      <div className="flex text-yellow-500">
                        {[...Array(5)].map((_, index) => (
                          <svg
                            key={index}
                            className="size-4"
                            xmlns="http://www.w3.org/2000/svg"
                            width="100%"
                            height="100%"
                            preserveAspectRatio="xMidYMid meet"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"
                            ></path>
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            {/* Image */}
            <motion.div
              className="w-full rounded-md bg-blue-100 max-[991px]:h-[475px] lg:w-2/5"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >

                
              <Image
                src="/images/man.png"
                alt="Customer"
                height={450}
                width={450}
                className="mt-10 rounded-full object-cover"
            />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutUs
