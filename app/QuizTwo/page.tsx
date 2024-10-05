import React from 'react'
import Link from 'next/link'
import NumberQuiz from "@/app/numbers/components/number-quiz"
import { ArrowLeft, BookCheck, CircleX } from 'lucide-react';

function QuizTwo() {
  return (
    <div>
       <Link href="/category" className="flex gap-2 p-2">
            <ArrowLeft className="size-8 rounded-full border bg-slate-100 p-2 hover:shadow dark:bg-slate-800"/> <span className="mt-2">Back </span>
        </Link>
      <NumberQuiz />
    </div>
  )
}

export default QuizTwo
