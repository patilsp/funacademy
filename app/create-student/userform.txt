"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { DatePickerDemo } from './DatePickerDemo'; // Custom date picker component
import { format } from "date-fns";

// Define schemas using Zod
const kidSchema = z.object({
  username: z.string().nonempty("Student Name is required"),
  dateOfBirth: z.string().nonempty("Date of Birth is required"),
  age: z.number().min(1, "Age is required"),
  grade: z.string().nonempty("Grade is required"),
  gender: z.string().nonempty("Gender is required"),
});

const parentSchema = z.object({
  parentName: z.string().nonempty("Parent Name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().nonempty("Phone Number is required"),
  relation: z.string().nonempty("Relation to Child is required"),
  address: z.string().nonempty("Address is required"),
});

const formSchema = z.object({
  kid: kidSchema,
  parent: parentSchema,
});

const UserForm = ({ handleSubmit }) => {
  const [step, setStep] = useState(1);

  // Initialize the form with react-hook-form
  const {
    control,
    handleSubmit: submitHandler,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      kid: {
        username: "",
        dateOfBirth: "",
        age: 1,
        grade: "",
        gender: "",
      },
      parent: {
        parentName: "",
        email: "",
        phoneNumber: "",
        relation: "",
        address: "",
      },
    },
  });

  const watchKidData = watch("kid");
  const watchParentData = watch("parent");

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const onSubmit = async (data) => {
    try {
      // Simulate API call
      console.log("Submitted Data: ", data);
      // Replace this with your API call or submission logic
      // Example: await axios.post('/api/submit', data);

      // Reset form or redirect upon success if needed
      // Reset form or setSuccessState(); 
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Submission Error: ", error);
      // Handle error state if necessary
    }
  };

  return (
    <section className="relative flex h-screen justify-center bg-blue-50">
      <div className="absolute top-0 left-0 right-0 bottom-0 z-[-1] bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400"></div>
      <div className="w-full max-w-3xl p-4">
        <div className="mt-10 py-10 md:p-4">
          <motion.form
            onSubmit={submitHandler(onSubmit)} // Ensure submitHandler is called with onSubmit
            className='mt-2 flex w-full flex-col gap-6 rounded-lg border bg-white p-8 text-slate-800 shadow-lg'
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className='my-2 text-center text-2xl font-bold text-blue-600'>
              {step === 1 ? "Kid's Registration" : step === 2 ? "Parent's Information" : "Review & Submit"}
            </h1>

            {step === 1 && (
              <div>
                {/* Kid's Registration Fields */}
                <div className="w-full gap-2">
                  <Label htmlFor="username">Student Name</Label>
                  <Controller
                    name="kid.username"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="username"
                        {...field}
                        placeholder='Enter student name'
                        className='input border-blue-300'
                      />
                    )}
                  />
                  {errors.kid?.username && <p className="text-red-500">{errors.kid.username.message}</p>}
                </div>

                <div className="w-full gap-2">
                  <Label htmlFor="dateOfBirth">Date Of Birth</Label>
                  <Controller
                    name="kid.dateOfBirth"
                    control={control}
                    render={({ field }) => (
                      <DatePickerDemo
                        date={field.value ? new Date(field.value) : undefined}
                        setDate={(date) => setValue("kid.dateOfBirth", format(date, "yyyy-MM-dd"))}
                      />
                    )}
                  />
                  {errors.kid?.dateOfBirth && <p className="text-red-500">{errors.kid.dateOfBirth.message}</p>}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="age">Age</Label>
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4, 5, 6, 7].map((ageOption) => (
                      <label key={ageOption} className="flex items-center">
                        <input
                          type="radio"
                          name="kid.age"
                          value={ageOption}
                          checked={watchKidData.age === ageOption}
                          onChange={() => setValue("kid.age", ageOption)}
                          className="mr-2"
                        />
                        {ageOption}
                      </label>
                    ))}
                  </div>
                  {errors.kid?.age && <p className="text-red-500">{errors.kid.age.message}</p>}
                </div>

                <div className="w-full gap-2">
                  <Label htmlFor="grade">Grade</Label>
                  <Controller
                    name="kid.grade"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="grade"
                        {...field}
                        placeholder='Enter grade'
                        className='input border-blue-300'
                      />
                    )}
                  />
                  {errors.kid?.grade && <p className="text-red-500">{errors.kid.grade.message}</p>}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="gender">Gender</Label>
                  <div className="flex flex-wrap gap-2">
                    {["Male", "Female", "Other"].map((genderOption) => (
                      <label key={genderOption} className="flex items-center">
                        <input
                          type="radio"
                          name="kid.gender"
                          value={genderOption}
                          checked={watchKidData.gender === genderOption}
                          onChange={() => setValue("kid.gender", genderOption)}
                          className="mr-2"
                        />
                        {genderOption}
                      </label>
                    ))}
                  </div>
                  {errors.kid?.gender && <p className="text-red-500">{errors.kid.gender.message}</p>}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                {/* Parent's Information Fields */}
                <div className="w-full gap-2">
                  <Label htmlFor="parentName">Parent Name</Label>
                  <Controller
                    name="parent.parentName"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="parentName"
                        {...field}
                        placeholder='Enter parent name'
                        className='input border-blue-300'
                      />
                    )}
                  />
                  {errors.parent?.parentName && <p className="text-red-500">{errors.parent.parentName.message}</p>}
                </div>

                <div className="w-full gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Controller
                    name="parent.email"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="email"
                        {...field}
                        placeholder='Enter email'
                        className='input border-blue-300'
                      />
                    )}
                  />
                  {errors.parent?.email && <p className="text-red-500">{errors.parent.email.message}</p>}
                </div>

                <div className="w-full gap-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Controller
                    name="parent.phoneNumber"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="phoneNumber"
                        {...field}
                        placeholder='Enter phone number'
                        className='input border-blue-300'
                      />
                    )}
                  />
                  {errors.parent?.phoneNumber && <p className="text-red-500">{errors.parent.phoneNumber.message}</p>}
                </div>

                <div className="w-full gap-2">
                  <Label htmlFor="relation">Relation to Child</Label>
                  <Controller
                    name="parent.relation"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="relation"
                        {...field}
                        placeholder='Enter relation'
                        className='input border-blue-300'
                      />
                    )}
                  />
                  {errors.parent?.relation && <p className="text-red-500">{errors.parent.relation.message}</p>}
                </div>

                <div className="w-full gap-2">
                  <Label htmlFor="address">Address</Label>
                  <Controller
                    name="parent.address"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        id="address"
                        {...field}
                        placeholder='Enter address'
                        className='input border-blue-300'
                      />
                    )}
                  />
                  {errors.parent?.address && <p className="text-red-500">{errors.parent.address.message}</p>}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className='text-lg font-semibold text-blue-600'>Review Your Information</h2>
                <div className="space-y-4">
                  <div>
                    <strong>Student Name:</strong> {watchKidData.username}
                  </div>
                  <div>
                    <strong>Date of Birth:</strong> {watchKidData.dateOfBirth}
                  </div>
                  <div>
                    <strong>Age:</strong> {watchKidData.age}
                  </div>
                  <div>
                    <strong>Grade:</strong> {watchKidData.grade}
                  </div>
                  <div>
                    <strong>Gender:</strong> {watchKidData.gender}
                  </div>
                  <div>
                    <strong>Parent Name:</strong> {watchParentData.parentName}
                  </div>
                  <div>
                    <strong>Email:</strong> {watchParentData.email}
                  </div>
                  <div>
                    <strong>Phone Number:</strong> {watchParentData.phoneNumber}
                  </div>
                  <div>
                    <strong>Relation to Child:</strong> {watchParentData.relation}
                  </div>
                  <div>
                    <strong>Address:</strong> {watchParentData.address}
                  </div>
                </div>
              </div>
            )}

            <div className='my-4 flex justify-between'>
              {step > 1 && (
                <Button
                  type="button"
                  className='w-1/3 bg-slate-800 text-white hover:bg-slate-900'
                  onClick={prevStep}
                >
                  Previous
                </Button>
              )}
              {step < 3 ? (
                <Button
                  type="button"
                  className='w-1/3 bg-slate-800 text-white hover:bg-slate-900'
                  onClick={nextStep}
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  className='w-1/3 bg-green-600 text-white hover:bg-green-700'
                >
                  Submit
                </Button>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default UserForm;
