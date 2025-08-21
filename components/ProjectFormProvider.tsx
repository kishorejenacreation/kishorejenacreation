"use client";
import { createContext, useContext, useState, type ReactNode } from "react";

interface FormData {
  projectName: string;
  description: string;
  budget: string;
}

interface ProjectFormContextType {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: string) => void;
  resetForm: () => void;
  showProjectForm: boolean;
  openProjectForm: () => void;
  closeProjectForm: () => void;
}

const ProjectFormContext = createContext<ProjectFormContextType | undefined>(undefined);

export const ProjectFormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<FormData>({
    projectName: '',
    description: '',
    budget: '',
  });

  const [showProjectForm, setShowProjectForm] = useState(false);

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({ projectName: '', description: '', budget: '' });
  };

  const openProjectForm = () => setShowProjectForm(true);
  const closeProjectForm = () => setShowProjectForm(false);

  return (
    <ProjectFormContext.Provider
      value={{
        formData,
        updateFormData,
        resetForm,
        showProjectForm,
        openProjectForm,
        closeProjectForm,
      }}
    >
      {children}
    </ProjectFormContext.Provider>
  );
};

export const useProjectForm = () => {
  const context = useContext(ProjectFormContext);
  if (!context) {
    throw new Error("useProjectForm must be used within a ProjectFormProvider");
  }
  return context;
};
