"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import BackgroundAnimation from "@/components/BackgroundAnimation"
import QuestionDisplay from "@/components/QuestionDisplay"
import VoiceInput from "@/components/VoiceInput"
import ProgressBar from "@/components/ProgressBar"
import ResultsPage from "@/components/ResultsPage"
import { Button } from "@/components/ui/button"
import AnswerDisplay from "@/components/AnswerDisplay"

const questions = [
  "What is the capital of France?",
  "Who painted the Mona Lisa?",
  "What is the largest planet in our solar system?",
  "What year did World War II end?",
  "What is the chemical symbol for gold?",
]

const defaultAnswers = ["Paris", "Leonardo da Vinci", "Jupiter", "1945", "Au"]

export default function Home() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answer, setAnswer] = useState<string | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [score, setScore] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)
  const { toast } = useToast()

  const handleStartRecording = () => {
    setIsRecording(true)
    toast({
      title: "Recording started",
      description: "Speak your answer now.",
    })
  }

  const handleStopRecording = (transcript: string) => {
    setIsRecording(false)
    setAnswer(transcript || defaultAnswers[currentQuestionIndex])
    setScore(score + 1)
    setShowAnswer(true)
    toast({
      title: "Recording stopped",
      description: "Your answer has been recorded.",
    })
  }

  useEffect(() => {
    if (showAnswer) {
      const timer = setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex((prevIndex) => prevIndex + 1)
          setAnswer(null)
          setShowAnswer(false)
        } else {
          setShowResults(true)
        }
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [showAnswer, currentQuestionIndex])

  const handleSkip = () => {
    setAnswer(defaultAnswers[currentQuestionIndex])
    setShowAnswer(true)
  }

  if (showResults) {
    return <ResultsPage score={score} totalQuestions={questions.length} />
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 relative overflow-hidden bg-gradient-to-br from-purple-700 to-blue-900">
      <BackgroundAnimation />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="z-10"
      >
        <Card className="w-[900px] h-[500px] flex flex-col items-center justify-center p-6 bg-black/30 backdrop-blur-lg border-white/10 rounded-3xl shadow-2xl">
          <ProgressBar current={currentQuestionIndex + 1} total={questions.length} />
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full flex flex-col items-center justify-center"
            >
              <QuestionDisplay question={questions[currentQuestionIndex]} />
              {showAnswer ? (
                <AnswerDisplay answer={answer || ""} />
              ) : (
                <div className="flex flex-col items-center space-y-4">
                  <VoiceInput
                    isRecording={isRecording}
                    onStartRecording={handleStartRecording}
                    onStopRecording={handleStopRecording}
                  />

                </div>
              )}
            </motion.div>
            <div className="absolute bottom-10 left-10">
              <Button
                onClick={handleSkip}
                variant="link"
                className=" text-white border-white/20 hover:bg-white/20 transition-all duration-200 ease-in-out transform hover:scale-105"
              >
                Skip
              </Button>
            </div>
          </AnimatePresence>
        </Card>
      </motion.div>
      <Toaster />
    </main>
  )
}

