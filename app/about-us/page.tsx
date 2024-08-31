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
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">Welcome to Fun Academy!</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Where learning meets adventure in the digital world!</p>
        </section>


        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-green-600 mb-8">Our Mission</h2>
          <Card className="bg-yellow-100 border-green-300">
            <CardContent className="p-6">
              <p className="text-lg text-center">
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
          <h2 className="text-3xl font-bold text-center text-purple-600 mb-8">What Makes Us Special</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Interactive Lessons", description: "Engaging content that makes learning fun and memorable", icon: "🎮" },
              { title: "Safe Environment", description: "A secure platform designed with child safety in mind", icon: "🛡️" },
              { title: "Progress Tracking", description: "Easy-to-use tools for parents to monitor their child's growth", icon: "📊" },
            ].map((feature, index) => (
              <Card key={index} className="bg-white hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-red-600 mb-8">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { name: "Santosh Patil", role: "Founder & CEO" },
              { name: "Sarah Lee", role: "Head of Education" },
              { name: "Mike Brown", role: "Lead Developer" },
              { name: "Emily Chen", role: "Creative Director" },
            ].map((member, index) => (
              <Card key={index} className="bg-white hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <Image
                    src={`/images/student.png?height=100&width=100`}
                    alt={member.name}
                    width={100}
                    height={100}
                    className="rounded-full mx-auto mb-4"
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
              <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
              <p className="text-xl mb-6">Join Fun Academy today and embark on an exciting educational adventure!</p>
              <Button size="lg" variant="secondary">
                Get Started
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>

      <footer className="bg-gray-100 mt-16">
        <div className="mx-auto px-4 py-8 text-center text-gray-600">
          <p>&copy; 2023 Fun Academy. All rights reserved.</p>
        </div>
      </footer>
    </div>
      
      </section>
  
  )
}

export default AboutUs
