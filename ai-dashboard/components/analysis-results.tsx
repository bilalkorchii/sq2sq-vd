"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { FileAudio, FileVideo, Clock, Users, MessageSquare, TrendingUp, TrendingDown, Minus } from "lucide-react"

const mockResults = [
  {
    id: 1,
    fileName: "team-meeting-2024-01-15.mp4",
    type: "video",
    duration: "45:32",
    participants: 6,
    uploadTime: "2 hours ago",
    summary:
      "Team discussed Q1 goals, budget allocation, and upcoming product launch. Key decisions made regarding marketing strategy and resource allocation. Action items assigned to team leads.",
    sentiment: {
      positive: 65,
      neutral: 25,
      negative: 10,
      overall: "positive",
    },
    keyTopics: ["Budget Planning", "Product Launch", "Marketing Strategy", "Team Goals"],
    actionItems: [
      "John to prepare marketing budget by Friday",
      "Sarah to schedule client meetings next week",
      "Team to review product specifications",
    ],
  },
  {
    id: 2,
    fileName: "client-call-acme-corp.mp3",
    type: "audio",
    duration: "28:15",
    participants: 3,
    uploadTime: "5 hours ago",
    summary:
      "Client expressed concerns about project timeline and requested additional features. Discussion about scope changes and budget implications. Follow-up meeting scheduled.",
    sentiment: {
      positive: 30,
      neutral: 45,
      negative: 25,
      overall: "neutral",
    },
    keyTopics: ["Timeline Concerns", "Scope Changes", "Budget Discussion", "Feature Requests"],
    actionItems: [
      "Prepare revised timeline proposal",
      "Cost analysis for additional features",
      "Schedule follow-up meeting with stakeholders",
    ],
  },
]

export function AnalysisResults() {
  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "negative":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <Minus className="h-4 w-4 text-yellow-500" />
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "bg-green-500"
      case "negative":
        return "bg-red-500"
      default:
        return "bg-yellow-500"
    }
  }

  return (
    <div className="space-y-6">
      {mockResults.map((result) => (
        <Card key={result.id} className="w-full">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {result.type === "video" ? (
                  <FileVideo className="h-6 w-6 text-blue-500" />
                ) : (
                  <FileAudio className="h-6 w-6 text-green-500" />
                )}
                <div>
                  <CardTitle className="text-lg">{result.fileName}</CardTitle>
                  <CardDescription className="flex items-center space-x-4 mt-1">
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {result.duration}
                    </span>
                    <span className="flex items-center">
                      <Users className="h-3 w-3 mr-1" />
                      {result.participants} participants
                    </span>
                    <span>{result.uploadTime}</span>
                  </CardDescription>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getSentimentIcon(result.sentiment.overall)}
                <Badge
                  variant={
                    result.sentiment.overall === "positive"
                      ? "default"
                      : result.sentiment.overall === "negative"
                        ? "destructive"
                        : "secondary"
                  }
                >
                  {result.sentiment.overall}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Summary */}
            <div>
              <h4 className="font-semibold mb-2 flex items-center">
                <MessageSquare className="h-4 w-4 mr-2" />
                Summary
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{result.summary}</p>
            </div>

            <Separator />

            {/* Sentiment Analysis */}
            <div>
              <h4 className="font-semibold mb-3">Sentiment Analysis</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-green-600">Positive</span>
                  <span className="text-sm">{result.sentiment.positive}%</span>
                </div>
                <Progress value={result.sentiment.positive} className="h-2" />

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-yellow-600">Neutral</span>
                  <span className="text-sm">{result.sentiment.neutral}%</span>
                </div>
                <Progress value={result.sentiment.neutral} className="h-2" />

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-red-600">Negative</span>
                  <span className="text-sm">{result.sentiment.negative}%</span>
                </div>
                <Progress value={result.sentiment.negative} className="h-2" />
              </div>
            </div>

            <Separator />

            {/* Key Topics */}
            <div>
              <h4 className="font-semibold mb-3">Key Topics</h4>
              <div className="flex flex-wrap gap-2">
                {result.keyTopics.map((topic, index) => (
                  <Badge key={index} variant="outline">
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            {/* Action Items */}
            <div>
              <h4 className="font-semibold mb-3">Action Items</h4>
              <ul className="space-y-2">
                {result.actionItems.map((item, index) => (
                  <li key={index} className="text-sm flex items-start">
                    <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
