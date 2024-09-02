'use client'

import React from 'react'
import { useSession } from 'next-auth/react'
import ProfileImage from '@/components/ProfileImage'
import StudentForm from '@/components/StudentForm'

const UserProfile = () => {
  const { data: session } = useSession()

  if (!session) {
    return <div>Please sign in to view your profile.</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Your Profile</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-2xl font-semibold">Profile Image</h2>
          <ProfileImage
            userId={session.user.id}
            currentImageUrl={session.user.image}
          />
        </div>
        <div>
          <h2 className="mb-4 text-2xl font-semibold">User Information</h2>
          <StudentForm
            type="Update"
            post={{
              userId: session.user.id,
              username: session.user.name,
              dateOfBirth: "",
              age: 0,
            }}
            setPost={() => {}}
            submitting={false}
            handleSubmit={() => {}}
          />
        </div>
      </div>
    </div>
  )
}

export default UserProfile