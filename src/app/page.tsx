"use client";
import LoginPageForm from "@/components/loginPage/LoginPageForm";
import useAuthUser from "@/store/currentUser";
import { useRouter } from "next/navigation";

export default function Home() {
  const { email } = useAuthUser();
  const router = useRouter();

  console.log(useAuthUser());
  if (!email) {
    return <LoginPageForm />;
  } else {
    router.push("/home");
  }
}
