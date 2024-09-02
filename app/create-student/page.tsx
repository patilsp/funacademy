'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import StudentForm from '@/components/StudentForm'

const CreateStudent = () => {
  const router = useRouter()
  const [submitting, setIsSubmitting] = useState(false)
  const [post, setPost] = useState({
    username: "",
    dateOfBirth: "",
    profileImage:"",
    age: 1,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/student/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      })

      const responseData = await response.json()

      if (response.ok) {
        toast.success(response.status === 201 ? "Student has been created! 🔥" : "Student has been updated! 🔥")
        router.push("/admin")
      } else {
        toast.error(responseData.message || "Failed to manage Student")
      }
    } catch (error) {
      toast.error("An error occurred")
      console.error("Error managing Student:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <StudentForm
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={handleSubmit}
    />
  )
}

export default CreateStudent