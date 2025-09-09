import useAlertStore from "@/store/alertStore";
import useAuthUser from "@/store/currentUser";
import Image from "next/image";
import { useRef, useState } from "react";

export default function ProfileEditModule({
  closeModule,
}: {
  closeModule: () => void;
}) {
  const { setAvatarURL, avatarURL } = useAuthUser();
  const { setMessage } = useAlertStore();
  const avatarRef = useRef<HTMLInputElement>(null);
  const [userAvatar, setUserAvater] = useState<string | null>(avatarURL);
  async function handleUploadImage() {
    const input = avatarRef.current;
    if (!input || !input.files || input.files.length === 0) return;

    const file = input.files[0];

    console.log(file.type);
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
    <div className=" flex z-10">
      <div className="w-full h-fit gap-7 bg-[rgba(56,105,255,0.30)] relative rounded-2xl outline-2 outline-blue-600 p-[2%] box-content">
        <div className="flex gap-[1%]">
          <div
            className={`relative lg:w-[120px] lg:h-[120px] w-[100px] flex h-[100px] rounded-full overflow-hidden `}
          >
            <Image
              src={userAvatar || "/"}
              alt=""
              fill
              className="object-center p-2"
            ></Image>
          </div>
          <div className="sm:w-[60%] flex flex-col gap-6 pt-7 w-[80%] lg:w-[50%] ">
            <label
              htmlFor="avatarInputFile"
              className="w-[60%] flex items-center"
            >
              <div className="bg-white xl:text-lg text-[12px] text-center py-3 rounded-lg opacity-100 ring-2 ring-gray-600">
                Change avatar
              </div>
            </label>
            <input
              type="file"
              name="avatarInputFile"
              hidden
              id="avatarInputFile"
              ref={avatarRef}
              onChange={handleUploadImage}
            />
            <div>
              <div className="w-[100%] flex flex-col gap-10">
                <input
                  type="text"
                  placeholder="New Name"
                  className="block bg-white"
                />

                <textarea
                  name=""
                  placeholder="New Description"
                  className="block bg-white w-[100%] max-h-[100px] min-h-[50px]"
                  id=""
                ></textarea>

                <button className="bg-blue-500 p-4 mx-[20%] border-2 border-blue-700 rounded-xl hover:cursor-pointer hover:bg-[rgba(56,105,255,0.25)] transition-all duration-300">
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            closeModule();
          }}
          className="absolute right-7 top-3 text-3xl hover:cursor-pointer"
        >
          ✖
        </button>
      </div>
    </div>
  );
}
