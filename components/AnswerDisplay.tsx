"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

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
      }
    }, 50)

    return () => clearInterval(intervalId)
  }, [answer])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="text-3xl font-bold text-white mb-8 text-center"
    >
      {displayedText.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  )
}

export default AnswerDisplay

