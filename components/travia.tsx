"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, RefreshCw } from "lucide-react"

export default function Trivia() {
  const [question, setQuestion] = useState(null)
  const [answers, setAnswers] = useState([])
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [correctAnswer, setCorrectAnswer] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isChecking, setIsChecking] = useState(false)
  const [showResult, setShowResult] = useState(false)

  const fetchQuestion = () => {
    setLoading(true)
    setSelectedAnswer(null)
    setShowResult(false)

    fetch("https://opentdb.com/api.php?amount=1&category=9&difficulty=easy&type=multiple")
      .then((res) => res.json())
      .then((data) => {
        if (data.results.length > 0) {
          const q = data.results[0]
          setQuestion(decodeHTML(q.question))
          setCorrectAnswer(decodeHTML(q.correct_answer))

          // Decode and shuffle answers
          const allAnswers = [...q.incorrect_answers.map((a) => decodeHTML(a)), decodeHTML(q.correct_answer)].sort(
            () => Math.random() - 0.5,
          )

          setAnswers(allAnswers)
          setLoading(false)
        }
      })
      .catch((error) => {
        console.error("Error fetching trivia:", error)
        setLoading(false)
      })
  }

  // Function to decode HTML entities
  const decodeHTML = (html) => {
    const txt = document.createElement("textarea")
    txt.innerHTML = html
    return txt.value
  }

  useEffect(() => {
    fetchQuestion()
  }, [])

  const handleAnswerClick = (answer) => {
    if (showResult) return

    setSelectedAnswer(answer)
    setIsChecking(true)

    // Simulate a brief delay before showing the result
    setTimeout(() => {
      setShowResult(true)
      setIsChecking(false)
    }, 500)
  }

  const handleNextQuestion = () => {
    fetchQuestion()
  }

  return (
    <div className="mx-auto flex min-h-[50vh] items-center justify-center px-4 py-8">
      <Card className="w-full max-w-3xl shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl sm:text-3xl">Online Quiz Challenge</CardTitle>
          <CardDescription>Test your general knowledge</CardDescription>
        </CardHeader>

        <CardContent className="pb-6 pt-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="mb-4 size-8 animate-spin text-primary" />
              <p className="text-muted-foreground">Loading your question...</p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h3 className="mb-2 text-center text-lg font-medium">Question:</h3>
                <p className="text-center text-xl">{question}</p>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {answers.map((answer, index) => (
                  <Button
                    key={index}
                    variant={
                      showResult
                        ? answer === correctAnswer
                          ? "default"
                          : answer === selectedAnswer
                            ? "destructive"
                            : "outline"
                        : selectedAnswer === answer
                          ? "secondary"
                          : "outline"
                    }
                    className={`h-auto justify-start border-2 p-4 text-base transition-all ${
                      isChecking && selectedAnswer === answer ? "animate-pulse" : ""
                    } ${showResult && answer === correctAnswer ? "ring-2 ring-green-500" : ""}`}
                    onClick={() => handleAnswerClick(answer)}
                    disabled={isChecking}
                  >
                    {answer}
                  </Button>
                ))}
              </div>

              {showResult && (
                <div className="mt-6 text-center">
                  <p
                    className={`text-lg font-bold ${selectedAnswer === correctAnswer ? "text-green-600" : "text-red-600"}`}
                  >
                    {selectedAnswer === correctAnswer
                      ? "✓ Correct! Well done!"
                      : `✗ Incorrect! The correct answer is: ${correctAnswer}`}
                  </p>
                </div>
              )}
            </>
          )}
        </CardContent>

        <CardFooter className="flex justify-center border-t pt-6">
          {showResult ? (
            <Button onClick={handleNextQuestion} className="w-full sm:w-auto" size="lg">
              <RefreshCw className="mr-2 size-4" />
              Next Question
            </Button>
          ) : (
            <Button
              onClick={handleNextQuestion}
              variant="outline"
              className="w-full sm:w-auto"
              disabled={loading || isChecking}
            >
              Skip Question
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

