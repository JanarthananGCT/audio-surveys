"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface QuestionDisplayProps {
  question: string
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({ question }) => {
  const [displayedText, setDisplayedText] = useState("")

  useEffect(() => {
    let i = 0
    const intervalId = setInterval(() => {
      setDisplayedText(question)
      i++
      if (i > question.length) {
        clearInterval(intervalId)
        speak(question)
      }
    }, 50)

    return () => clearInterval(intervalId)
  }, [question])

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    
    // Find a female voice (example: Google voices or default ones)
    const femaleVoice = voices.find(voice => voice.name.includes("Female") || voice.name.includes("Google UK English Female"));
  
    // Set the voice if found
    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }
  
    window.speechSynthesis.speak(utterance);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-3xl font-bold text-white mb-8 text-center"
    >
      {[...question].map((char, index) => (
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

export default QuestionDisplay

