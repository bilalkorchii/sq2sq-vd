"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  CheckCircle,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  Minus,
  Clock,
  Users,
  RotateCcw,
  Download,
  Share,
} from "lucide-react"
import type { AnalysisResult } from "@/components/video-processor"

interface ResultsDisplayProps {
  result: AnalysisResult
  fileName: string
  onReset: () => void
}

export function ResultsDisplay({ result, fileName, onReset }: ResultsDisplayProps) {
  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return <TrendingUp className="h-4 w-4 text-muted-foreground" />
      case "negative":
        return <TrendingDown className="h-4 w-4 text-muted-foreground" />
      default:
        return <Minus className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "bg-background text-foreground border"
      case "negative":
        return "bg-background text-foreground border"
      default:
        return "bg-background text-foreground border"
    }
  }

  return (
    <div className="space-y-6">
      {/* Success Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="inline-flex items-center justify-center w-16 h-16 bg-muted rounded-full"
        >
          <CheckCircle className="w-8 h-8 text-muted-foreground" />
        </motion.div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">Analysis Complete!</h2>
          <p className="text-muted-foreground">
            Successfully analyzed <span className="font-medium">{fileName}</span>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-3">
          <Button variant="outline" onClick={onReset}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Analyze Another
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Results
          </Button>
          <Button variant="outline">
            <Share className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      </motion.div>

      {/* File Info */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{result.duration}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{result.participants} participants</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getSentimentIcon(result.sentiment.overall)}
                <Badge className={getSentimentColor(result.sentiment.overall)}>{result.sentiment.overall}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Summary */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="mr-2 h-5 w-5" />
              Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{result.summary}</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Sentiment Analysis */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <Card>
          <CardHeader>
            <CardTitle>Sentiment Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Positive</span>
                <span className="text-sm font-medium">{result.sentiment.positive}%</span>
              </div>
              <Progress value={result.sentiment.positive} className="h-2" />

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Neutral</span>
                <span className="text-sm font-medium">{result.sentiment.neutral}%</span>
              </div>
              <Progress value={result.sentiment.neutral} className="h-2" />

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Negative</span>
                <span className="text-sm font-medium">{result.sentiment.negative}%</span>
              </div>
              <Progress value={result.sentiment.negative} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
