import type { ResumeData, ResumeSettings } from "./types"

export const defaultResumeData: ResumeData = {
  personalInfo: {
    name: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    github: "",
  },
  summary: "",
  education: [],
  experience: [],
  projects: [],
  skills: [],
  certifications: [],
  languages: [],
  awards: [],
}

export const defaultSettings: ResumeSettings = {
  template: "modern",
  font: "inter",
  fontSize: "medium",
  color: "blue",
  darkMode: false,
  sectionOrder: ["summary", "experience", "education", "projects", "skills", "certifications", "languages", "awards"],
}

export const generateId = () => Math.random().toString(36).substr(2, 9)
