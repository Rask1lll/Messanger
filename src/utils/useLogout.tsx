"use client";
import useAuthUser from "@/store/currentUser";
import { useRouter } from "next/navigation";

export function useLogout() {
  const { resetAll } = useAuthUser();
  const router = useRouter();

  return () => {
    resetAll(); // чистим стор и токен
    router.push("/"); // редиректим
  };
}
