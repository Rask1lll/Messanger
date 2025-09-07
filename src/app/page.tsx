"use client";
import LoginPageForm from "@/components/loginPage/LoginPageForm";
import useAuthUser from "@/store/currentUser";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  console.log(useAuthUser());
  return <LoginPageForm />;
}
