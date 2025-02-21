"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import confetti from "canvas-confetti"
import { useEffect } from "react"

interface ResultsPageProps {
  score: number
  totalQuestions: number
}

const ResultsPage: React.FC<ResultsPageProps> = ({ score, totalQuestions }) => {
  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
  }, [])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 relative overflow-hidden bg-gradient-to-br from-purple-700 to-blue-900">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="w-[400px] h-[500px] flex flex-col items-center justify-center p-6 bg-black/30 backdrop-blur-lg border-white/10 rounded-3xl shadow-2xl">
          <h1 className="text-4xl font-bold text-white mb-8">Quiz Results</h1>
          <p className="text-2xl text-white mb-4">
            Your score: {score} / {totalQuestions}
          </p>
          <motion.div
            className="w-48 h-48 rounded-full border-8 border-white flex items-center justify-center mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <span className="text-5xl font-bold text-white">{Math.round((score / totalQuestions) * 100)}%</span>
          </motion.div>
          <Button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-200 ease-in-out transform hover:scale-105"
          >
            Play Again
          </Button>
        </Card>
      </motion.div>
    </div>
  )
}

export default ResultsPage

