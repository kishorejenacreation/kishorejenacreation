"use client";

import { useState, useEffect, useContext, createContext, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { PencilIcon, EyeIcon, ArrowDownTrayIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// ---------------- AuthProvider (inside same file) ----------------

interface User {
  id: string;
  email?: string;
  username?: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (emailOrUsername: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = async (emailOrUsername: string, password: string) => {
    if (emailOrUsername === "kjcadmin" && password === "kjc2005") {
      const admin: User = { id: "1", email: emailOrUsername, username: "Admin", isAdmin: true };
      setUser(admin);
      localStorage.setItem("user", JSON.stringify(admin));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

// ---------------- Admin Page ----------------

interface PageContent {
  id: string;
  title: string;
  content: string;
  lastModified: string;
}

const initialContent: PageContent[] = [
  { id: "hero", title: "Hero Section", content: "Kishore Jena Creation - Professional editing & music streaming", lastModified: new Date().toISOString() },
  { id: "services", title: "Services Section", content: "Video Editing, Photo Editing, Thumbnails, Invitations, Graphic Design, Audio Editing", lastModified: new Date().toISOString() },
  { id: "about", title: "About Section", content: "Kishore Jena is a passionate digital content creator with 5+ years experience...", lastModified: new Date().toISOString() },
];

export default function AdminPage() {
  return (
    <AuthProvider>
      <AdminPageContent />
    </AuthProvider>
  );
}

function AdminPageContent() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [content, setContent] = useState<PageContent[]>(initialContent);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<PageContent | null>(null);

  useEffect(() => {
    if (!user?.isAdmin) router.push("/");
    const saved = localStorage.getItem("kjc_admin_content");
    if (saved) setContent(JSON.parse(saved));
  }, [user, router]);

  const handleEdit = (item: PageContent) => { setEditingId(item.id); setEditForm({ ...item }); };
  const handleSave = () => {
    if (!editForm) return;
    const updated = content.map((i) => (i.id === editForm.id ? { ...editForm, lastModified: new Date().toISOString() } : i));
    setContent(updated);
    localStorage.setItem("kjc_admin_content", JSON.stringify(updated));
    setEditingId(null);
    setEditForm(null);
    alert("✅ Content updated!");
  };
  const handleCancel = () => { setEditingId(null); setEditForm(null); };
  const handlePublish = () => alert("🚀 Website published!");

  if (!user?.isAdmin) return <div className="min-h-screen flex items-center justify-center text-red-600 font-bold">Access Denied</div>;

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">🛠️ Admin Panel</h1>
        {content.map((section) => (
          <div key={section.id} className="mb-6 p-4 border rounded-xl shadow-sm bg-white dark:bg-gray-900">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold">{section.title}</h2>
              {editingId === section.id ? (
                <div className="space-x-2">
                  <Button onClick={handleSave}><ArrowDownTrayIcon className="w-5 h-5 inline mr-1" /> Save</Button>
                  <Button variant="destructive" onClick={handleCancel}><XMarkIcon className="w-5 h-5 inline mr-1" /> Cancel</Button>
                </div>
              ) : (
                <Button onClick={() => handleEdit(section)}><PencilIcon className="w-5 h-5 inline mr-1" /> Edit</Button>
              )}
            </div>
            {editingId === section.id ? (
              <div className="space-y-2">
                <Input value={editForm?.title || ""} onChange={(e) => setEditForm((p) => p ? { ...p, title: e.target.value } : null)} />
                <Textarea value={editForm?.content || ""} onChange={(e) => setEditForm((p) => p ? { ...p, content: e.target.value } : null)} />
              </div>
            ) : (
              <p className="text-muted-foreground">{section.content}</p>
            )}
          </div>
        ))}
        <div className="mt-8">
          <Button onClick={handlePublish}><EyeIcon className="w-5 h-5 inline mr-1" /> Publish Website</Button>
          <Button className="ml-4 bg-red-500" onClick={logout}>Logout</Button>
        </div>
      </div>
    </div>
  );
}
