'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import toast from "react-hot-toast";
import Link from "next/link"

export default function ContactUs() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {

    
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact-us', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      })

      if (response.ok) {
        toast.success("Thanks for contacting us! we will reach you soon! 🔥");
        router.push("/");
      } else {
        throw new Error('Failed to send message')        
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-blue-100">

      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-center text-4xl font-bold text-purple-600 md:text-5xl">Contact Us</h1>
        
        <Card className="mx-auto max-w-2xl">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)} 
                  required 
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-12 text-center">
          <h2 className="mb-4 text-2xl font-bold text-blue-600">Other Ways to Reach Us</h2>
          <p className="text-lg text-gray-600">
            Email: info@funacademy.com<br />
            Phone: (123) 456-7890<br />
            Address: 123 Learning Lane, Eduville, EV 12345
          </p>
        </div>
      </div>

      <footer className="mt-16 bg-gray-100">
        <div className="mx-auto px-4 py-8 text-center text-gray-600">
          <p>&copy; 2023 Fun Academy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}