import useAlertStore from "@/store/alertStore";
import useAuthUser from "@/store/currentUser";
import Image from "next/image";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

interface changeUser {
  name: string;
  desc: string;
}

export default function ProfileEditModule({
  closeModule,
}: {
  closeModule: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<changeUser>();
  const { setAvatarURL, avatarURL, setUserDesc, setUserName } = useAuthUser();
  const { setMessage, setIsSecure } = useAlertStore();
  const avatarRef = useRef<HTMLInputElement>(null);
  const [userAvatar, setUserAvater] = useState<string | null>(avatarURL);

  async function changeUserParam(data: changeUser) {
    const token = localStorage.getItem("token");
    if (!data.name) return;

    try {
      const res = await fetch("http://localhost:4000/api/me", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token ?? ""}`,
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.text();
        console.error("Request failed:", res.status, err);
      }
      setUserDesc(data.desc);
      setUserName(data.name);
      setMessage("User info saved");
      setIsSecure(false);
    } catch (e) {
      console.error(e);
    }
  }

  async function handleUploadImage() {
    const input = avatarRef.current;
    if (!input || !input.files || input.files.length === 0) return;

    const file = input.files[0];

    if (file.type !== "image/png" && file.type !== "image/jpeg") {
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
      setUserAvater(data.avatarUrl);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="z-10 flex min-w-[300px] items-start justify-center">
      <div className="w-full max-w-[680px] rounded-2xl border border-blue-200 bg-white/70 p-5 shadow-xl backdrop-blur-md ring-1 ring-blue-300/50">
        {/* header */}
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 ml-[35%]">
            Edit profile 🔑
          </h3>
          <button
            onClick={closeModule}
            className="rounded-xl hover:cursor-pointer p-1 text-2xl leading-none text-gray-500 transition hover:bg-gray-100 hover:text-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label="Close"
          >
            ✖
          </button>
        </div>

        {/* body */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[180px,1fr]">
          {/* avatar block */}
          <div className="flex flex-col items-center gap-4">
            <div className="group relative h-[120px] w-[120px] overflow-hidden rounded-full ring-2 ring-blue-200">
              <Image
                src={userAvatar || "/"}
                alt="User avatar"
                fill
                className="object-cover"
                sizes="120px"
              />
            </div>

            <label
              htmlFor="avatarInputFile"
              className="inline-flex w-full cursor-pointer select-none items-center justify-center rounded-xl border border-blue-300 bg-white/90 px-4 py-2 text-sm font-medium text-blue-700 shadow-sm transition hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 md:w-full"
            >
              Change avatar
            </label>

            <input
              type="file"
              name="avatarInputFile"
              hidden
              id="avatarInputFile"
              ref={avatarRef}
              onChange={handleUploadImage}
            />
          </div>

          <form onSubmit={handleSubmit(changeUserParam)}>
            <div className="flex w-full flex-col gap-5">
              <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                <label
                  htmlFor="Name"
                  className="mb-2 block text-sm font-semibold text-gray-800"
                >
                  Input new name
                </label>
                <input
                  type="text"
                  placeholder="New Name"
                  id="Name"
                  className="block w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  {...register("name", {
                    minLength: {
                      value: 4,
                      message: "Must be at least 4 letter",
                    },
                    maxLength: {
                      value: 16,
                      message: "Max is 16 letter",
                    },
                  })}
                />
                <div className="text-red-500">{errors.name?.message}</div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                <label
                  htmlFor="Description"
                  className="mb-2 block text-sm font-semibold text-gray-800"
                >
                  Input new description
                </label>
                <textarea
                  id="Description"
                  placeholder="New Description"
                  className="block max-h-[140px] min-h-[90px] w-full resize-none rounded-xl border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  {...register("desc")}
                ></textarea>
              </div>

              <div className="flex justify-center ">
                <button
                  type="submit"
                  typeof="PATCH"
                  className="inline-flex w-full items-center justify-center rounded-xl border border-blue-500 bg-blue-500/90 px-5 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 md:w-auto"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
