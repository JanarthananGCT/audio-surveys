"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import confetti from "canvas-confetti"

interface AnswerDisplayProps {
  answer: string
}

const AnswerDisplay: React.FC<AnswerDisplayProps> = ({ answer }) => {
  const [displayedText, setDisplayedText] = useState("")

  useEffect(() => {
    let i = 0
    const intervalId = setInterval(() => {
      setDisplayedText(answer.slice(0, i))
      i++
      if (i > answer.length) {
        clearInterval(intervalId)
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        })
      }
    }, 50)

    return () => clearInterval(intervalId)
  }, [answer])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-xl text-white text-center"
    >
      {displayedText}
    </motion.div>
  )
}

export default AnswerDisplay

