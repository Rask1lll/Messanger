"use client";
import NavBar from "@/components/navigation/NavBar";
import ProfileActions from "@/components/profile/ProfileAction";
import ProfileEditModule from "@/components/profile/ProfileEditModule";
import useAuthUser from "@/store/currentUser";
import Image from "next/image";
import { useRef, useState } from "react";
import { JSX } from "react/jsx-runtime";

export default function Profile() {
  const { email, avatarURL, description, name, createdAt } = useAuthUser();
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
      }}
      className="w-full h-full left-0 "
    >
      <div>
        <NavBar />
      </div>
      <div className=" w-full h-full top-0 ">
        <div className=" w-[100%] fixed flex z-10 ">
          <div ref={userEditModuleRef} className="w-[30%] mx-auto">
            {userEditModule}
          </div>
        </div>
        <div
          className={`  mt-5 flex justify-center not-md:flex-col gap-6 ${
            userEditModule !== null && "blur-[10px]"
          }`}
        >
          <div className="md:w-2/3 max-w-[900px] w-full h-min-100 rounded-4xl ring-2 ring-blue-300 bg-blue-200/30 p-5">
            <div className="flex not-md:justify-center items-center not-sm:flex-col gap-10 text-3xl">
              <div
                className={`relative xl:w-[170px] xl:h-[170px] lg:w-[130px] lg:h-[130px] w-[150px] h-[135px] ring-2 rounded-full  overflow-hidden ${
                  avatarHover && `ring-amber-300`
                }  hover:cursor-pointer xl:min-w-[50px] `}
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
              <div className=" gap-2 p-3 ring ring-blue-600/30 rounded-2xl not-sm:p-4 font-semibold not-lg:text-xl flex flex-col justify-between pb-5  text-gray-600">
                <h2 className=" not-sm:text-[16px] ring-2 bg-blue-600/5 rounded-xl p-2 ring-sky-500/10">
                  👩🏼 Name: {name}
                </h2>
                <h2 className=" not-sm:text-[16px] ring-2 bg-blue-600/5 rounded-xl p-2 ring-sky-500/10">
                  📧 Email: {email}
                </h2>
                <h2 className=" not-sm:text-[16px] ring-2 bg-blue-600/5 rounded-xl p-2 ring-sky-500/10">
                  📅 Registered: {createdAt}
                </h2>
              </div>
            </div>
            <div className="bg-[rgba(74,127,196,0.25)] mt-[5%] font-medium rounded-lg p-4">
              {description}
            </div>
          </div>
          <div className="md:w-1/3 w-full rounded-4xl ring-2 min-w-70 h-[400px] min-h-100 max-h-[400px] bg-blue-200/30 p-5 ring-blue-300 bg-linear-60 ">
            <div className="flex flex-col justify-between h-[100%] flex-grow">
              <ProfileActions em="💬" content="Send message" />
              <ProfileActions em="📱" content="Become friends" />
              <ProfileActions em="💌" content="Send gift" />
              <ProfileActions em="💣" content="Report user" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
