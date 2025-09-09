// app/(protected)/layout.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/loading/Loader";
import NavBar from "@/components/navigation/NavBar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch("http://localhost:4000/api/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          localStorage.removeItem("token");
          router.replace("/");
          return;
        }
        setLoading(false);
      } catch {
        localStorage.removeItem("token");
        router.replace("/");
      }
    }

    checkAuth();
  }, [router]);

  if (loading) {
    return <Loader></Loader>;
  }

  return (
    <div className="p-3 h-screen ">
      <div className="h-[10%]">
        <NavBar />
      </div>
      <div className="h-[90%]">{children}</div>
    </div>
  );
}
