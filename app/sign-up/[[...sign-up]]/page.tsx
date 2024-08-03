"use client"
import React from 'react'
import { SignUp } from '@clerk/nextjs'

const SignUpPage = () => {
  return (
    <div className="relative h-screen w-full bg-cover bg-center py-5" style={{ backgroundImage: 'url(/images/banner1.jpg)' }}>
      <div className="absolute inset-0  opacity-50"></div>
      <div className="relative z-10 flex size-full items-center justify-center">
        <div className="container flex justify-center text-center">
          <SignUp />
        </div>
    </div>
  </div>
  )
}

export default SignUpPage