"use client"
import { Card, CardContent } from "@/components/ui/card"
import type { ResumeSettings } from "@/lib/types"

interface TemplateSelectorProps {
  settings: ResumeSettings
  onSettingsChange: (settings: ResumeSettings) => void
}

export default function TemplateSelector({ settings, onSettingsChange }: TemplateSelectorProps) {
  const templates = [
    {
      id: "modern",
      name: "Modern",
      description: "Clean and professional with color accents",
      category: "Professional",
    },
    {
      id: "classic",
      name: "Classic",
      description: "Traditional format with centered layout",
      category: "Traditional",
    },
    {
      id: "minimal",
      name: "Minimal",
      description: "Simple and elegant with lots of whitespace",
      category: "Clean",
    },
    {
      id: "creative",
      name: "Creative",
      description: "Two-column layout with sidebar",
      category: "Design",
    },
    {
      id: "executive",
      name: "Executive",
      description: "Premium design for senior positions",
      category: "Leadership",
    },
    {
      id: "tech",
      name: "Tech",
      description: "Developer-focused with code-friendly styling",
      category: "Technology",
    },
    {
      id: "academic",
      name: "Academic",
      description: "Research-oriented with publication focus",
      category: "Education",
    },
    {
      id: "designer",
      name: "Designer",
      description: "Visual-first layout for creative professionals",
      category: "Creative",
    },
    {
      id: "consultant",
      name: "Consultant",
      description: "Business-focused with metrics emphasis",
      category: "Business",
    },
    {
      id: "startup",
      name: "Startup",
      description: "Dynamic layout for entrepreneurial roles",
      category: "Innovation",
    },
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Resume Templates</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((template) => (
          <Card
            key={template.id}
            className={`cursor-pointer transition-all duration-200 ${
              settings.template === template.id
                ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:ring-blue-400"
                : "hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600"
            }`}
            onClick={() => onSettingsChange({ ...settings, template: template.id as any })}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">{template.name}</h4>
                <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">
                  {template.category}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{template.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
