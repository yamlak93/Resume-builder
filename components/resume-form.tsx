"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2 } from "lucide-react"
import type { ResumeData, Education, Experience, Project, Skill, Certification, Language, Award } from "@/lib/types"
import { generateId } from "@/lib/resume-data"

interface ResumeFormProps {
  data: ResumeData
  onChange: (data: ResumeData) => void
}

export default function ResumeForm({ data, onChange }: ResumeFormProps) {
  const [newSkill, setNewSkill] = useState("")
  const [newTechnology, setNewTechnology] = useState("")

  const updatePersonalInfo = (field: string, value: string) => {
    onChange({
      ...data,
      personalInfo: { ...data.personalInfo, [field]: value },
    })
  }

  const updateSummary = (summary: string) => {
    onChange({ ...data, summary })
  }

  const addEducation = () => {
    const newEducation: Education = {
      id: generateId(),
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      gpa: "",
      description: "",
    }
    onChange({ ...data, education: [...data.education, newEducation] })
  }

  const updateEducation = (id: string, field: string, value: string) => {
    onChange({
      ...data,
      education: data.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    })
  }

  const removeEducation = (id: string) => {
    onChange({
      ...data,
      education: data.education.filter((edu) => edu.id !== id),
    })
  }

  const addExperience = () => {
    const newExperience: Experience = {
      id: generateId(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      location: "",
      description: [""],
    }
    onChange({ ...data, experience: [...data.experience, newExperience] })
  }

  const updateExperience = (id: string, field: string, value: any) => {
    onChange({
      ...data,
      experience: data.experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    })
  }

  const addExperienceDescription = (id: string) => {
    onChange({
      ...data,
      experience: data.experience.map((exp) =>
        exp.id === id ? { ...exp, description: [...exp.description, ""] } : exp,
      ),
    })
  }

  const updateExperienceDescription = (id: string, index: number, value: string) => {
    onChange({
      ...data,
      experience: data.experience.map((exp) =>
        exp.id === id
          ? {
              ...exp,
              description: exp.description.map((desc, i) => (i === index ? value : desc)),
            }
          : exp,
      ),
    })
  }

  const removeExperienceDescription = (id: string, index: number) => {
    onChange({
      ...data,
      experience: data.experience.map((exp) =>
        exp.id === id
          ? {
              ...exp,
              description: exp.description.filter((_, i) => i !== index),
            }
          : exp,
      ),
    })
  }

  const removeExperience = (id: string) => {
    onChange({
      ...data,
      experience: data.experience.filter((exp) => exp.id !== id),
    })
  }

  const addProject = () => {
    const newProject: Project = {
      id: generateId(),
      name: "",
      description: "",
      technologies: [],
      url: "",
      github: "",
    }
    onChange({ ...data, projects: [...data.projects, newProject] })
  }

  const updateProject = (id: string, field: string, value: any) => {
    onChange({
      ...data,
      projects: data.projects.map((project) => (project.id === id ? { ...project, [field]: value } : project)),
    })
  }

  const addProjectTechnology = (id: string, technology: string) => {
    if (!technology.trim()) return
    onChange({
      ...data,
      projects: data.projects.map((project) =>
        project.id === id
          ? {
              ...project,
              technologies: [...project.technologies, technology.trim()],
            }
          : project,
      ),
    })
  }

  const removeProjectTechnology = (id: string, technology: string) => {
    onChange({
      ...data,
      projects: data.projects.map((project) =>
        project.id === id
          ? {
              ...project,
              technologies: project.technologies.filter((tech) => tech !== technology),
            }
          : project,
      ),
    })
  }

  const removeProject = (id: string) => {
    onChange({
      ...data,
      projects: data.projects.filter((project) => project.id !== id),
    })
  }

  const addSkillCategory = () => {
    const newSkillCategory: Skill = {
      category: "New Category",
      items: [],
    }
    onChange({ ...data, skills: [...data.skills, newSkillCategory] })
  }

  const updateSkillCategory = (index: number, category: string) => {
    onChange({
      ...data,
      skills: data.skills.map((skill, i) => (i === index ? { ...skill, category } : skill)),
    })
  }

  const addSkillItem = (index: number, item: string) => {
    if (!item.trim()) return
    onChange({
      ...data,
      skills: data.skills.map((skill, i) => (i === index ? { ...skill, items: [...skill.items, item.trim()] } : skill)),
    })
  }

  const removeSkillItem = (categoryIndex: number, item: string) => {
    onChange({
      ...data,
      skills: data.skills.map((skill, i) =>
        i === categoryIndex
          ? {
              ...skill,
              items: skill.items.filter((skillItem) => skillItem !== item),
            }
          : skill,
      ),
    })
  }

  const removeSkillCategory = (index: number) => {
    onChange({
      ...data,
      skills: data.skills.filter((_, i) => i !== index),
    })
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-1 h-auto p-1 bg-gray-100 rounded-lg">
          <TabsTrigger value="personal" className="text-xs sm:text-sm px-1 sm:px-3 py-2 whitespace-nowrap">
            Personal
          </TabsTrigger>
          <TabsTrigger value="summary" className="text-xs sm:text-sm px-1 sm:px-3 py-2 whitespace-nowrap">
            Summary
          </TabsTrigger>
          <TabsTrigger value="experience" className="text-xs sm:text-sm px-1 sm:px-3 py-2 whitespace-nowrap">
            Work
          </TabsTrigger>
          <TabsTrigger value="education" className="text-xs sm:text-sm px-1 sm:px-3 py-2 whitespace-nowrap">
            Education
          </TabsTrigger>
          <TabsTrigger value="projects" className="text-xs sm:text-sm px-1 sm:px-3 py-2 whitespace-nowrap">
            Projects
          </TabsTrigger>
          <TabsTrigger value="skills" className="text-xs sm:text-sm px-1 sm:px-3 py-2 whitespace-nowrap">
            Skills
          </TabsTrigger>
          <TabsTrigger value="certifications" className="text-xs sm:text-sm px-1 sm:px-3 py-2 whitespace-nowrap">
            Certs
          </TabsTrigger>
          <TabsTrigger value="other" className="text-xs sm:text-sm px-1 sm:px-3 py-2 whitespace-nowrap">
            Other
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={data.personalInfo.name}
                    onChange={(e) => updatePersonalInfo("name", e.target.value)}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={data.personalInfo.email}
                    onChange={(e) => updatePersonalInfo("email", e.target.value)}
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={data.personalInfo.phone}
                    onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={data.personalInfo.location}
                    onChange={(e) => updatePersonalInfo("location", e.target.value)}
                    placeholder="Addis Ababa"
                  />
                </div>
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={data.personalInfo.website}
                    onChange={(e) => updatePersonalInfo("website", e.target.value)}
                    placeholder="https://johndoe.com"
                  />
                </div>
                <div>
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    value={data.personalInfo.linkedin}
                    onChange={(e) => updatePersonalInfo("linkedin", e.target.value)}
                    placeholder="https://linkedin.com/in/johndoe"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="github">GitHub</Label>
                  <Input
                    id="github"
                    value={data.personalInfo.github}
                    onChange={(e) => updatePersonalInfo("github", e.target.value)}
                    placeholder="https://github.com/johndoe"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="summary" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Professional Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={data.summary}
                onChange={(e) => updateSummary(e.target.value)}
                placeholder="Write a compelling summary of your professional background, key skills, and career objectives..."
                className="min-h-32"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="experience" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Work Experience</h3>
            <Button onClick={addExperience} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Experience
            </Button>
          </div>

          {data.experience.map((exp) => (
            <Card key={exp.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base">Experience Entry</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => removeExperience(exp.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Position *</Label>
                    <Input
                      value={exp.position}
                      onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                      placeholder="Software Engineer"
                    />
                  </div>
                  <div>
                    <Label>Company *</Label>
                    <Input
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                      placeholder="Tech Corp"
                    />
                  </div>
                  <div>
                    <Label>Start Date</Label>
                    <Input
                      type="month"
                      value={exp.startDate}
                      onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>End Date</Label>
                    <Input
                      type="month"
                      value={exp.endDate}
                      onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                      disabled={exp.current}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`current-${exp.id}`}
                      checked={exp.current}
                      onCheckedChange={(checked) => updateExperience(exp.id, "current", checked)}
                    />
                    <Label htmlFor={`current-${exp.id}`}>Currently working here</Label>
                  </div>
                  <div>
                    <Label>Location</Label>
                    <Input
                      value={exp.location}
                      onChange={(e) => updateExperience(exp.id, "location", e.target.value)}
                      placeholder="San Francisco, CA"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label>Job Description</Label>
                    <Button variant="outline" size="sm" onClick={() => addExperienceDescription(exp.id)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Bullet
                    </Button>
                  </div>
                  {exp.description.map((desc, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <Textarea
                        value={desc}
                        onChange={(e) => updateExperienceDescription(exp.id, index, e.target.value)}
                        placeholder="Describe your achievements and responsibilities..."
                        className="min-h-20"
                      />
                      <Button variant="ghost" size="sm" onClick={() => removeExperienceDescription(exp.id, index)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="education" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Education</h3>
            <Button onClick={addEducation} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Education
            </Button>
          </div>

          {data.education.map((edu) => (
            <Card key={edu.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base">Education Entry</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => removeEducation(edu.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Institution *</Label>
                    <Input
                      value={edu.institution}
                      onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                      placeholder="University of Technology"
                    />
                  </div>
                  <div>
                    <Label>Degree *</Label>
                    <Input
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                      placeholder="Bachelor of Science"
                    />
                  </div>
                  <div>
                    <Label>Field of Study</Label>
                    <Input
                      value={edu.field}
                      onChange={(e) => updateEducation(edu.id, "field", e.target.value)}
                      placeholder="Computer Science"
                    />
                  </div>
                  <div>
                    <Label>GPA</Label>
                    <Input
                      value={edu.gpa}
                      onChange={(e) => updateEducation(edu.id, "gpa", e.target.value)}
                      placeholder="3.8/4.0"
                    />
                  </div>
                  <div>
                    <Label>Start Date</Label>
                    <Input
                      type="month"
                      value={edu.startDate}
                      onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>End Date</Label>
                    <Input
                      type="month"
                      value={edu.endDate}
                      onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={edu.description}
                    onChange={(e) => updateEducation(edu.id, "description", e.target.value)}
                    placeholder="Relevant coursework, achievements, activities..."
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Projects</h3>
            <Button onClick={addProject} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          </div>

          {data.projects.map((project) => (
            <Card key={project.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base">Project Entry</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => removeProject(project.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Project Name *</Label>
                    <Input
                      value={project.name}
                      onChange={(e) => updateProject(project.id, "name", e.target.value)}
                      placeholder="E-commerce Platform"
                    />
                  </div>
                  <div>
                    <Label>Live URL</Label>
                    <Input
                      value={project.url}
                      onChange={(e) => updateProject(project.id, "url", e.target.value)}
                      placeholder="https://myproject.com"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label>GitHub URL</Label>
                    <Input
                      value={project.github}
                      onChange={(e) => updateProject(project.id, "github", e.target.value)}
                      placeholder="https://github.com/username/project"
                    />
                  </div>
                </div>

                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={project.description}
                    onChange={(e) => updateProject(project.id, "description", e.target.value)}
                    placeholder="Describe your project, its features, and your role..."
                    className="min-h-24"
                  />
                </div>

                <div>
                  <Label>Technologies</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={newTechnology}
                      onChange={(e) => setNewTechnology(e.target.value)}
                      placeholder="Add technology (e.g., React, Node.js)"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          addProjectTechnology(project.id, newTechnology)
                          setNewTechnology("")
                        }
                      }}
                    />
                    <Button
                      type="button"
                      onClick={() => {
                        addProjectTechnology(project.id, newTechnology)
                        setNewTechnology("")
                      }}
                    >
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="cursor-pointer">
                        {tech}
                        <button
                          onClick={() => removeProjectTechnology(project.id, tech)}
                          className="ml-2 hover:text-red-500"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="skills" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Skills</h3>
            <Button onClick={addSkillCategory} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </Button>
          </div>

          {data.skills.map((skillGroup, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Input
                  value={skillGroup.category}
                  onChange={(e) => updateSkillCategory(index, e.target.value)}
                  className="text-base font-semibold border-none p-0 h-auto"
                />
                <Button variant="ghost" size="sm" onClick={() => removeSkillCategory(index)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add skill"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addSkillItem(index, newSkill)
                        setNewSkill("")
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      addSkillItem(index, newSkill)
                      setNewSkill("")
                    }}
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill) => (
                    <Badge key={skill} variant="secondary" className="cursor-pointer">
                      {skill}
                      <button onClick={() => removeSkillItem(index, skill)} className="ml-2 hover:text-red-500">
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="certifications" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Certifications</h3>
            <Button
              onClick={() => {
                const newCert: Certification = {
                  id: generateId(),
                  name: "",
                  issuer: "",
                  date: "",
                  url: "",
                }
                onChange({ ...data, certifications: [...data.certifications, newCert] })
              }}
              size="sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Certification
            </Button>
          </div>

          {data.certifications.map((cert) => (
            <Card key={cert.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base">Certification</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    onChange({
                      ...data,
                      certifications: data.certifications.filter((c) => c.id !== cert.id),
                    })
                  }
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Certification Name</Label>
                    <Input
                      value={cert.name}
                      onChange={(e) =>
                        onChange({
                          ...data,
                          certifications: data.certifications.map((c) =>
                            c.id === cert.id ? { ...c, name: e.target.value } : c,
                          ),
                        })
                      }
                      placeholder="AWS Solutions Architect"
                    />
                  </div>
                  <div>
                    <Label>Issuing Organization</Label>
                    <Input
                      value={cert.issuer}
                      onChange={(e) =>
                        onChange({
                          ...data,
                          certifications: data.certifications.map((c) =>
                            c.id === cert.id ? { ...c, issuer: e.target.value } : c,
                          ),
                        })
                      }
                      placeholder="Amazon Web Services"
                    />
                  </div>
                  <div>
                    <Label>Date Obtained</Label>
                    <Input
                      type="month"
                      value={cert.date}
                      onChange={(e) =>
                        onChange({
                          ...data,
                          certifications: data.certifications.map((c) =>
                            c.id === cert.id ? { ...c, date: e.target.value } : c,
                          ),
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>Credential URL</Label>
                    <Input
                      value={cert.url}
                      onChange={(e) =>
                        onChange({
                          ...data,
                          certifications: data.certifications.map((c) =>
                            c.id === cert.id ? { ...c, url: e.target.value } : c,
                          ),
                        })
                      }
                      placeholder="https://credential-url.com"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="other" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Languages</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={() => {
                  const newLanguage: Language = {
                    name: "",
                    proficiency: "Intermediate",
                  }
                  onChange({ ...data, languages: [...data.languages, newLanguage] })
                }}
                size="sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Language
              </Button>

              {data.languages.map((lang, index) => (
                <div key={index} className="flex gap-4 items-center">
                  <Input
                    value={lang.name}
                    onChange={(e) =>
                      onChange({
                        ...data,
                        languages: data.languages.map((l, i) => (i === index ? { ...l, name: e.target.value } : l)),
                      })
                    }
                    placeholder="Spanish"
                    className="flex-1"
                  />
                  <Select
                    value={lang.proficiency}
                    onValueChange={(value: any) =>
                      onChange({
                        ...data,
                        languages: data.languages.map((l, i) => (i === index ? { ...l, proficiency: value } : l)),
                      })
                    }
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                      <SelectItem value="Native">Native</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      onChange({
                        ...data,
                        languages: data.languages.filter((_, i) => i !== index),
                      })
                    }
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Awards & Achievements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={() => {
                  const newAward: Award = {
                    id: generateId(),
                    name: "",
                    issuer: "",
                    date: "",
                    description: "",
                  }
                  onChange({ ...data, awards: [...data.awards, newAward] })
                }}
                size="sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Award
              </Button>

              {data.awards.map((award) => (
                <Card key={award.id}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-base">Award</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        onChange({
                          ...data,
                          awards: data.awards.filter((a) => a.id !== award.id),
                        })
                      }
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Award Name</Label>
                        <Input
                          value={award.name}
                          onChange={(e) =>
                            onChange({
                              ...data,
                              awards: data.awards.map((a) => (a.id === award.id ? { ...a, name: e.target.value } : a)),
                            })
                          }
                          placeholder="Employee of the Year"
                        />
                      </div>
                      <div>
                        <Label>Issuing Organization</Label>
                        <Input
                          value={award.issuer}
                          onChange={(e) =>
                            onChange({
                              ...data,
                              awards: data.awards.map((a) =>
                                a.id === award.id ? { ...a, issuer: e.target.value } : a,
                              ),
                            })
                          }
                          placeholder="Tech Corp"
                        />
                      </div>
                      <div>
                        <Label>Date Received</Label>
                        <Input
                          type="month"
                          value={award.date}
                          onChange={(e) =>
                            onChange({
                              ...data,
                              awards: data.awards.map((a) => (a.id === award.id ? { ...a, date: e.target.value } : a)),
                            })
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea
                        value={award.description}
                        onChange={(e) =>
                          onChange({
                            ...data,
                            awards: data.awards.map((a) =>
                              a.id === award.id ? { ...a, description: e.target.value } : a,
                            ),
                          })
                        }
                        placeholder="Brief description of the achievement..."
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
