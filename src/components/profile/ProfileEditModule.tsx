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
    <div className="min-w-[300px] flex z-10">
      <div className="w-full h-fit gap-2 bg-[rgba(56,105,255,0.10)] relative rounded-2xl outline-2 outline-blue-500 p-[2%] box-content">
        <div className="flex flex-col items-center">
          <div
            className={`relative lg:w-[120px] lg:h-[120px] w-[100px] h-[100px] rounded-full overflow-hidden `}
          >
            <Image
              src={userAvatar || "/"}
              alt=""
              fill
              className="object-center p-2"
            ></Image>
          </div>
          <div className="sm:w-[50%] flex flex-col items-center gap-6 pt-1 w-[80%] lg:w-[80%] ">
            <label htmlFor="avatarInputFile" className="w-[50%]">
              <div className="bg-white xl:text-base text-[10px] text-center py-2 rounded-lg opacity-100 ring-2 ring-gray-600">
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
            <div className="w-full">
              <div className="w-[100%] flex items-center flex-col gap-10">
                <div className="w-[100%] rounded-2xl ring-4 ring-white box-border p-4 px-10">
                  <label htmlFor="Name" className="font-bold text-gray-800">
                    Input new name
                  </label>
                  <input
                    type="text"
                    placeholder="New Name"
                    className="block bg-white w-full text-xl"
                  />
                </div>
                <div className="w-full rounded-2xl ring-4 ring-white box-border p-4 ">
                  <label
                    htmlFor="Description"
                    className="font-bold text-gray-800"
                  >
                    Input new description
                  </label>
                  <textarea
                    name="Description"
                    placeholder="New Description"
                    className="resize-none block bg-white w-[100%] outline-blue-400 max-h-[100px] min-h-[70px]"
                    id="Description"
                  ></textarea>
                </div>

                <button className="bg-blue-300 p-4 mx-[20%] border-2 border-blue-500 rounded-xl hover:cursor-pointer hover:bg-[rgba(56,105,255,0.25)] transition-all duration-300">
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
