"use client"

import { motion } from "framer-motion"
import { Cpu, Zap, Brain, FileSearch } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useState, useEffect } from "react"

interface ProcessingAnimationProps {
  fileName: string
}

const processingSteps = [
  { icon: FileSearch, text: "Analyzing audio content...", duration: 2000 },
  { icon: Brain, text: "Extracting key insights...", duration: 2000 },
  { icon: Zap, text: "Performing sentiment analysis...", duration: 2000 },
  { icon: Cpu, text: "Generating summary...", duration: 2000 },
]

export function ProcessingAnimation({ fileName }: ProcessingAnimationProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const totalDuration = 8000 // 8 seconds total
    const stepDuration = totalDuration / processingSteps.length

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 100 / (totalDuration / 100)
        return Math.min(newProgress, 100)
      })
    }, 100)

    const stepInterval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        const next = prev + 1
        return next >= processingSteps.length ? prev : next
      })
    }, stepDuration)

    return () => {
      clearInterval(progressInterval)
      clearInterval(stepInterval)
    }
  }, [])

  const currentStep = processingSteps[currentStepIndex]
  const IconComponent = currentStep?.icon || Cpu

  return (
    <div className="text-center space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Processing Your File</h2>
        <p className="text-muted-foreground">
          AI is analyzing <span className="font-medium">{fileName}</span>
        </p>
      </div>

      {/* Animated Icon */}
      <motion.div
        className="flex justify-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center">
          <IconComponent className="w-12 h-12 text-primary-foreground" />
        </div>
      </motion.div>

      {/* Current Step */}
      <motion.div
        key={currentStepIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <p className="text-lg font-medium text-primary">{currentStep?.text || "Processing..."}</p>

        {/* Progress Bar */}
        <div className="max-w-md mx-auto space-y-2">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-muted-foreground">{Math.round(progress)}% complete</p>
        </div>
      </motion.div>

      {/* Processing Steps List */}
      <div className="max-w-md mx-auto space-y-3">
        {processingSteps.map((step, index) => {
          const StepIcon = step.icon
          const isCompleted = index < currentStepIndex
          const isCurrent = index === currentStepIndex

          return (
            <motion.div
              key={index}
              className="flex items-center space-x-3 p-2 rounded-lg transition-colors"
              initial={{ opacity: 0.5 }}
              animate={{
                opacity: isCompleted ? 1 : isCurrent ? 1 : 0.5,
                backgroundColor: isCurrent ? "rgba(59, 130, 246, 0.1)" : "transparent",
              }}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  isCompleted
                    ? "bg-primary text-primary-foreground"
                    : isCurrent
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                <StepIcon className="w-3 h-3" />
              </div>
              <span className={`text-sm ${isCurrent ? "text-primary font-medium" : "text-muted-foreground"}`}>
                {step.text}
              </span>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
