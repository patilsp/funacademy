"use client";

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion';

function Service() {
  return (
    <div>
      <section className="relative bg-gray-200 py-8 pb-20">
        <div className="flex flex-wrap justify-center py-8 text-center">
          <div className="w-full px-12 md:w-6/12 md:px-4">
            <h2 className="text-4xl font-semibold">Why Choose Excellent Service?</h2>
            <p className="my-4 text-lg leading-relaxed text-gray-600">
              Discover the top reasons why our water purifier services stand out from the rest.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center md:flex-row">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="my-0 mr-auto w-full px-4 md:w-4/12 md:pt-0"
            >
              <Image
                src="/images/image-1.png"
                alt="Reliable Service"
                height={200}
                width={200}
                objectFit="contain"
                className=""
              />
            </motion.div>
            <div className="mx-auto w-full px-4 md:w-5/12">
              <div className="md:pr-4">
                <div className="mb-6 inline-flex size-16 items-center justify-center rounded-full bg-white p-3 text-center text-blue-600 shadow-lg">
                  <i className="fas fa-check-circle text-xl"></i>
                </div>
                <h3 className="text-3xl font-semibold">Reliable Service</h3>
                <p className="mt-4 text-lg leading-relaxed text-gray-600">
                  Our team provides reliable water purifier services with a commitment to quality and customer satisfaction.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center md:flex-row-reverse">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="my-0 mr-auto w-full px-4 md:w-4/12 md:pt-0"
            >
              <Image
                src="/images/image-1.png"
                alt="Fast Service"
                height={200}
                width={200}
                objectFit="contain"
                className=""
              />
            </motion.div>
            <div className="mx-auto w-full px-4 md:w-5/12">
              <div className="md:pr-4">
                <div className="mb-6 inline-flex size-16 items-center justify-center rounded-full bg-white p-3 text-center text-green-600 shadow-lg">
                  <i className="fas fa-clock text-xl"></i>
                </div>
                <h3 className="text-3xl font-semibold">Quick Turnaround</h3>
                <p className="mt-4 text-lg leading-relaxed text-gray-600">
                  We offer fast and efficient service to ensure that your water purifier is up and running without delay.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center md:flex-row">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="my-0 mr-auto w-full px-4 md:w-4/12 md:pt-0"
            >
              <Image
                src="/images/image-1.png"
                alt="Affordable Pricing"
                height={200}
                width={200}
                objectFit="contain"
                className=""
              />
            </motion.div>
            <div className="mx-auto w-full px-4 md:w-5/12">
              <div className="md:pr-4">
                <div className="mb-6 inline-flex size-16 items-center justify-center rounded-full bg-white p-3 text-center text-yellow-600 shadow-lg">
                  <i className="fas fa-tag text-xl"></i>
                </div>
                <h3 className="text-3xl font-semibold">Affordable Pricing</h3>
                <p className="mt-4 text-lg leading-relaxed text-gray-600">
                  Enjoy competitive pricing with transparent costs and no hidden fees.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Service
