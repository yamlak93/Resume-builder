"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/hooks/use-toast"
import { FileText, Palette, Download, Sparkles, Save, Upload } from "lucide-react"
import ResumeForm from "@/components/resume-form"
import ResumePreview from "@/components/resume-preview"
import TemplateSelector from "@/components/template-selector"
import CustomizationPanel from "@/components/customization-panel"
import ExportPanel from "@/components/export-panel"
import AISuggestions from "@/components/ai-suggestions"
import type { ResumeData, ResumeSettings } from "@/lib/types"
import { defaultResumeData, defaultSettings } from "@/lib/resume-data"

export default function ResumeBuilder() {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData)
  const [settings, setSettings] = useState<ResumeSettings>(defaultSettings)
  const [activeTab, setActiveTab] = useState("form")
  const { toast } = useToast()

  // Apply dark mode to document
  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [settings.darkMode])

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("resumeData")
    const savedSettings = localStorage.getItem("resumeSettings")

    if (savedData) {
      try {
        setResumeData(JSON.parse(savedData))
      } catch (error) {
        console.error("Error loading saved resume data:", error)
      }
    }

    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings))
      } catch (error) {
        console.error("Error loading saved settings:", error)
      }
    }
  }, [])

  // Auto-save to localStorage
  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(resumeData))
  }, [resumeData])

  useEffect(() => {
    localStorage.setItem("resumeSettings", JSON.stringify(settings))
  }, [settings])

  const handleSaveData = () => {
    const dataToSave = {
      resumeData,
      settings,
      timestamp: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(dataToSave, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `resume_backup_${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Data Saved!",
      description: "Your resume data has been downloaded as a backup file.",
    })
  }

  const handleLoadData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string)
        if (data.resumeData) {
          setResumeData(data.resumeData)
        }
        if (data.settings) {
          setSettings(data.settings)
        }
        toast({
          title: "Data Loaded!",
          description: "Your resume data has been successfully imported.",
        })
      } catch (error) {
        toast({
          title: "Import Failed",
          description: "The file format is invalid. Please check your backup file.",
          variant: "destructive",
        })
      }
    }
    reader.readAsText(file)
  }

  const handleAISuggestionApply = (suggestion: string) => {
    setResumeData((prev) => ({
      ...prev,
      summary: suggestion,
    }))
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${settings.darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      {/* Header */}
      <header
        className={`shadow-sm border-b transition-colors duration-300 ${settings.darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <h1 className={`text-2xl font-bold ${settings.darkMode ? "text-gray-100" : "text-gray-900"}`}>
                Resume Builder
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleSaveData}>
                <Save className="w-4 h-4 mr-2" />
                Save Backup
              </Button>
              <label>
                <Button variant="outline" size="sm" asChild>
                  <span>
                    <Upload className="w-4 h-4 mr-2" />
                    Load Backup
                  </span>
                </Button>
                <input type="file" accept=".json" onChange={handleLoadData} className="hidden" />
              </label>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8">
          {/* Left Panel - Form and Controls */}
          <div className="xl:col-span-1 space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList
                className={`grid w-full grid-cols-2 sm:grid-cols-4 gap-1 h-auto p-1 rounded-lg transition-colors duration-300 ${settings.darkMode ? "bg-gray-800" : "bg-gray-100"}`}
              >
                <TabsTrigger value="form" className="text-xs sm:text-sm px-2 py-2 whitespace-nowrap">
                  <FileText className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">Form</span>
                </TabsTrigger>
                <TabsTrigger value="templates" className="text-xs sm:text-sm px-2 py-2 whitespace-nowrap">
                  <Palette className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">Style</span>
                </TabsTrigger>
                <TabsTrigger value="export" className="text-xs sm:text-sm px-2 py-2 whitespace-nowrap">
                  <Download className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">Export</span>
                </TabsTrigger>
                <TabsTrigger value="ai" className="text-xs sm:text-sm px-2 py-2 whitespace-nowrap">
                  <Sparkles className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">AI</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="form" className="mt-6">
                <ScrollArea className="h-[calc(100vh-200px)]">
                  <ResumeForm data={resumeData} onChange={setResumeData} />
                </ScrollArea>
              </TabsContent>

              <TabsContent value="templates" className="mt-6 space-y-6">
                <TemplateSelector settings={settings} onSettingsChange={setSettings} />
                <CustomizationPanel settings={settings} onSettingsChange={setSettings} />
              </TabsContent>

              <TabsContent value="export" className="mt-6">
                <ExportPanel data={resumeData} />
              </TabsContent>

              <TabsContent value="ai" className="mt-6">
                <AISuggestions onSuggestionApply={handleAISuggestionApply} />
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Panel - Preview */}
          <div className="lg:col-span-2">
            <Card
              className={`h-[calc(100vh-120px)] transition-colors duration-300 ${settings.darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
            >
              <CardContent className="p-0 h-full">
                <ScrollArea className="h-full">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className={`text-xl font-semibold ${settings.darkMode ? "text-gray-100" : "text-gray-900"}`}>
                        Live Preview
                      </h2>
                      <div
                        className={`flex items-center gap-2 text-sm ${settings.darkMode ? "text-gray-400" : "text-gray-600"}`}
                      >
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        Auto-updating
                      </div>
                    </div>
                    <div
                      className={`border rounded-lg overflow-hidden shadow-sm transition-colors duration-300 ${settings.darkMode ? "border-gray-700" : "border-gray-200"}`}
                    >
                      <ResumePreview data={resumeData} settings={settings} />
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <Card
          className={`transition-colors duration-300 ${settings.darkMode ? "bg-blue-900/20 border-blue-700" : "bg-blue-50 border-blue-200"}`}
        >
          <CardContent className="p-6">
            <h3 className={`font-semibold mb-3 ${settings.darkMode ? "text-blue-300" : "text-blue-900"}`}>
              💡 Quick Tips
            </h3>
            <div
              className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm ${settings.darkMode ? "text-blue-200" : "text-blue-800"}`}
            >
              <div>
                <strong>📝 Content:</strong> Use action verbs and quantify achievements with specific numbers and
                metrics.
              </div>
              <div>
                <strong>🎨 Design:</strong> Choose a template that matches your industry - creative for design, classic
                for finance.
              </div>
              <div>
                <strong>📱 Format:</strong> Keep it to 1-2 pages and ensure it's ATS-friendly for online applications.
              </div>
              <div>
                <strong>🤖 AI Help:</strong> Use the AI assistant to improve your bullet points and make them more
                impactful.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
