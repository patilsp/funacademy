
'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, MinusCircle, Users } from 'lucide-react'
import { motion } from 'framer-motion';


interface Question {
  text: string;
  options: string[];
  correctAnswer: number;
}
import { useSession } from "next-auth/react";



const QuestionForm = ({ type, post, setPost, submitting, handleSubmit }) => {
  const { data: session } = useSession();

  return (
    <section className="relative flex h-screen justify-center">
      <div className="absolute"></div>
      <div className="w-full max-w-3xl p-4">
        <div className="mt-10 py-10 md:p-4">
          <motion.form
            onSubmit={handleSubmit}
            className='mt-2 flex w-full flex-col gap-6 rounded-lg border bg-white p-8 text-slate-800 shadow dark:bg-black dark:text-white'
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className='my-2 text-center text-2xl font-bold'>
              Questions
            </h1>



<div className="container mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Question Creator</h1>
      {questions.map((question, questionIndex) => (
        <Card key={questionIndex} className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Question {questionIndex + 1}</span>
              {questionIndex > 0 && (
                <Button variant="ghost" size="icon" onClick={() => handleRemoveQuestion(questionIndex)}>
                  <MinusCircle className="size-6" />
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Label htmlFor={`question-${questionIndex}`}>Question Text</Label>
              <Input
                id={question}
                value={post.question}
                onChange={(e) => setPost({ ...post, question: e.target.value })}
                placeholder="Enter your question here"
              />
            </div>
            <RadioGroup value={question.correctAnswer.toString()} onValueChange={(value) => handleCorrectAnswerChange(questionIndex, parseInt(value))}>
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="mb-2 flex items-center space-x-2">
                  <RadioGroupItem value={optionIndex.toString()} id={`q${questionIndex}-option-${optionIndex}`} />
                  <Input
                    id={option}
                    value={post.option}
                    onChange={(e) => setPost({ ...post, option: e.target.value })}
                    placeholder={`Option ${optionIndex + 1}`}
                    className="grow"
                  />
                  {optionIndex > 1 && (
                    <Button variant="ghost" size="icon" onClick={() => handleRemoveOption(questionIndex, optionIndex)}>
                      <MinusCircle className="size-4" />
                    </Button>
                  )}
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          <CardFooter>
            <Button variant="outline" onClick={() => handleAddOption(questionIndex)}>
              <PlusCircle className="mr-2 size-4" />
              Add Option
            </Button>
          </CardFooter>
        </Card>
      ))}
      <div className="flex items-center justify-between">
        <Button onClick={handleAddQuestion}>
          <PlusCircle className="mr-2 size-4" />
          Add Question
        </Button>
        <Button onClick={handleSubmit}>Save Questions</Button>
      </div>
    </div>

            <div className='my-4 flex justify-center gap-4'>
              <Button
                type='submit'
                disabled={submitting}
                className='w-full max-w-60'
              >
                <Users className="mr-2 size-4" /> {submitting ? `${type}ing...` : type}
              </Button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

export default QuestionForm;
