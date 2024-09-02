import { NextResponse } from 'next/server'
import { connectToDB } from "@/utils/database"
import Student from "@/models/student"

export const POST = async (request) => {
  const { username, dateOfBirth, age, profileImage } = await request.json();

  try {
      await connectToDB();
      const newStudent = new Student({username, dateOfBirth, age, profileImage });

      await newStudent.save();
      console.log('Student created:', newStudent);
      return new Response(JSON.stringify(newStudent), { status: 201 });
  } catch (error) {
      console.error('Error creating student:', error);
      return new Response("Failed to create a new Student", { status: 500 });
  }
}
