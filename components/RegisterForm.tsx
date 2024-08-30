"use client"

import { useStore } from '@/lib/useStore';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const schema = z.object({
  username: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function RegisterForm() {
  const { form, setFormField } = useStore();
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: form,
  });

  const onSubmit = async (data) => {
    if (!isOtpSent) {
      // Send OTP to email
      try {
        await fetch('/api/send-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: data.email }),
        });
        setIsOtpSent(true);
      } catch (error) {
        console.error('Error sending OTP:', error);
      }
    } else {
      // Verify OTP and register user
      try {
        await fetch('/api/verify-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: data.email, otp, username: data.username, password: data.password }),
        });
        // Redirect or show success message
      } catch (error) {
        console.error('Error verifying OTP:', error);
      }
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-full max-w-md p-6">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Create a new account to get started.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="username">Name</Label>
              <Input
                id="username"
                placeholder="John Doe"
                {...register('username')}
              />
              {errors.username && <p>{errors.username.message}</p>}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                {...register('email')}
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                {...register('password')}
              />
              {errors.password && <p>{errors.password.message}</p>}
            </div>
            {isOtpSent && (
              <div>
                <Label htmlFor="otp">Enter OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="123456"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
            )}
            <Button type="submit">
              {isOtpSent ? 'Verify OTP' : 'Send OTP'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
