export interface PersonalInfo {
  name: string
  email: string
  phone: string
  location: string
  website?: string
  linkedin?: string
  github?: string
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
  gpa?: string
  description?: string
}

export interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  current: boolean
  location: string
  description: string[]
}

export interface Project {
  id: string
  name: string
  description: string
  technologies: string[]
  url?: string
  github?: string
}

export interface Skill {
  category: string
  items: string[]
}

export interface Certification {
  id: string
  name: string
  issuer: string
  date: string
  url?: string
}

export interface Language {
  name: string
  proficiency: "Beginner" | "Intermediate" | "Advanced" | "Native"
}

export interface Award {
  id: string
  name: string
  issuer: string
  date: string
  description?: string
}

export interface ResumeData {
  personalInfo: PersonalInfo
  summary: string
  education: Education[]
  experience: Experience[]
  projects: Project[]
  skills: Skill[]
  certifications: Certification[]
  languages: Language[]
  awards: Award[]
}

export interface ResumeSettings {
  template:
    | "modern"
    | "classic"
    | "minimal"
    | "creative"
    | "executive"
    | "tech"
    | "academic"
    | "designer"
    | "consultant"
    | "startup"
  font: "inter" | "roboto" | "open-sans" | "merriweather" | "playfair" | "source-code"
  fontSize: "small" | "medium" | "large"
  color: "blue" | "green" | "purple" | "red" | "gray" | "teal" | "orange" | "pink"
  darkMode: boolean
  sectionOrder: string[]
}
