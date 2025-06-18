"use client"

import { useState, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ProcessingStepper } from "@/components/processing-stepper"
import { FileUploadZone } from "@/components/file-upload-zone"
import { ProcessingAnimation } from "@/components/processing-animation"
import { ResultsDisplay } from "@/components/results-display"
import { motion, AnimatePresence } from "framer-motion"

export type ProcessingStep = "upload" | "processing" | "completed"

export interface AnalysisResult {
  summary: string
  sentiment: {
    positive: number
    neutral: number
    negative: number
    overall: "positive" | "neutral" | "negative"
  }
  duration: string
  participants: number
}

export function VideoProcessor() {
  const [currentStep, setCurrentStep] = useState<ProcessingStep>("upload")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)

  const handleFileUpload = useCallback(async (file: File) => {
    setUploadedFile(file)
    setCurrentStep("processing")

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("http://127.0.0.1:8000/summarize", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to process the video")
      }

      const data = await response.json()

      const result: AnalysisResult = {
        summary: data.summary,
        sentiment: {
          positive: data.response === "Positive" ? data.confidence : 0,
          neutral: data.response === "Neutral" ? data.confidence : 0,
          negative: data.response === "Negative" ? data.confidence : 0,
          overall: data.response.toLowerCase(),
        },
        duration: "N/A",
        participants: 0,
      }

      setAnalysisResult(result)
      setCurrentStep("completed")
    } catch (error) {
      console.error("Upload error:", error)
      alert("Something went wrong. Please try again.")
      setCurrentStep("upload")
    }
  }, [])

  const handleReset = useCallback(() => {
    setCurrentStep("upload")
    setUploadedFile(null)
    setAnalysisResult(null)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
     
        <p className="text-lg text-muted-foreground">
          Upload your meeting recordings and get instant AI-powered summaries and insights
        </p>
      </motion.div>

      <ProcessingStepper currentStep={currentStep} />

      <Card className="mt-8 overflow-hidden">
        <CardContent className="p-0">
          <AnimatePresence mode="wait">
            {currentStep === "upload" && (
              <motion.div
                key="upload"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="p-8"
              >
                <FileUploadZone onFileUpload={handleFileUpload} />
              </motion.div>
            )}

            {currentStep === "processing" && (
              <motion.div
                key="processing"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="p-8"
              >
                <ProcessingAnimation fileName={uploadedFile?.name || ""} />
              </motion.div>
            )}

            {currentStep === "completed" && analysisResult && (
              <motion.div
                key="completed"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="p-8"
              >
                <ResultsDisplay result={analysisResult} fileName={uploadedFile?.name || ""} onReset={handleReset} />
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  )
}
