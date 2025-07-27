"use client"

import type { ResumeData, ResumeSettings } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, Globe, Linkedin, Github, ExternalLink } from "lucide-react"

interface ResumePreviewProps {
  data: ResumeData
  settings: ResumeSettings
}

export default function ResumePreview({ data, settings }: ResumePreviewProps) {
  const { personalInfo, summary, education, experience, projects, skills, certifications, languages, awards } = data

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString + "-01")
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short" })
  }

  const getColorClasses = () => {
    const colors = {
      blue: settings.darkMode ? "text-blue-400 border-blue-400" : "text-blue-600 border-blue-600",
      green: settings.darkMode ? "text-green-400 border-green-400" : "text-green-600 border-green-600",
      purple: settings.darkMode ? "text-purple-400 border-purple-400" : "text-purple-600 border-purple-600",
      red: settings.darkMode ? "text-red-400 border-red-400" : "text-red-600 border-red-600",
      gray: settings.darkMode ? "text-gray-400 border-gray-400" : "text-gray-600 border-gray-600",
      teal: settings.darkMode ? "text-teal-400 border-teal-400" : "text-teal-600 border-teal-600",
      orange: settings.darkMode ? "text-orange-400 border-orange-400" : "text-orange-600 border-orange-600",
      pink: settings.darkMode ? "text-pink-400 border-pink-400" : "text-pink-600 border-pink-600",
    }
    return colors[settings.color] || colors.blue
  }

  const getFontClass = () => {
    const fonts = {
      inter: "font-sans",
      roboto: "font-sans",
      "open-sans": "font-sans",
      merriweather: "font-serif",
      playfair: "font-serif",
      "source-code": "font-mono",
    }
    return fonts[settings.font] || fonts.inter
  }

  const getSizeClass = () => {
    const sizes = {
      small: "text-sm",
      medium: "text-base",
      large: "text-lg",
    }
    return sizes[settings.fontSize] || sizes.medium
  }

  const colorClasses = getColorClasses()
  const fontClass = getFontClass()
  const sizeClass = getSizeClass()
  const darkModeClasses = settings.darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"

  // Modern Template
  const renderModernTemplate = () => (
    <div className={`max-w-4xl mx-auto ${darkModeClasses} p-8 shadow-lg ${fontClass} ${sizeClass}`}>
      <header className="mb-8">
        <h1 className={`text-4xl font-bold mb-2 ${colorClasses.split(" ")[0]}`}>{personalInfo.name || "Your Name"}</h1>
        <div className={`flex flex-wrap gap-4 ${settings.darkMode ? "text-gray-300" : "text-gray-600"}`}>
          {personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center gap-1">
              <Globe className="w-4 h-4" />
              <a href={personalInfo.website} className="hover:underline">
                Website
              </a>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="w-4 h-4" />
              <a href={personalInfo.linkedin} className="hover:underline">
                LinkedIn
              </a>
            </div>
          )}
          {personalInfo.github && (
            <div className="flex items-center gap-1">
              <Github className="w-4 h-4" />
              <a href={personalInfo.github} className="hover:underline">
                GitHub
              </a>
            </div>
          )}
        </div>
      </header>

      {summary && (
        <section className="mb-8">
          <h2 className={`text-2xl font-bold mb-4 pb-2 border-b-2 ${colorClasses}`}>Professional Summary</h2>
          <p className={`${settings.darkMode ? "text-gray-300" : "text-gray-700"} leading-relaxed`}>{summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section className="mb-8">
          <h2 className={`text-2xl font-bold mb-4 pb-2 border-b-2 ${colorClasses}`}>Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-xl font-semibold">{exp.position}</h3>
                  <p className={`text-lg ${colorClasses.split(" ")[0]}`}>{exp.company}</p>
                </div>
                <div className={`text-right ${settings.darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  <p>
                    {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                  </p>
                  <p>{exp.location}</p>
                </div>
              </div>
              <ul
                className={`list-disc list-inside space-y-1 ${settings.darkMode ? "text-gray-300" : "text-gray-700"}`}
              >
                {exp.description.map((desc, index) => (
                  <li key={index}>{desc}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section className="mb-8">
          <h2 className={`text-2xl font-bold mb-4 pb-2 border-b-2 ${colorClasses}`}>Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">
                    {edu.degree} in {edu.field}
                  </h3>
                  <p className={`${colorClasses.split(" ")[0]}`}>{edu.institution}</p>
                  {edu.gpa && (
                    <p className={`${settings.darkMode ? "text-gray-400" : "text-gray-600"}`}>GPA: {edu.gpa}</p>
                  )}
                </div>
                <p className={`${settings.darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </p>
              </div>
              {edu.description && (
                <p className={`${settings.darkMode ? "text-gray-300" : "text-gray-700"} mt-2`}>{edu.description}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {projects.length > 0 && (
        <section className="mb-8">
          <h2 className={`text-2xl font-bold mb-4 pb-2 border-b-2 ${colorClasses}`}>Projects</h2>
          {projects.map((project) => (
            <div key={project.id} className="mb-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">{project.name}</h3>
                <div className="flex gap-2">
                  {project.url && (
                    <a
                      href={project.url}
                      className={`${colorClasses.split(" ")[0]} hover:underline flex items-center gap-1`}
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      className={`${colorClasses.split(" ")[0]} hover:underline flex items-center gap-1`}
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </a>
                  )}
                </div>
              </div>
              <p className={`${settings.darkMode ? "text-gray-300" : "text-gray-700"} mb-2`}>{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section className="mb-8">
          <h2 className={`text-2xl font-bold mb-4 pb-2 border-b-2 ${colorClasses}`}>Skills</h2>
          {skills.map((skillGroup, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-semibold mb-2">{skillGroup.category}</h3>
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((skill) => (
                  <Badge key={skill} variant="outline" className="text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}

      {certifications.length > 0 && (
        <section className="mb-8">
          <h2 className={`text-2xl font-bold mb-4 pb-2 border-b-2 ${colorClasses}`}>Certifications</h2>
          {certifications.map((cert) => (
            <div key={cert.id} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{cert.name}</h3>
                  <p className={`${colorClasses.split(" ")[0]}`}>{cert.issuer}</p>
                </div>
                <p className={`${settings.darkMode ? "text-gray-400" : "text-gray-600"}`}>{formatDate(cert.date)}</p>
              </div>
            </div>
          ))}
        </section>
      )}

      {languages.length > 0 && (
        <section className="mb-8">
          <h2 className={`text-2xl font-bold mb-4 pb-2 border-b-2 ${colorClasses}`}>Languages</h2>
          <div className="grid grid-cols-2 gap-4">
            {languages.map((lang, index) => (
              <div key={index} className="flex justify-between">
                <span className="font-medium">{lang.name}</span>
                <span className={`${settings.darkMode ? "text-gray-400" : "text-gray-600"}`}>{lang.proficiency}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {awards.length > 0 && (
        <section className="mb-8">
          <h2 className={`text-2xl font-bold mb-4 pb-2 border-b-2 ${colorClasses}`}>Awards & Achievements</h2>
          {awards.map((award) => (
            <div key={award.id} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{award.name}</h3>
                  <p className={`${colorClasses.split(" ")[0]}`}>{award.issuer}</p>
                  {award.description && (
                    <p className={`${settings.darkMode ? "text-gray-300" : "text-gray-700"} mt-1`}>
                      {award.description}
                    </p>
                  )}
                </div>
                <p className={`${settings.darkMode ? "text-gray-400" : "text-gray-600"}`}>{formatDate(award.date)}</p>
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  )

  // Executive Template
  const renderExecutiveTemplate = () => (
    <div className={`max-w-4xl mx-auto ${darkModeClasses} p-8 shadow-lg ${fontClass} ${sizeClass}`}>
      <header
        className={`text-center mb-10 pb-8 border-b-4 ${settings.darkMode ? "border-gray-600" : "border-gray-300"}`}
      >
        <h1 className="text-5xl font-bold mb-4 tracking-wide">{personalInfo.name || "Your Name"}</h1>
        <div className={`text-lg ${settings.darkMode ? "text-gray-300" : "text-gray-600"} mb-4`}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span className="mx-4">|</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span className="mx-4">|</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
      </header>

      {summary && (
        <section className="mb-10">
          <h2 className={`text-2xl font-bold mb-6 text-center uppercase tracking-widest ${colorClasses.split(" ")[0]}`}>
            Executive Summary
          </h2>
          <p className={`text-lg leading-relaxed text-center ${settings.darkMode ? "text-gray-300" : "text-gray-700"}`}>
            {summary}
          </p>
        </section>
      )}

      {experience.length > 0 && (
        <section className="mb-10">
          <h2 className={`text-2xl font-bold mb-6 text-center uppercase tracking-widest ${colorClasses.split(" ")[0]}`}>
            Leadership Experience
          </h2>
          {experience.map((exp) => (
            <div
              key={exp.id}
              className={`mb-8 border-l-4 ${settings.darkMode ? "border-gray-600" : "border-gray-300"} pl-6`}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-2xl font-bold">{exp.position}</h3>
                  <p className={`text-xl ${colorClasses.split(" ")[0]} font-semibold`}>{exp.company}</p>
                </div>
                <div className={`text-right ${settings.darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  <p className="font-semibold">
                    {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                  </p>
                  <p>{exp.location}</p>
                </div>
              </div>
              <ul
                className={`list-disc list-inside space-y-2 ${settings.darkMode ? "text-gray-300" : "text-gray-700"}`}
              >
                {exp.description.map((desc, index) => (
                  <li key={index} className="leading-relaxed">
                    {desc}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}
    </div>
  )

  // Tech Template
  const renderTechTemplate = () => (
    <div className={`max-w-4xl mx-auto ${darkModeClasses} p-8 shadow-lg font-mono ${sizeClass}`}>
      <header
        className={`mb-8 border-2 border-dashed ${settings.darkMode ? "border-gray-600" : "border-gray-400"} p-6`}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className={`${colorClasses.split(" ")[0]}`}>$</span>
          <h1 className="text-3xl font-bold">{personalInfo.name || "developer"}</h1>
        </div>
        <div className={`${settings.darkMode ? "text-gray-400" : "text-gray-600"} font-mono text-sm`}>
          <p>// Contact Information</p>
          {personalInfo.email && <p>email: "{personalInfo.email}"</p>}
          {personalInfo.phone && <p>phone: "{personalInfo.phone}"</p>}
          {personalInfo.location && <p>location: "{personalInfo.location}"</p>}
          {personalInfo.github && <p>github: "{personalInfo.github}"</p>}
        </div>
      </header>

      {summary && (
        <section className="mb-8">
          <h2 className={`text-xl font-bold mb-4 ${colorClasses.split(" ")[0]}`}>/* About */</h2>
          <div
            className={`${settings.darkMode ? "bg-gray-800" : "bg-gray-100"} p-4 rounded border-l-4 ${settings.darkMode ? "border-gray-600" : "border-gray-400"}`}
          >
            <p className={`${settings.darkMode ? "text-gray-300" : "text-gray-700"} font-mono text-sm leading-relaxed`}>
              {summary}
            </p>
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section className="mb-8">
          <h2 className={`text-xl font-bold mb-4 ${colorClasses.split(" ")[0]}`}>/* Technical Skills */</h2>
          {skills.map((skillGroup, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-bold mb-2">{skillGroup.category.toLowerCase()}: [</h3>
              <div className="ml-4 flex flex-wrap gap-2">
                {skillGroup.items.map((skill, skillIndex) => (
                  <span
                    key={skill}
                    className={`${settings.darkMode ? "text-gray-400" : "text-gray-600"} font-mono text-sm`}
                  >
                    "{skill}"{skillIndex < skillGroup.items.length - 1 ? "," : ""}
                  </span>
                ))}
              </div>
              <p>]</p>
            </div>
          ))}
        </section>
      )}

      {experience.length > 0 && (
        <section className="mb-8">
          <h2 className={`text-xl font-bold mb-4 ${colorClasses.split(" ")[0]}`}>/* Work Experience */</h2>
          {experience.map((exp) => (
            <div key={exp.id} className={`mb-6 ${settings.darkMode ? "bg-gray-800" : "bg-gray-50"} p-4 rounded`}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold">
                    function {exp.position.replace(/\s+/g, "")}() {"{"}
                  </h3>
                  <p className={`${colorClasses.split(" ")[0]} ml-2`}>// {exp.company}</p>
                </div>
                <span className={`${settings.darkMode ? "text-gray-400" : "text-gray-600"} text-sm`}>
                  {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                </span>
              </div>
              <ul className={`ml-4 space-y-1 ${settings.darkMode ? "text-gray-300" : "text-gray-700"} text-sm`}>
                {exp.description.map((desc, descIndex) => (
                  <li key={descIndex}>// {desc}</li>
                ))}
              </ul>
              <p className="mt-2">{"}"}</p>
            </div>
          ))}
        </section>
      )}
    </div>
  )

  // Academic Template
  const renderAcademicTemplate = () => (
    <div className={`max-w-4xl mx-auto ${darkModeClasses} p-8 shadow-lg ${fontClass} ${sizeClass}`}>
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">{personalInfo.name || "Your Name"}</h1>
        <div className={`${settings.darkMode ? "text-gray-400" : "text-gray-600"} mb-4`}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span className="mx-2">•</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span className="mx-2">•</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
      </header>

      {summary && (
        <section className="mb-8">
          <h2 className={`text-xl font-bold mb-4 uppercase tracking-wide ${colorClasses.split(" ")[0]}`}>
            Research Interests
          </h2>
          <p className={`${settings.darkMode ? "text-gray-300" : "text-gray-700"} leading-relaxed text-justify`}>
            {summary}
          </p>
        </section>
      )}

      {education.length > 0 && (
        <section className="mb-8">
          <h2 className={`text-xl font-bold mb-4 uppercase tracking-wide ${colorClasses.split(" ")[0]}`}>Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">
                    {edu.degree} in {edu.field}
                  </h3>
                  <p className={`${colorClasses.split(" ")[0]} font-semibold`}>{edu.institution}</p>
                  {edu.gpa && (
                    <p className={`${settings.darkMode ? "text-gray-400" : "text-gray-600"} text-sm`}>GPA: {edu.gpa}</p>
                  )}
                </div>
                <p className={`${settings.darkMode ? "text-gray-400" : "text-gray-600"} font-semibold`}>
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </p>
              </div>
              {edu.description && (
                <p className={`${settings.darkMode ? "text-gray-300" : "text-gray-700"} mt-2 text-sm`}>
                  {edu.description}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {experience.length > 0 && (
        <section className="mb-8">
          <h2 className={`text-xl font-bold mb-4 uppercase tracking-wide ${colorClasses.split(" ")[0]}`}>
            Academic Experience
          </h2>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-lg">{exp.position}</h3>
                  <p className={`${colorClasses.split(" ")[0]} font-semibold`}>{exp.company}</p>
                </div>
                <p className={`${settings.darkMode ? "text-gray-400" : "text-gray-600"} font-semibold`}>
                  {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                </p>
              </div>
              <ul
                className={`list-disc list-inside space-y-1 ${settings.darkMode ? "text-gray-300" : "text-gray-700"}`}
              >
                {exp.description.map((desc, index) => (
                  <li key={index}>{desc}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}
    </div>
  )

  // Designer Template
  const renderDesignerTemplate = () => (
    <div className={`max-w-4xl mx-auto ${darkModeClasses} ${fontClass} ${sizeClass}`}>
      <div className="grid grid-cols-3 gap-8">
        {/* Left Column */}
        <div
          className={`col-span-1 bg-gradient-to-b from-${settings.color}-600 to-${settings.color}-800 text-white p-8 min-h-screen`}
        >
          <div className="mb-8">
            <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4 mx-auto">
              <span className="text-4xl font-bold">{personalInfo.name?.charAt(0) || "Y"}</span>
            </div>
            <h1 className="text-2xl font-bold text-center mb-2">{personalInfo.name || "Your Name"}</h1>
            <p className="text-center text-sm opacity-90">Creative Professional</p>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-bold mb-3 text-lg">Contact</h3>
              <div className="space-y-2 text-sm">
                {personalInfo.email && <p>{personalInfo.email}</p>}
                {personalInfo.phone && <p>{personalInfo.phone}</p>}
                {personalInfo.location && <p>{personalInfo.location}</p>}
              </div>
            </div>

            {skills.length > 0 && (
              <div>
                <h3 className="font-bold mb-3 text-lg">Skills</h3>
                {skills.map((skillGroup, index) => (
                  <div key={index} className="mb-4">
                    <h4 className="font-semibold mb-2 text-sm">{skillGroup.category}</h4>
                    <div className="space-y-1">
                      {skillGroup.items.map((skill) => (
                        <div key={skill} className="text-xs bg-white bg-opacity-20 rounded px-2 py-1">
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-2 p-8">
          {summary && (
            <section className="mb-8">
              <h2 className={`text-3xl font-bold mb-4 ${colorClasses.split(" ")[0]}`}>About</h2>
              <p className={`${settings.darkMode ? "text-gray-300" : "text-gray-700"} leading-relaxed text-lg`}>
                {summary}
              </p>
            </section>
          )}

          {experience.length > 0 && (
            <section className="mb-8">
              <h2 className={`text-3xl font-bold mb-6 ${colorClasses.split(" ")[0]}`}>Experience</h2>
              {experience.map((exp) => (
                <div key={exp.id} className="mb-8 relative">
                  <div className={`absolute left-0 top-2 w-4 h-4 bg-${settings.color}-600 rounded-full`}></div>
                  <div className={`absolute left-2 top-6 w-0.5 h-full bg-${settings.color}-200`}></div>
                  <div className="ml-8">
                    <h3 className="text-xl font-bold">{exp.position}</h3>
                    <p className={`${colorClasses.split(" ")[0]} font-semibold text-lg`}>{exp.company}</p>
                    <p className={`${settings.darkMode ? "text-gray-400" : "text-gray-600"} text-sm mb-3`}>
                      {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                    </p>
                    <ul
                      className={`list-disc list-inside space-y-1 ${settings.darkMode ? "text-gray-300" : "text-gray-700"}`}
                    >
                      {exp.description.map((desc, index) => (
                        <li key={index}>{desc}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </section>
          )}

          {projects.length > 0 && (
            <section className="mb-8">
              <h2 className={`text-3xl font-bold mb-6 ${colorClasses.split(" ")[0]}`}>Portfolio</h2>
              <div className="grid grid-cols-1 gap-6">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className={`border-l-4 ${settings.darkMode ? "border-gray-600" : "border-gray-300"} pl-4`}
                  >
                    <h3 className="text-lg font-bold">{project.name}</h3>
                    <p className={`${settings.darkMode ? "text-gray-300" : "text-gray-700"} mb-2`}>
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )

  // Consultant Template
  const renderConsultantTemplate = () => (
    <div className={`max-w-4xl mx-auto ${darkModeClasses} p-8 shadow-lg ${fontClass} ${sizeClass}`}>
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">{personalInfo.name || "Your Name"}</h1>
        <p className={`text-xl ${colorClasses.split(" ")[0]} font-semibold mb-4`}>Management Consultant</p>
        <div className={`${settings.darkMode ? "text-gray-400" : "text-gray-600"} flex justify-center gap-4`}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
      </header>

      {summary && (
        <section className={`mb-8 ${settings.darkMode ? "bg-gray-800" : "bg-gray-50"} p-6 rounded-lg`}>
          <h2 className={`text-2xl font-bold mb-4 ${colorClasses.split(" ")[0]}`}>Executive Summary</h2>
          <p className={`${settings.darkMode ? "text-gray-300" : "text-gray-700"} leading-relaxed text-lg`}>
            {summary}
          </p>
        </section>
      )}

      {experience.length > 0 && (
        <section className="mb-8">
          <h2 className={`text-2xl font-bold mb-6 ${colorClasses.split(" ")[0]}`}>Professional Experience</h2>
          {experience.map((exp) => (
            <div
              key={exp.id}
              className={`mb-8 border-l-4 ${settings.darkMode ? "border-gray-600" : "border-gray-300"} pl-6`}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-xl font-bold">{exp.position}</h3>
                  <p className={`text-lg ${colorClasses.split(" ")[0]} font-semibold`}>{exp.company}</p>
                </div>
                <div className={`text-right ${settings.darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  <p className="font-semibold">
                    {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                  </p>
                  <p>{exp.location}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ul
                  className={`list-disc list-inside space-y-2 ${settings.darkMode ? "text-gray-300" : "text-gray-700"}`}
                >
                  {exp.description.map((desc, index) => (
                    <li key={index} className="leading-relaxed">
                      {desc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  )

  // Startup Template
  const renderStartupTemplate = () => (
    <div className={`max-w-4xl mx-auto ${darkModeClasses} p-8 shadow-lg ${fontClass} ${sizeClass}`}>
      <header className="mb-8 relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 rounded-lg">
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-2">{personalInfo.name || "Your Name"}</h1>
          <p className="text-xl mb-4">Entrepreneur & Innovator</p>
          <div className="flex flex-wrap gap-4 text-sm">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
          </div>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full -ml-12 -mb-12"></div>
      </header>

      {summary && (
        <section className="mb-8">
          <h2 className={`text-2xl font-bold mb-4 ${colorClasses.split(" ")[0]}`}>Vision Statement</h2>
          <div
            className={`bg-gradient-to-r ${settings.darkMode ? "from-blue-900/20 to-purple-900/20" : "from-blue-50 to-purple-50"} p-6 rounded-lg border-l-4 border-purple-500`}
          >
            <p className={`${settings.darkMode ? "text-gray-300" : "text-gray-700"} leading-relaxed text-lg italic`}>
              "{summary}"
            </p>
          </div>
        </section>
      )}

      {experience.length > 0 && (
        <section className="mb-8">
          <h2 className={`text-2xl font-bold mb-6 ${colorClasses.split(" ")[0]}`}>Entrepreneurial Journey</h2>
          {experience.map((exp, index) => (
            <div key={exp.id} className="mb-8 relative">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold">{exp.position}</h3>
                  <p className={`${colorClasses.split(" ")[0]} font-semibold text-lg`}>{exp.company}</p>
                </div>
                <div className={`text-right ${settings.darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  <p className="font-semibold">
                    {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                  </p>
                </div>
              </div>
              <div className={`ml-12 ${settings.darkMode ? "bg-gray-800" : "bg-gray-50"} p-4 rounded-lg`}>
                <ul
                  className={`list-disc list-inside space-y-2 ${settings.darkMode ? "text-gray-300" : "text-gray-700"}`}
                >
                  {exp.description.map((desc, descIndex) => (
                    <li key={descIndex} className="leading-relaxed">
                      {desc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  )

  const templates = {
    modern: renderModernTemplate,
    classic: renderModernTemplate, // Using modern as fallback for space
    minimal: renderModernTemplate, // Using modern as fallback for space
    creative: renderModernTemplate, // Using modern as fallback for space
    executive: renderExecutiveTemplate,
    tech: renderTechTemplate,
    academic: renderAcademicTemplate,
    designer: renderDesignerTemplate,
    consultant: renderConsultantTemplate,
    startup: renderStartupTemplate,
  }

  return (
    <div id="resume-preview" className={settings.darkMode ? "dark" : ""}>
      {templates[settings.template]()}
    </div>
  )
}
