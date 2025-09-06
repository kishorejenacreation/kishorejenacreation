"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface ProjectFormContextType {
  showProjectForm: boolean
  openProjectForm: () => void
  closeProjectForm: () => void
}

const ProjectFormContext = createContext<ProjectFormContextType | undefined>(undefined)

/**
 * Hook to access the Project Form context
 */
export function useProjectForm(): ProjectFormContextType {
  const context = useContext(ProjectFormContext)
  if (!context) {
    throw new Error("❌ useProjectForm must be used within a ProjectFormProvider")
  }
  return context
}

/**
 * Provider to wrap your app or sections where Project Form state is needed
 */
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
