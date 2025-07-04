"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

// Notification message structure
interface Notification {
  message: string;
  type: "success" | "error" | "info";
}

// Context type
interface NotificationContextType {
  notification: Notification | null;
  showNotification: (message: string, type: "success" | "error" | "info") => void;
  clearNotification: () => void;
}

// Create context
const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Provider
export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState<Notification | null>(null);

  const showNotification = (message: string, type: "success" | "error" | "info") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000); // Auto-clear after 3 seconds
  };

  const clearNotification = () => setNotification(null);

  return (
    <NotificationContext.Provider value={{ notification, showNotification, clearNotification }}>
      {children}
      {/* Notification display */}
      {notification && (
        <div
          className={`fixed bottom-4 right-4 px-4 py-2 rounded shadow text-white z-50
            ${notification.type === "success" ? "bg-green-600" : ""}
            ${notification.type === "error" ? "bg-red-600" : ""}
            ${notification.type === "info" ? "bg-blue-600" : ""}`}
        >
          {notification.message}
        </div>
      )}
    </NotificationContext.Provider>
  );
};

// Custom hook
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};
