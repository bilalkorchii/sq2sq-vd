"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileAudio, FileVideo, Download, Eye, Trash2, Clock, Users } from "lucide-react"

const recentFiles = [
  {
    id: 1,
    name: "team-meeting-2024-01-15.mp4",
    type: "video",
    size: "245 MB",
    duration: "45:32",
    participants: 6,
    status: "completed",
    uploadDate: "2024-01-15",
    sentiment: "positive",
  },
  {
    id: 2,
    name: "client-call-acme-corp.mp3",
    type: "audio",
    size: "89 MB",
    duration: "28:15",
    participants: 3,
    status: "completed",
    uploadDate: "2024-01-15",
    sentiment: "neutral",
  },
  {
    id: 3,
    name: "standup-meeting-jan-14.mp4",
    type: "video",
    size: "156 MB",
    duration: "15:45",
    participants: 8,
    status: "processing",
    uploadDate: "2024-01-14",
    sentiment: null,
  },
  {
    id: 4,
    name: "sales-call-prospect-xyz.mp3",
    type: "audio",
    size: "67 MB",
    duration: "22:30",
    participants: 2,
    status: "completed",
    uploadDate: "2024-01-14",
    sentiment: "positive",
  },
  {
    id: 5,
    name: "board-meeting-q4-review.mp4",
    type: "video",
    size: "512 MB",
    duration: "1:23:45",
    participants: 12,
    status: "failed",
    uploadDate: "2024-01-13",
    sentiment: null,
  },
]

export function RecentFiles() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>
      case "processing":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Processing</Badge>
      case "failed":
        return <Badge variant="destructive">Failed</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getSentimentBadge = (sentiment: string | null) => {
    if (!sentiment) return null

    switch (sentiment) {
      case "positive":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Positive</Badge>
      case "negative":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Negative</Badge>
      case "neutral":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Neutral</Badge>
      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Files</CardTitle>
        <CardDescription>Your recently uploaded and processed media files</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>File</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Sentiment</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentFiles.map((file) => (
              <TableRow key={file.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    {file.type === "video" ? (
                      <FileVideo className="h-5 w-5 text-blue-500" />
                    ) : (
                      <FileAudio className="h-5 w-5 text-green-500" />
                    )}
                    <div>
                      <div className="font-medium">{file.name}</div>
                      <div className="text-sm text-muted-foreground">{file.size}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center text-sm">
                      <Clock className="h-3 w-3 mr-1" />
                      {file.duration}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="h-3 w-3 mr-1" />
                      {file.participants} participants
                    </div>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(file.status)}</TableCell>
                <TableCell>{getSentimentBadge(file.sentiment)}</TableCell>
                <TableCell>{file.uploadDate}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
