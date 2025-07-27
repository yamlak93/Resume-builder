"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Download, FileText, Code } from "lucide-react"
import type { ResumeData } from "@/lib/types"
import { exportToPDF } from "@/lib/pdf-export"
import { exportToMarkdown, downloadMarkdown } from "@/lib/markdown-export"

interface ExportPanelProps {
  data: ResumeData
}

export default function ExportPanel({ data }: ExportPanelProps) {
  const [isExporting, setIsExporting] = useState(false)
  const { toast } = useToast()

  const handlePDFExport = async () => {
    if (!data.personalInfo.name) {
      toast({
        title: "Missing Information",
        description: "Please add your name before exporting.",
        variant: "destructive",
      })
      return
    }

    setIsExporting(true)
    try {
      await exportToPDF(data, "resume-preview")
      toast({
        title: "Print Dialog Opened!",
        description: "Use your browser's print dialog to save as PDF or print your resume.",
      })
    } catch (error) {
      console.error("Export error:", error)
      toast({
        title: "Export Failed",
        description:
          error instanceof Error ? error.message : "There was an error generating your PDF. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  const handleMarkdownExport = () => {
    if (!data.personalInfo.name) {
      toast({
        title: "Missing Information",
        description: "Please add your name before exporting.",
        variant: "destructive",
      })
      return
    }

    try {
      const markdown = exportToMarkdown(data)
      const filename = data.personalInfo.name.replace(/\s+/g, "_") + "_Resume"
      downloadMarkdown(markdown, filename)
      toast({
        title: "Success!",
        description: "Your resume has been downloaded as Markdown.",
      })
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error generating your Markdown file. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="w-5 h-5" />
          Export Resume
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={handlePDFExport} disabled={isExporting} className="w-full" size="lg">
          <FileText className="w-4 h-4 mr-2" />
          {isExporting ? "Opening Print Dialog..." : "Print / Save as PDF"}
        </Button>

        <Button onClick={handleMarkdownExport} variant="outline" className="w-full bg-transparent" size="lg">
          <Code className="w-4 h-4 mr-2" />
          Download as Markdown
        </Button>

        <div className="text-sm text-gray-600 space-y-2">
          <p>
            <strong>Print/PDF:</strong> Opens browser print dialog - choose "Save as PDF" as destination
          </p>
          <p>
            <strong>Markdown:</strong> Great for developers and version control
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
