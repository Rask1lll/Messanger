"use client";
import ProfileActions from "@/components/profile/ProfileAction";
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
      className="w-full h-full flex justify-center"
    >
      <div className="max-w-[1300px] h-full  ">
        <div className=" fixed w-[90%] flex justify-center z-10 ">
          <div ref={userEditModuleRef} className="w-[40%]">
            {userEditModule}
          </div>
        </div>
        <div
          className={`  mt-5 flex not-md:flex-col gap-6 ${
            userEditModule !== null && "blur-[10px]"
          }`}
        >
          <div className="md:w-2/3 w-full h-min-100 rounded-4xl ring-2 ring-blue-300 bg-blue-200 p-5">
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
              <div className="not-sm:bg-purple-100 rounded-2xl not-sm:p-4 font-semibold not-lg:text-xl flex flex-col justify-between pb-5  text-gray-600">
                <h2 className=" not-sm:text-[16px]">👩🏼 Name: Rassul</h2>
                <h2 className=" not-sm:text-[16px]">📧 Email: {email}</h2>
                <h2 className=" not-sm:text-[16px]">
                  📅 Registered: 21.01.2006
                </h2>
              </div>
            </div>
            <div className="bg-[rgba(201,123,255,0.65)] mt-[5%] rounded-lg p-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
              debitis suscipit, nemo praesentium unde impedit dolor quia
              inventore labore enim at repellat corporis, similique accusamus
              velit blanditiis perspiciatis excepturi esse!
            </div>
          </div>
          <div className="md:w-1/3 w-full rounded-4xl ring-2 min-w-70 h-[400px] min-h-100 max-h-[400px] p-5 ring-gray-400 bg-gray-200">
            <div className="flex flex-col justify-between h-[100%] flex-grow">
              <ProfileActions em="💬" color={"green"} content="Send message" />
              <ProfileActions
                em="📱"
                color={"purple"}
                content="Become friends"
              />
              <ProfileActions em="💌" color={"orange"} content="Send gift" />
              <ProfileActions em="💣" color={"red"} content="Report user" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
