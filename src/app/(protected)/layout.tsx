// app/(protected)/layout.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/loading/Loader";
import useAuthUser from "@/store/currentUser";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setCreatedAt } = useAuthUser();
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

        const result = await res.json();

        const createdAt = (result.createdAt as Date)
          .toLocaleString("en-US")
          .slice(0, 10);
        console.log(createdAt);
        setLoading(false);
        setCreatedAt(createdAt);
      } catch (e) {
        console.error(e);
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
    <div className="p-3 not-sm:pt-5 pb-1 h-screen max-w-dvw overflow-hidden ">
      <div className="h-full">{children}</div>
    </div>
  );
}
