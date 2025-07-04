"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

// Define the type for the music player context
interface MusicContextType {
  currentTrack: string | null;
  setCurrentTrack: (track: string | null) => void;
}

// Create the context with default value
const MusicContext = createContext<MusicContextType | undefined>(undefined);

// Provider to wrap your app
export const MusicProvider = ({ children }: { children: ReactNode }) => {
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);

  return (
    <MusicContext.Provider value={{ currentTrack, setCurrentTrack }}>
      {children}
    </MusicContext.Provider>
  );
};

// Custom hook to use in any component
export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusic must be used within a MusicProvider");
  }
  return context;
};
