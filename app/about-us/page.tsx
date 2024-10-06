"use client";

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from 'framer-motion'

const AboutUs = () => {
  return (
    
      <section>
         <div className="bg-gradient-to-b from-blue-100 to-green-100">
      <div className="container mx-auto px-4 py-8">
        <section className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold text-blue-600 md:text-5xl">Welcome to Fun Academy!</h1>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">Where learning meets adventure in the digital world!</p>
        </section>


        <section className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-green-600">Our Mission</h2>
          <Card className="m-auto max-w-4xl bg-yellow-100 hover:border-green-400">
            <CardContent className="p-6">
              <p className="text-center text-lg">
                The ultimate educational app designed to make learning a joyous adventure for children aged 1 to 7. At FunAcademy, we combine engaging stories, interactive games, and animated content to spark curiosity and foster a love for learning. Our platform offers a rich variety of educational materials that cater to young minds, helping them develop essential skills while having fun. With FunAcademy, learning becomes an exciting journey of discovery and play!

              </p>
            </CardContent>
          </Card>
        </section>
{/* 
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-green-600 mb-8">Our Mission</h2>
          <Card className="bg-yellow-100 border-yellow-300">
            <CardContent className="p-6">
              <p className="text-lg text-center">
                At Fun Academy, we believe that learning should be an exciting journey. Our mission is to create a safe, 
                engaging, and interactive online environment where children can explore, learn, and grow while having fun!
              </p>
            </CardContent>
          </Card>
        </section> */}

        <section className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-purple-600">What Makes Us Special</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              { title: "Interactive Lessons", description: "Engaging content that makes learning fun and memorable", icon: "🎮" },
              { title: "Safe Environment", description: "A secure platform designed with child safety in mind", icon: "🛡️" },
              { title: "Progress Tracking", description: "Easy-to-use tools for parents to monitor their child's growth", icon: "📊" },
            ].map((feature, index) => (
              <Card key={index} className="bg-white transition-shadow duration-300 hover:shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 text-4xl">{feature.icon}</div>
                  <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-red-600">Meet Our Team</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {[
              { name: "Santosh Patil", role: "Founder & CEO" },
              { name: "Sarah Lee", role: "Head of Education" },
              { name: "Mike Brown", role: "Lead Developer" },
              { name: "Emily Chen", role: "Creative Director" },
            ].map((member, index) => (
              <Card key={index} className="bg-white transition-shadow duration-300 hover:shadow-lg">
                <CardContent className="p-6 text-center">
                  <Image
                    src={`/images/student.png?height=100&width=100`}
                    alt={member.name}
                    width={100}
                    height={100}
                    className="mx-auto mb-4 rounded-full"
                  />
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="text-center">
          <Card className="bg-blue-600 text-white">
            <CardContent className="p-8">
              <h2 className="mb-4 text-3xl font-bold">Ready to Start Learning?</h2>
              <p className="mb-6 text-xl">Join Fun Academy today and embark on an exciting educational adventure!</p>
              <Button size="lg" variant="secondary">
                Get Started
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>

      <footer className="mt-16 bg-gray-100">
        <div className="mx-auto px-4 py-8 text-center text-gray-600">
          <p>&copy; 2023 Fun Academy. All rights reserved.</p>
        </div>
      </footer>
    </div>
      
      </section>
  
  )
}

export default AboutUs
