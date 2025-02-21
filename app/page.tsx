"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import BackgroundAnimation from "@/components/BackgroundAnimation"
import QuestionDisplay from "@/components/QuestionDisplay"
import VoiceInput from "@/components/VoiceInput"
import AnswerDisplay from "@/components/AnswerDisplay"
import ProgressBar from "@/components/ProgressBar"
import ResultsPage from "@/components/ResultsPage"

const questions = [
  {
    question: "What is the capital of France?",
    correctAnswer: "Paris"
  },
  {
    question: "Who painted the Mona Lisa?",
    correctAnswer: "Leonardo da Vinci"
  },
  {
    question: "What is the largest planet in our solar system?",
    correctAnswer: "Jupiter"
  },
  {
    question: "What year did World War II end?",
    correctAnswer: "1945"
  },
  {
    question: "What is the chemical symbol for gold?",
    correctAnswer: "Au"
  },
]

export default function Home() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answer, setAnswer] = useState<string | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [score, setScore] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
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
    setAnswer(transcript)
    toast({
      title: "Recording stopped",
      description: "Your answer has been recorded.",
    })

    // Enhanced scoring logic
    const isAnswerCorrect = transcript
      .toLowerCase()
      .includes(questions[currentQuestionIndex].correctAnswer.toLowerCase())
    
    setIsCorrect(isAnswerCorrect)
    
    if (isAnswerCorrect) {
      setScore((prevScore) => prevScore + 1)
    }

    // Move to next question or show results
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1)
        setAnswer(null)
        setIsCorrect(null)
      } else {
        setShowResults(true)
      }
    }, 3000) // Increased delay to show animation
  }

  if (showResults || !questions[currentQuestionIndex]) {
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
              className="w-full h-full flex flex-col items-center justify-center space-y-8"
            >
              {questions[currentQuestionIndex] && (
                <>
                  <QuestionDisplay question={questions[currentQuestionIndex].question} />
                  {!answer && (
                    <VoiceInput
                      isRecording={isRecording}
                      onStartRecording={handleStartRecording}
                      onStopRecording={handleStopRecording}
                    />
                  )}
                  {answer && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex flex-col items-center space-y-4"
                    >
                      <AnswerDisplay answer={answer} />
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-col items-center space-y-2"
                      >
                        <motion.div
                          animate={{
                            scale: [1, 1.2, 1],
                            transition: { duration: 0.5 }
                          }}
                          className={`text-2xl font-bold ${
                            isCorrect ? 'text-green-400' : 'text-red-400'
                          }`}
                        >
                          {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 }}
                          className="text-gray-200 text-sm"
                        >
                          Correct answer: {questions[currentQuestionIndex].correctAnswer}
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  )}
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </Card>
      </motion.div>
      <Toaster />
    </main>
  )
}

