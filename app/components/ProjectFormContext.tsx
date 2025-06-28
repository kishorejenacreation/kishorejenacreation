"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface ProjectFormContextType {
  showProjectForm: boolean
  openProjectForm: () => void
  closeProjectForm: () => void
}

const ProjectFormContext = createContext<ProjectFormContextType | undefined>(undefined)

export function useProjectForm() {
  const context = useContext(ProjectFormContext)
  if (context === undefined) {
    throw new Error("useProjectForm must be used within a ProjectFormProvider")
  }
  return context
}

export function ProjectFormProvider({ children }: { children: ReactNode }) {
  const [showProjectForm, setShowProjectForm] = useState(false)

  const openProjectForm = () => setShowProjectForm(true)
  const closeProjectForm = () => setShowProjectForm(false)

  return (
    <ProjectFormContext.Provider
      value={{
        showProjectForm,
        openProjectForm,
        closeProjectForm,
      }}
    >
      {children}
    </ProjectFormContext.Provider>
  )
}
