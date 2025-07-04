"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

// Define form state structure
interface ProjectFormState {
  name: string;
  email: string;
  projectDetails: string;
}

// Define context type
interface ProjectFormContextType {
  formData: ProjectFormState;
  updateFormData: (field: keyof ProjectFormState, value: string) => void;
  resetForm: () => void;
}

// Create the context
const ProjectFormContext = createContext<ProjectFormContextType | undefined>(undefined);

// Provider component
export const ProjectFormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<ProjectFormState>({
    name: "",
    email: "",
    projectDetails: "",
  });

  const updateFormData = (field: keyof ProjectFormState, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      projectDetails: "",
    });
  };

  return (
    <ProjectFormContext.Provider value={{ formData, updateFormData, resetForm }}>
      {children}
    </ProjectFormContext.Provider>
  );
};

// Custom hook to use form context
export const useProjectForm = () => {
  const context = useContext(ProjectFormContext);
  if (!context) {
    throw new Error("useProjectForm must be used within a ProjectFormProvider");
  }
  return context;
};
