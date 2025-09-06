"use client";
import { createContext, useContext, useState, type ReactNode } from "react";

interface NotificationContextType {
  message: string;
  showNotification: (msg: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState("");

  const showNotification = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000); // Auto clear after 3 seconds
  };

  return (
    <NotificationContext.Provider value={{ message, showNotification }}>
      {children}
      {message && (
        <div className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded shadow-lg z-50">
          {message}
        </div>
      )}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotification must be used within a NotificationProvider");
  return ctx;
};
