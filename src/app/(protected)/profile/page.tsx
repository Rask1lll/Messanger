"use client";
import ProfileEditModule from "@/components/profile/ProfileEditModule";
import useAuthUser from "@/store/currentUser";
import Image from "next/image";
import { useRef, useState } from "react";
import { JSX } from "react/jsx-runtime";

export default function Profile() {
  const { email, avatarURL } = useAuthUser();
  const [avatarHover, setAvatarHover] = useState<boolean>(false);
  const [userEditModule, setUserEditModule] = useState<JSX.Element | null>(
    null
  );

  const userEditModuleRef = useRef<HTMLDivElement>(null);

  function closeModule() {
    setUserEditModule(null);
  }
  function OpenUserModule() {
    setUserEditModule(<ProfileEditModule closeModule={closeModule} />);
  }
  return (
    <div
      onClick={(e) => {
        if (!userEditModuleRef) {
          return;
        }
        if (userEditModule) {
          if (!userEditModuleRef.current?.contains(e.target as Node)) {
            closeModule();
          }
        }
        console.log(e.target);
      }}
    >
      <div className="fixed w-full flex justify-center z-10">
        <div ref={userEditModuleRef} className="w-[40%]">
          {userEditModule}
        </div>
      </div>
      <div className={`flex gap-6 ${userEditModule !== null && "blur-[10px]"}`}>
        <div className="w-2/3 h-100 rounded-4xl ring-2 ring-purple-500 bg-purple-200 p-5">
          <div className="flex gap-10 text-3xl">
            <div
              className={`relative w-[170px] h-[170px] ring-2 rounded-full  overflow-hidden ${
                avatarHover && `ring-amber-300`
              }  hover:cursor-pointer `}
              onMouseEnter={() => {
                setAvatarHover(true);
              }}
              onMouseLeave={() => {
                setAvatarHover(false);
              }}
              onClick={() => {
                OpenUserModule();
              }}
            >
              <Image
                src={avatarURL || "/"}
                alt=""
                fill
                className="object-center bg-white p-0.5 "
              ></Image>
            </div>
            <div className="font-semibold flex flex-col justify-between pb-5  text-gray-600">
              <h2>👩🏼 Name:Rassul</h2>
              <h2>📧 Email:{email}</h2>
              <h2>📅 Registered:21.01.2006</h2>
            </div>
          </div>
        </div>
        <div className="w-1/3 h-100 rounded-4xl ring-2 ring-gray-400 bg-gray-200"></div>
      </div>
    </div>
  );
}
