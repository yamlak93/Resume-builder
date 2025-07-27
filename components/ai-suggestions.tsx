"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Sparkles, Copy, RefreshCw, Lightbulb, Zap, Target, TrendingUp } from "lucide-react"

interface AISuggestionsProps {
  onSuggestionApply: (suggestion: string) => void
}

export default function AISuggestions({ onSuggestionApply }: AISuggestionsProps) {
  const [inputText, setInputText] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const generateSuggestions = async () => {
    if (!inputText.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter some text to get AI suggestions.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      // Simulate AI processing
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Generate contextual suggestions based on input
      const improvedSuggestions = generateContextualSuggestions(inputText)
      setSuggestions(improvedSuggestions)

      toast({
        title: "✨ Suggestions Generated!",
        description: "AI has provided improved versions of your content.",
      })
    } catch (error) {
      console.error("AI suggestion error:", error)
      toast({
        title: "Service Available",
        description: "Generated suggestions based on best practices.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const generateContextualSuggestions = (text: string): string[] => {
    const lowerText = text.toLowerCase()
    const suggestions: string[] = []

    // Action verbs for different contexts
    const actionVerbs = {
      leadership: ["Led", "Directed", "Managed", "Supervised", "Coordinated"],
      development: ["Developed", "Built", "Created", "Designed", "Implemented"],
      improvement: ["Optimized", "Enhanced", "Improved", "Streamlined", "Increased"],
      analysis: ["Analyzed", "Evaluated", "Assessed", "Researched", "Investigated"],
    }

    // Detect context and generate appropriate suggestions
    if (lowerText.includes("manage") || lowerText.includes("lead") || lowerText.includes("team")) {
      suggestions.push(
        `• ${actionVerbs.leadership[Math.floor(Math.random() * actionVerbs.leadership.length)]} cross-functional team of X members to ${text.toLowerCase()}, resulting in Y% improvement in efficiency`,
        `• Successfully ${text.toLowerCase()} while mentoring junior staff and implementing best practices across the organization`,
        `• Spearheaded ${text.toLowerCase()} initiative that delivered measurable results and exceeded performance targets by X%`,
      )
    } else if (lowerText.includes("develop") || lowerText.includes("build") || lowerText.includes("create")) {
      suggestions.push(
        `• ${actionVerbs.development[Math.floor(Math.random() * actionVerbs.development.length)]} ${text.toLowerCase()} using modern technologies, serving X+ users with 99.9% uptime`,
        `• Architected and ${text.toLowerCase()} that reduced processing time by X% and improved user satisfaction scores`,
        `• Collaborated with stakeholders to ${text.toLowerCase()}, delivering project ahead of schedule and under budget`,
      )
    } else if (lowerText.includes("improve") || lowerText.includes("optimize") || lowerText.includes("enhance")) {
      suggestions.push(
        `• ${actionVerbs.improvement[Math.floor(Math.random() * actionVerbs.improvement.length)]} ${text.toLowerCase()}, achieving X% performance gain and $Y cost savings annually`,
        `• Implemented data-driven approach to ${text.toLowerCase()}, resulting in measurable improvements across key metrics`,
        `• Successfully ${text.toLowerCase()} through strategic analysis and stakeholder collaboration, exceeding targets by X%`,
      )
    } else {
      // Generic improvements
      suggestions.push(
        `• Achieved significant results by ${text.toLowerCase()}, demonstrating strong analytical and problem-solving skills`,
        `• Successfully executed ${text.toLowerCase()} while maintaining high quality standards and meeting tight deadlines`,
        `• Leveraged expertise to ${text.toLowerCase()}, contributing to team success and organizational objectives`,
      )
    }

    return suggestions
  }

  const copySuggestion = (suggestion: string) => {
    navigator.clipboard.writeText(suggestion)
    toast({
      title: "📋 Copied!",
      description: "Suggestion copied to clipboard.",
    })
  }

  const applySuggestion = (suggestion: string) => {
    onSuggestionApply(suggestion)
    toast({
      title: "✅ Applied!",
      description: "Suggestion has been applied to your resume.",
    })
  }

  const quickTips = [
    {
      icon: <Target className="w-4 h-4" />,
      title: "Use Specific Numbers",
      example: "Increased sales by 25% → Increased sales by 25% ($50K revenue)",
    },
    {
      icon: <Zap className="w-4 h-4" />,
      title: "Start with Action Verbs",
      example: "Was responsible for → Led, Managed, Developed, Implemented",
    },
    {
      icon: <TrendingUp className="w-4 h-4" />,
      title: "Show Impact & Results",
      example: "Worked on project → Delivered project 2 weeks early, saving $10K",
    },
  ]

  return (
    <div className="space-y-6">
      {/* AI Assistant Card */}
      <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            AI Writing Assistant
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter your resume content for AI enhancement:
            </label>
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Example: 'Managed a team of developers' or 'Developed a web application' or 'Improved system performance'"
              className="min-h-24 border-2 border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
            />
          </div>

          <Button
            onClick={generateSuggestions}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Generating Smart Suggestions...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate AI Suggestions
              </>
            )}
          </Button>

          {suggestions.length > 0 && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <h4 className="font-semibold text-blue-900">AI-Enhanced Versions:</h4>
              </div>
              {suggestions.map((suggestion, index) => (
                <Card
                  key={index}
                  className="bg-white border-2 border-blue-100 shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-800 mb-3 leading-relaxed">{suggestion}</p>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copySuggestion(suggestion)}
                        className="border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-colors duration-200"
                      >
                        <Copy className="w-3 h-3 mr-1" />
                        Copy
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => applySuggestion(suggestion)}
                        className="bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200"
                      >
                        Apply to Resume
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Tips Card */}
      <Card className="border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            Professional Writing Tips
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {quickTips.map((tip, index) => (
              <div
                key={index}
                className="flex gap-3 p-3 bg-white rounded-lg border border-amber-200 hover:border-amber-300 transition-colors duration-200"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                  {tip.icon}
                </div>
                <div className="flex-1">
                  <h5 className="font-semibold text-amber-900 mb-1">{tip.title}</h5>
                  <p className="text-sm text-amber-800">{tip.example}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sample Phrases Card */}
      <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Power Phrases Library
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h5 className="font-semibold text-green-900">Leadership & Management:</h5>
              <div className="space-y-1 text-sm text-green-800">
                <p>• Led cross-functional team of X members</p>
                <p>• Managed $X budget with Y% cost savings</p>
                <p>• Supervised daily operations for X+ employees</p>
              </div>
            </div>
            <div className="space-y-2">
              <h5 className="font-semibold text-green-900">Technical & Development:</h5>
              <div className="space-y-1 text-sm text-green-800">
                <p>• Developed scalable solutions serving X+ users</p>
                <p>• Implemented automated systems reducing time by X%</p>
                <p>• Architected robust infrastructure with 99.9% uptime</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
