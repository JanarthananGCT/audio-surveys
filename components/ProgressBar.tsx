"use client"

import type React from "react"

import { motion } from "framer-motion"

interface ProgressBarProps {
  current: number
  total: number
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const progress = (current / total) * 100

  return (
    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-6">
      <motion.div
        className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5 }}
      />
    </div>
  )
}

export default ProgressBar

