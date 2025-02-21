"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Mic, MicOff } from "lucide-react"

interface VoiceInputProps {
  isRecording: boolean
  onStartRecording: () => void
  onStopRecording: (transcript: string) => void
}

// Define types for Web Speech API since TypeScript doesn't include them by default
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList
}

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult
  length: number
}

interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative
  isFinal: boolean
  length: number
}

interface SpeechRecognitionAlternative {
  transcript: string
  confidence: number
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition
    webkitSpeechRecognition: new () => SpeechRecognition
  }
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  onresult: (event: SpeechRecognitionEvent) => void
  start: () => void
  stop: () => void
}

const VoiceInput: React.FC<VoiceInputProps> = ({ isRecording, onStartRecording, onStopRecording }) => {
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null)

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition()
      recognition.continuous = true
      recognition.interimResults = true
      recognition.lang = "en-US"

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join("")

        if (event.results[0].isFinal) {
          onStopRecording(transcript)
        }
      }

      setRecognition(recognition)
    }
  }, [onStopRecording])

  const handleToggleRecording = () => {
    if (isRecording) {
      recognition?.stop()
      onStopRecording("")
    } else {
      recognition?.start()
      onStartRecording()
    }
  }

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <Button
        onClick={handleToggleRecording}
        className={`w-16 h-16 rounded-full transition-all duration-200 ease-in-out transform hover:scale-110 ${
          isRecording
            ? "bg-red-500 hover:bg-red-600"
            : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
        }`}
      >
        {isRecording ? <MicOff className="w-8 h-8 text-white" /> : <Mic className="w-8 h-8 text-white" />}
      </Button>
    </motion.div>
  )
}

export default VoiceInput
