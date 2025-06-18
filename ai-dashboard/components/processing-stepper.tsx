"use client"

import { motion } from "framer-motion"
import { Check, Upload, Cpu, FileText } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ProcessingStep } from "@/components/video-processor"

interface ProcessingStepperProps {
  currentStep: ProcessingStep
}

const steps = [
  {
    id: "upload",
    title: "Upload File",
    description: "Select your video or audio file",
    icon: Upload,
  },
  {
    id: "processing",
    title: "AI Processing",
    description: "Analyzing content with AI",
    icon: Cpu,
  },
  {
    id: "completed",
    title: "Results Ready",
    description: "View summary and insights",
    icon: FileText,
  },
]

export function ProcessingStepper({ currentStep }: ProcessingStepperProps) {
  const getCurrentStepIndex = () => {
    return steps.findIndex((step) => step.id === currentStep)
  }

  const currentStepIndex = getCurrentStepIndex()

  return (
    <div className="w-full">
      <div className="flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute top-6 left-6 right-6 h-0.5 bg-muted -z-10">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
            initial={{ width: "0%" }}
            animate={{
              width: currentStepIndex === 0 ? "0%" : currentStepIndex === 1 ? "50%" : "100%",
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </div>

        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex
          const isCurrent = index === currentStepIndex
          const IconComponent = step.icon

          return (
            <div key={step.id} className="flex flex-col items-center relative z-10">
              <motion.div
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                  isCompleted
                    ? "bg-primary border-primary text-primary-foreground"
                    : isCurrent
                      ? "bg-background border-primary text-primary shadow-lg"
                      : "bg-muted border-muted-foreground/30 text-muted-foreground",
                )}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                {isCompleted ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    <Check className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <IconComponent className="w-5 h-5" />
                )}
              </motion.div>

              <motion.div
                className="mt-3 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 + 0.3, duration: 0.5 }}
              >
                <h3
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isCurrent ? "text-primary" : isCompleted ? "text-muted-foreground" : "text-muted-foreground",
                  )}
                >
                  {step.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-1 max-w-24">{step.description}</p>
              </motion.div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
