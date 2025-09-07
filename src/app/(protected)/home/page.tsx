"use client";
import useAlertStore from "@/store/alertStore";
import useAuthUser from "@/store/currentUser";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const HomePage = () => {
  const { email, setAvatarURL, avatarURL } = useAuthUser();
  const [avatar, setAvatar] = useState<string | null>("");
  const avatarRef = useRef<HTMLInputElement | null>(null);
  const { setMessage } = useAlertStore();

  useEffect(() => {
    setAvatar(avatarURL);
  }, [avatarURL]);
  async function handleUploadImage() {
    const input = avatarRef.current;
    if (!input || !input.files || input.files.length === 0) return;

    const file = input.files[0];

    if (file.type !== "image/png") {
      setMessage("File type error");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:4000/api/me/avatar`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || `Upload failed (${res.status})`);
      }

      const data: { avatarUrl: string } = await res.json();

      setAvatarURL(data.avatarUrl);
      setAvatar(data.avatarUrl);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1.0 }}
        transition={{ duration: 1 }}
        className="w-full h-screen"
      >
        <div className="flex gap-7  min-h-[15%] items-center bg-gray-200 p-8">
          <div>
            <label htmlFor="userImage" className="hover:cursor-pointer">
              <Image
                src={avatar || "/next.svg"}
                alt=""
                width={80}
                height={80}
                quality={100}
                className="rounded-4xl object-cover"
              />
            </label>
            <input
              type="file"
              id="userImage"
              ref={avatarRef}
              className="hidden"
              onChange={() => {
                handleUploadImage();
              }}
            />
          </div>
          <div className="flex-col flex gap-2">
            <span className="text-xl">{email}</span>
            <span className="text-sm opacity-70">Registered since 1980</span>
          </div>
        </div>
        <div></div>
      </motion.div>
    </AnimatePresence>
  );
};

export default HomePage;
