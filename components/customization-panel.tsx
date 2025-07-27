"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import type { ResumeSettings } from "@/lib/types"
import { Palette, Type, Sun, Moon } from "lucide-react"

interface CustomizationPanelProps {
  settings: ResumeSettings
  onSettingsChange: (settings: ResumeSettings) => void
}

export default function CustomizationPanel({ settings, onSettingsChange }: CustomizationPanelProps) {
  const colors = [
    { id: "blue", name: "Blue", class: "bg-blue-600" },
    { id: "green", name: "Green", class: "bg-green-600" },
    { id: "purple", name: "Purple", class: "bg-purple-600" },
    { id: "red", name: "Red", class: "bg-red-600" },
    { id: "gray", name: "Gray", class: "bg-gray-600" },
    { id: "teal", name: "Teal", class: "bg-teal-600" },
    { id: "orange", name: "Orange", class: "bg-orange-600" },
    { id: "pink", name: "Pink", class: "bg-pink-600" },
  ]

  const fonts = [
    { id: "inter", name: "Inter (Modern)" },
    { id: "roboto", name: "Roboto (Clean)" },
    { id: "open-sans", name: "Open Sans (Friendly)" },
    { id: "merriweather", name: "Merriweather (Elegant)" },
    { id: "playfair", name: "Playfair (Creative)" },
    { id: "source-code", name: "Source Code (Tech)" },
  ]

  const fontSizes = [
    { id: "small", name: "Small (Compact)" },
    { id: "medium", name: "Medium (Standard)" },
    { id: "large", name: "Large (Readable)" },
  ]

  return (
    <div className="space-y-6">
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 dark:text-gray-100">
            <Palette className="w-5 h-5" />
            Color Theme
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-2">
            {colors.map((color) => (
              <Button
                key={color.id}
                variant={settings.color === color.id ? "default" : "outline"}
                size="sm"
                className={`h-12 ${color.class} ${
                  settings.color === color.id ? "ring-2 ring-offset-2 ring-gray-400 dark:ring-gray-300" : ""
                } hover:scale-105 transition-transform duration-200`}
                onClick={() => onSettingsChange({ ...settings, color: color.id as any })}
              >
                <span className="sr-only">{color.name}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 dark:text-gray-100">
            <Type className="w-5 h-5" />
            Typography
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="font-select" className="dark:text-gray-200">
              Font Family
            </Label>
            <Select
              value={settings.font}
              onValueChange={(value) => onSettingsChange({ ...settings, font: value as any })}
            >
              <SelectTrigger id="font-select" className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                {fonts.map((font) => (
                  <SelectItem key={font.id} value={font.id} className="dark:text-gray-200 dark:focus:bg-gray-600">
                    {font.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="size-select" className="dark:text-gray-200">
              Font Size
            </Label>
            <Select
              value={settings.fontSize}
              onValueChange={(value) => onSettingsChange({ ...settings, fontSize: value as any })}
            >
              <SelectTrigger id="size-select" className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                {fontSizes.map((size) => (
                  <SelectItem key={size.id} value={size.id} className="dark:text-gray-200 dark:focus:bg-gray-600">
                    {size.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="dark:text-gray-100">Display Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {settings.darkMode ? <Moon className="w-4 h-4 dark:text-gray-300" /> : <Sun className="w-4 h-4" />}
              <Label htmlFor="dark-mode" className="dark:text-gray-200">
                Dark Mode
              </Label>
            </div>
            <Switch
              id="dark-mode"
              checked={settings.darkMode}
              onCheckedChange={(checked) => onSettingsChange({ ...settings, darkMode: checked })}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
