"use client";

import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";

export default function ToasterProvider() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Avoid hydration errors

  return <Toaster position="top-center" />;
}
