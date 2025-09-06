#!/bin/bash

echo "🔧 Starting project setup..."

# Step 1: Install core dependencies
echo "📦 Installing missing packages..."
pnpm add next-themes @radix-ui/react-slot @radix-ui/react-label || npm install next-themes @radix-ui/react-slot @radix-ui/react-label

# Step 2: Create missing component if not exist
COMPONENT_PATH="./components/LoginForm.tsx"
if [ ! -f "$COMPONENT_PATH" ]; then
  echo "🧱 Creating placeholder for $COMPONENT_PATH..."

  cat <<EOF > $COMPONENT_PATH
"use client";

import { useAuth } from "@/components/AuthProvider";
import { useEffect } from "react";

const LoginForm = () => {
  const { user, login } = useAuth();

  useEffect(() => {
    console.log("✅ LoginForm loaded. Current user:", user);
  }, [user]);

  return (
    <div className="p-4 border rounded-lg max-w-sm mx-auto mt-20 text-center">
      <h2 className="text-xl font-bold mb-2">Login</h2>
      <p>This is a placeholder login form. Replace with your actual form.</p>
    </div>
  );
};

export default LoginForm;
EOF
else
  echo "✅ $COMPONENT_PATH already exists."
fi

# Step 3: Give script permission
chmod +x setup.sh

# Step 4: Initialize Vercel project if not already
if [ ! -d ".vercel" ]; then
  echo "🚀 Initializing Vercel project..."
  npx vercel init || echo "⚠️ Skipped Vercel init. Already configured or Vercel CLI not installed."
else
  echo "✅ Vercel project already initialized."
fi

# Step 5: Build locally to test
echo "🛠️ Running local build to check for errors..."
pnpm build || npm run build || echo "⚠️ Build failed. Please check the console logs."

echo "✅ Setup script finished. You are ready to deploy!"
