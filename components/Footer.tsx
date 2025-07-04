import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-white py-6 mt-10 text-center">
      <p className="text-sm">© {new Date().getFullYear()} Kishore Jena Creation. All rights reserved.</p>
      <p className="text-xs mt-1">
        Built with ❤️ using Next.js by <strong>Kishore Jena</strong>
      </p>
    </footer>
  );
}
