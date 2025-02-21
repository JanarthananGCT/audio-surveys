"use client"

import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { Mic, MicOff } from "lucide-react"

interface VoiceInputProps {
  isRecording: boolean
  onStartRecording: () => void
  onStopRecording: (transcript: string) => void
}

export default function VoiceInput({
  isRecording,
  onStartRecording,
  onStopRecording,
}: VoiceInputProps) {
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition()
        recognition.continuous = false
        recognition.interimResults = false
        recognition.lang = 'en-US'

        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript
          console.log(transcript)
          onStopRecording(transcript)
        }

        recognition.onerror = (event) => {
          console.error('Speech recognition error:', event.error)
          onStopRecording("")
        }

        setRecognition(recognition)
      }
    }
  }, [onStopRecording])

  const handleStartRecording = () => {
    if (recognition) {
      recognition.start()
      onStartRecording()
    }
  }

  const handleStopRecording = () => {
    if (recognition) {
      recognition.stop()
    }
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <Button
        onClick={isRecording ? handleStopRecording : handleStartRecording}
        variant="outline"
        size="lg"
        className={`rounded-full p-8 transition-all duration-300 ${
          isRecording 
            ? 'bg-red-500 hover:bg-red-600 text-white' 
            : 'bg-blue-500 hover:bg-blue-600 text-white'
        }`}
      >
        {isRecording ? (
          <MicOff className="w-8 h-8 animate-pulse" />
        ) : (
          <Mic className="w-8 h-8" />
        )}
      </Button>
      <p className="text-gray-200 text-sm">
        {isRecording ? "Click to stop recording" : "Click to start recording"}
      </p>
    </div>
  )
}

