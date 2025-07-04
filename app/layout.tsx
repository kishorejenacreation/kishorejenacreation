import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "../components/theme-provider"; // relative import
import { AuthProvider } from "../components/AuthProvider"; // FIXED: relative import
import Header from "../components/Header";
import Footer from "../components/Footer";
import { MusicProvider } from "../components/MusicContext";
import { ProjectFormProvider } from "../components/ProjectFormContext";
import { NotificationProvider } from "../components/NotificationContext";
import MusicPlayer from "../components/MusicPlayer";
import Chatbot from "../components/Chatbot";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Kishore Jena Creation - Professional Editing Services & Music Platform",
  description: "Professional editing services and online music streaming platform",
    generator: 'v0.dev'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* ✅ Google Analytics Tag */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-DFF4S1XBX8"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-DFF4S1XBX8');
            `,
          }}
        />
      </head>
      <body
        className={`${inter.className} min-h-screen bg-background text-foreground`}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <NotificationProvider>
              <MusicProvider>
                <ProjectFormProvider>
                  <Header />
                  <main>{children}</main>
                  <Footer />
                  <MusicPlayer />
                  <Chatbot />
                </ProjectFormProvider>
              </MusicProvider>
            </NotificationProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
