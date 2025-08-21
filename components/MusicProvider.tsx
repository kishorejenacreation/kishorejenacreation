"use client";
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

interface MusicContextType {
  isPlaying: boolean;
  togglePlay: () => void;
  currentSong: string | null;
  playSong: (song: string) => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider = ({ children }: { children: ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState<string | null>(null);

  const togglePlay = () => setIsPlaying((prev) => !prev);
  const playSong = (song: string) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  return (
    <MusicContext.Provider value={{ isPlaying, togglePlay, currentSong, playSong }}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic must be used within a MusicProvider");
  return ctx;
};
