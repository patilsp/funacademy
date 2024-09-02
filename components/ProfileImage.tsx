'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { UploadButton } from "@uploadthing/react"
import { OurFileRouter } from "@/app/api/uploadthing/core"
import toast from 'react-hot-toast'

interface ProfileImageProps {
  userId: string
  currentImageUrl?: string
}

const ProfileImage: React.FC<ProfileImageProps> = ({ userId, currentImageUrl }) => {
  const router = useRouter()
  const [imageUrl, setImageUrl] = useState(currentImageUrl)

  const handleUploadComplete = async (res: any) => {
    const uploadedImageUrl = res[0].url
    setImageUrl(uploadedImageUrl)

    // Update user profile with new image URL
    try {
      const response = await fetch(`/api/student/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profileImage: uploadedImageUrl }),
      })

      if (response.ok) {
        toast.success('Profile image updated successfully!')
        router.refresh()
      } else {
        toast.error('Failed to update profile image')
      }
    } catch (error) {
      console.error('Error updating profile image:', error)
      toast.error('An error occurred while updating profile image')
    }
  }

  const handleUploadError = (error: Error) => {
    toast.error(`Error uploading image: ${error.message}`)
  }

  const handleDeleteImage = async () => {
    try {
      const response = await fetch(`/api/students/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profileImage: null }),
      })

      if (response.ok) {
        setImageUrl(undefined)
        toast.success('Profile image deleted successfully!')
        router.refresh()
      } else {
        toast.error('Failed to delete profile image')
      }
    } catch (error) {
      console.error('Error deleting profile image:', error)
      toast.error('An error occurred while deleting profile image')
    }
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      {imageUrl ? (
        <div className="relative size-32">
          <Image
            src={imageUrl}
            alt="Profile"
            fill
            className="rounded-full object-cover"
          />
        </div>
      ) : (
        <div className="flex size-32 items-center justify-center rounded-full bg-gray-200">
          <span className="text-gray-500">No Image</span>
        </div>
      )}

      <UploadButton<OurFileRouter>
        endpoint="profileImage"
        onClientUploadComplete={handleUploadComplete}
        onUploadError={handleUploadError}
      />

      {imageUrl && (
        <button
          onClick={handleDeleteImage}
          className="rounded bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600"
        >
          Delete Image
        </button>
      )}
    </div>
  )
}

export default ProfileImage