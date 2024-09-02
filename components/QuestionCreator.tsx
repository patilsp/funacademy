'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, MinusCircle } from 'lucide-react'

interface Question {
  text: string;
  options: string[];
  correctAnswer: number;
}

export default function QuestionCreator() {
  const [numQuestions, setNumQuestions] = useState(1)
  const [questions, setQuestions] = useState<Question[]>([{ text: '', options: ['', ''], correctAnswer: 0 }])

  
  const handleAddQuestion = () => {
    setNumQuestions(prev => prev + 1)
    setQuestions(prev => [...prev, { text: '', options: ['', ''], correctAnswer: 0 }])
  }

  const handleRemoveQuestion = (index: number) => {
    setNumQuestions(prev => prev - 1)
    setQuestions(prev => prev.filter((_, i) => i !== index))
  }

  const handleQuestionChange = (index: number, value: string) => {
    setQuestions(prev => prev.map((q, i) => i === index ? { ...q, text: value } : q))
  }

  const handleOptionChange = (questionIndex: number, optionIndex: number, value: string) => {
    setQuestions(prev => prev.map((q, i) => 
      i === questionIndex 
        ? { ...q, options: q.options.map((opt, j) => j === optionIndex ? value : opt) } 
        : q
    ))
  }

  const handleCorrectAnswerChange = (questionIndex: number, optionIndex: number) => {
    setQuestions(prev => prev.map((q, i) => 
      i === questionIndex ? { ...q, correctAnswer: optionIndex } : q
    ))
  }

  const handleAddOption = (questionIndex: number) => {
    setQuestions(prev => prev.map((q, i) => 
      i === questionIndex ? { ...q, options: [...q.options, ''] } : q
    ))
  }

  const handleRemoveOption = (questionIndex: number, optionIndex: number) => {
    setQuestions(prev => prev.map((q, i) => 
      i === questionIndex 
        ? { ...q, options: q.options.filter((_, j) => j !== optionIndex) } 
        : q
    ))
  }

  const handleSubmit = async () => {
    try {
      // Log the questions being sent
      console.log('Sending questions:', JSON.stringify(questions, null, 2))

      const response = await fetch('/api/quizquestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(questions),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`)
      }

      const data = await response.json()

      alert('Questions saved successfully!')
      // Reset the form
      setNumQuestions(1)
      setQuestions([{ text: '', options: ['', ''], correctAnswer: 0 }])
    } catch (error) {
      console.error('Error saving questions:', error)
      alert(`An error occurred while saving questions. ${error.message || 'Please try again.'}`)
    }
  }

  return (
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
                id={`question-${questionIndex}`}
                value={question.text}
                onChange={(e) => handleQuestionChange(questionIndex, e.target.value)}
                placeholder="Enter your question here"
              />
            </div>
            <RadioGroup value={question.correctAnswer.toString()} onValueChange={(value) => handleCorrectAnswerChange(questionIndex, parseInt(value))}>
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="mb-2 flex items-center space-x-2">
                  <RadioGroupItem value={optionIndex.toString()} id={`q${questionIndex}-option-${optionIndex}`} />
                  <Input
                    value={option}
                    onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
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
  )
}