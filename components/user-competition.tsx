'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from 'lucide-react'

interface User {
  id: number;
  name: string;
}

interface Question {
  id: number;
  text: string;
  options: string[];
}

const UserCompetition = () => {
  const [users, setUsers] = useState<User[]>([])
  const [user1, setUser1] = useState<number | null>(null)
  const [user2, setUser2] = useState<number | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState<number>(0)
  const [scores, setScores] = useState<{ [key: number]: number }>({})
  const [loading, setLoading] = useState<boolean>(true)
  const [competitionStarted, setCompetitionStarted] = useState<boolean>(false)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users')
        if (!response.ok) {
          throw new Error('Failed to fetch users')
        }
        const data = await response.json()
        setUsers(data)
      } catch (error) {
        console.error('Error fetching users:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const fetchQuestions = async () => {
    try {
      const response = await fetch('/api/questions')
      if (!response.ok) {
        throw new Error('Failed to fetch questions')
      }
      const data = await response.json()
      setQuestions(data)
      setCurrentQuestion(0)
      setScores({ [user1!]: 0, [user2!]: 0 })
      setCompetitionStarted(true)
    } catch (error) {
      console.error('Error fetching questions:', error)
    }
  }

  const handleAnswer = (userId: number, optionIndex: number) => {
    // In a real app, you'd check if the answer is correct here
    // For this example, we'll just increment the score
    setScores(prevScores => ({
      ...prevScores,
      [userId]: prevScores[userId] + 1
    }))

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      // End of competition
      setCompetitionStarted(false)
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="size-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">User Competition</h1>
      
      {!competitionStarted && (
        <div className="mb-8 grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="user1" className="mb-2 block text-sm font-medium">Select User 1</label>
            <Select onValueChange={(value) => setUser1(Number(value))}>
              <SelectTrigger id="user1">
                {/* <SelectValue placeholder="Select User 1" /> */}
              </SelectTrigger>
              <SelectContent>
                {users.map(user => (
                  <SelectItem key={user.id} value={user.id}>{user.username}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="user2" className="mb-2 block text-sm font-medium">Select User 2</label>
            <Select onValueChange={(value) => setUser2(Number(value))}>
              <SelectTrigger id="user2">
                {/* <SelectValue placeholder="Select User 2" /> */}
              </SelectTrigger>
              <SelectContent>
                {users.map(user => (
                  <SelectItem key={user.id} value={user.id}>{user.username}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {!competitionStarted && user1 && user2 && (
        <Button onClick={fetchQuestions} className="w-full">Start Competition</Button>
      )}

      {competitionStarted && questions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>{questions[currentQuestion].text}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {[user1, user2].map((userId, userIndex) => (
                <div key={userId}>
                  <h3 className="mb-2 font-semibold">
                    {users.find(u => u.id === userId)?.name}: {scores[userId!]} points
                  </h3>
                  {questions[currentQuestion].options.map((option, optionIndex) => (
                    <Button
                      key={optionIndex}
                      onClick={() => handleAnswer(userId!, optionIndex)}
                      className="mb-2 w-full"
                      variant="outline"
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-gray-500">
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </CardFooter>
        </Card>
      )}

      {!competitionStarted && scores[user1!] !== undefined && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Competition Results</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{users.find(u => u.id === user1)?.name}: {scores[user1!]} points</p>
            <p>{users.find(u => u.id === user2)?.name}: {scores[user2!]} points</p>
            <p className="mt-4 font-bold">
              Winner: {
                scores[user1!] > scores[user2!] 
                  ? users.find(u => u.id === user1)?.name 
                  : scores[user1!] < scores[user2!]
                    ? users.find(u => u.id === user2)?.name
                    : 'Tie'
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default UserCompetition;