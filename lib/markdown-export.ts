import type { ResumeData } from "./types"

export const exportToMarkdown = (resumeData: ResumeData): string => {
  const { personalInfo, summary, education, experience, projects, skills, certifications, languages, awards } =
    resumeData

  let markdown = `# ${personalInfo.name}\n\n`

  // Contact Information
  const contacts = [
    personalInfo.email && `📧 ${personalInfo.email}`,
    personalInfo.phone && `📱 ${personalInfo.phone}`,
    personalInfo.location && `📍 ${personalInfo.location}`,
    personalInfo.website && `🌐 [Website](${personalInfo.website})`,
    personalInfo.linkedin && `💼 [LinkedIn](${personalInfo.linkedin})`,
    personalInfo.github && `💻 [GitHub](${personalInfo.github})`,
  ].filter(Boolean)

  if (contacts.length > 0) {
    markdown += `${contacts.join(" | ")}\n\n`
  }

  // Summary
  if (summary) {
    markdown += `## Summary\n\n${summary}\n\n`
  }

  // Experience
  if (experience.length > 0) {
    markdown += `## Experience\n\n`
    experience.forEach((exp) => {
      markdown += `### ${exp.position} - ${exp.company}\n`
      markdown += `*${exp.startDate} - ${exp.current ? "Present" : exp.endDate}* | ${exp.location}\n\n`
      exp.description.forEach((desc) => {
        markdown += `- ${desc}\n`
      })
      markdown += "\n"
    })
  }

  // Education
  if (education.length > 0) {
    markdown += `## Education\n\n`
    education.forEach((edu) => {
      markdown += `### ${edu.degree} in ${edu.field}\n`
      markdown += `**${edu.institution}** | ${edu.startDate} - ${edu.endDate}\n`
      if (edu.gpa) markdown += `GPA: ${edu.gpa}\n`
      if (edu.description) markdown += `${edu.description}\n`
      markdown += "\n"
    })
  }

  // Projects
  if (projects.length > 0) {
    markdown += `## Projects\n\n`
    projects.forEach((project) => {
      markdown += `### ${project.name}\n`
      markdown += `${project.description}\n`
      markdown += `**Technologies:** ${project.technologies.join(", ")}\n`
      if (project.url) markdown += `**Live Demo:** [${project.url}](${project.url})\n`
      if (project.github) markdown += `**GitHub:** [${project.github}](${project.github})\n`
      markdown += "\n"
    })
  }

  // Skills
  if (skills.length > 0) {
    markdown += `## Skills\n\n`
    skills.forEach((skillGroup) => {
      markdown += `**${skillGroup.category}:** ${skillGroup.items.join(", ")}\n\n`
    })
  }

  // Certifications
  if (certifications.length > 0) {
    markdown += `## Certifications\n\n`
    certifications.forEach((cert) => {
      markdown += `- **${cert.name}** - ${cert.issuer} (${cert.date})\n`
    })
    markdown += "\n"
  }

  // Languages
  if (languages.length > 0) {
    markdown += `## Languages\n\n`
    languages.forEach((lang) => {
      markdown += `- **${lang.name}:** ${lang.proficiency}\n`
    })
    markdown += "\n"
  }

  // Awards
  if (awards.length > 0) {
    markdown += `## Awards\n\n`
    awards.forEach((award) => {
      markdown += `- **${award.name}** - ${award.issuer} (${award.date})\n`
      if (award.description) markdown += `  ${award.description}\n`
    })
  }

  return markdown
}

export const downloadMarkdown = (content: string, filename: string) => {
  const blob = new Blob([content], { type: "text/markdown" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `${filename}.md`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
