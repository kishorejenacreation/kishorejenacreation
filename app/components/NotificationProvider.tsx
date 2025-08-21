"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface NotificationContextType {
  message: string;
  type: "info" | "success" | "error";
  visible: boolean;
  showNotification: (msg: string, type?: "info" | "success" | "error", duration?: number) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"info" | "success" | "error">("info");
  const [visible, setVisible] = useState(false);

  const showNotification = (
    msg: string,
    notifType: "info" | "success" | "error" = "info",
    duration = 3000
  ) => {
    setMessage(msg);
    setType(notifType);
    setVisible(true);

    setTimeout(() => {
      setVisible(false);
    }, duration);
  };

  return (
    <NotificationContext.Provider value={{ message, type, visible, showNotification }}>
      {children}
      {visible && (
        <div
          className={`fixed bottom-4 right-4 px-4 py-2 rounded shadow text-white z-50
            ${type === "success" ? "bg-green-500" : type === "error" ? "bg-red-500" : "bg-blue-500"}`}
        >
          {message}
        </div>
      )}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error("useNotification must be used within a NotificationProvider");
  return context;
};
