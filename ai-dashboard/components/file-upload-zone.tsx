"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { motion } from "framer-motion"
import { Upload, FileVideo, FileAudio, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FileUploadZoneProps {
  onFileUpload: (file: File) => void
}

export function FileUploadZone({ onFileUpload }: FileUploadZoneProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0])
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "video/*": [".mp4", ".avi", ".mov", ".wmv", ".flv", ".webm"],
      "audio/*": [".mp3", ".wav", ".aac", ".ogg", ".m4a", ".flac"],
    },
    multiple: false,
  })

  const handleUpload = () => {
    if (selectedFile) {
      onFileUpload(selectedFile)
    }
  }

  const removeFile = () => {
    setSelectedFile(null)
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("video/")) {
      return <FileVideo className="h-8 w-8 text-muted-foreground" />
    }
    return <FileAudio className="h-8 w-8 text-muted-foreground" />
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Upload Your Media File</h2>
        <p className="text-muted-foreground">Select a video or audio file from your meetings, calls, or recordings</p>
      </div>

      <motion.div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-300",
          isDragActive
            ? "border-primary bg-muted/50"
            : "border-muted-foreground/25 hover:border-primary hover:bg-muted/50",
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <input {...getInputProps()} />

        <motion.div
          animate={isDragActive ? { scale: 1.1 } : { scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Upload className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
        </motion.div>

        {isDragActive ? (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-xl font-medium text-primary">Drop your file here!</p>
          </motion.div>
        ) : (
          <div>
            <p className="text-xl font-medium mb-2">Drag & drop your file here</p>
            <p className="text-muted-foreground mb-4">or click to browse</p>
            <div className="flex flex-wrap justify-center gap-2 text-sm text-muted-foreground">
              <span className="px-2 py-1 bg-muted rounded">MP4</span>
              <span className="px-2 py-1 bg-muted rounded">AVI</span>
              <span className="px-2 py-1 bg-muted rounded">MOV</span>
              <span className="px-2 py-1 bg-muted rounded">MP3</span>
              <span className="px-2 py-1 bg-muted rounded">WAV</span>
              <span className="px-2 py-1 bg-muted rounded">AAC</span>
            </div>
          </div>
        )}
      </motion.div>

      {selectedFile && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-muted/50 rounded-lg p-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getFileIcon(selectedFile)}
              <div>
                <p className="font-medium">{selectedFile.name}</p>
                <p className="text-sm text-muted-foreground">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={removeFile}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <motion.div className="mt-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <Button onClick={handleUpload} className="w-full" size="lg">
              <Upload className="mr-2 h-4 w-4" />
              Start AI Analysis
            </Button>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
