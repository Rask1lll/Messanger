"use client";
import { useLogout } from "@/utils/useLogout";
import ProfileBar from "./ProfileBar";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function NavBar() {
  const logout = useLogout();
  const [burgerOpen, setBurgerOpen] = useState<boolean>();
  return (
    <div className="max-h-full">
      <div className="flex select-none  relative">
        <div className="flex items-center max-h-full not-sm:p-1 text-xl gap-2 font-semibold bg-blue-300 rounded-2xl p-2 text-gray-500">
          <Image
            src={"/logo.png"}
            width={0}
            height={0}
            alt=""
            quality={100}
            className="sm:w-13 w-10 h-10 sm:h-13 object-cover "
            priority
            unoptimized={true}
          ></Image>
          Alem
        </div>
        <div className="ml-auto mr-4 ">
          <div
            className={`${
              !burgerOpen ? `rotate-90` : "rotate-0"
            } text-2xl  transition-all hover:cursor-pointer duration-500 origin-center `}
            onClick={() => {
              setBurgerOpen(!burgerOpen);
            }}
          >
            lll
          </div>
        </div>
      </div>
      <AnimatePresence>
        {burgerOpen && (
          <motion.div
            initial={{ x: 300 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            transition={{ duration: 0.5 }}
            className="relative z-100"
          >
            <div className=" w-full  flex justify-end">
              <div className="p-7 rounded-l-xl bg-[rgba(153,168,255,0.86)] border-2 border-r-0 border-blue-200 backdrop-blur-[3px] absolute max-w-[70%]">
                <ul className="list-none flex flex-col gap-5 text-white font-semibold">
                  <li className="flex items-center">
                    <Link href="/profile" className="flex items-center gap-2">
                      <div className="relative rounded-4xl overflow-hidden w-20 h-20 min-w-20 min-h-20">
                        <Image
                          src={"/ava.jpg"}
                          alt=""
                          fill
                          className="object-cover"
                        />
                      </div>
                      <p className="wrap-anywhere text-[13px]">
                        Raswdwdawdwadawdawdawd
                      </p>
                    </Link>
                  </li>
                  <Link href={"/home"}>
                    <li className="flex gap-1 bg-amber-50/40 ring-blue-600 ring-1 p-1 py-3 rounded-xl">
                      <h3>📭</h3>
                      <p>My Chats</p>
                    </li>
                  </Link>
                  <Link href={"/contacts"}>
                    <li className="flex gap-1 bg-amber-50/40 ring-blue-600 ring-1 p-1 py-3 rounded-xl">
                      <h3>💻</h3>
                      <p>My Contacts</p>
                    </li>
                  </Link>
                  <li className="flex gap-1p-1 m-0 rounded-xl">
                    <button
                      onClick={() => {
                        logout();
                      }}
                      className="text-xl group overflow-hidden p-2 ml-auto transition-all:easy duration-300 hover:cursor-pointer  ring-2 ring-[#ff0000] relative rounded-xl"
                    >
                      <div className="h-[100%] left-0 top-0 bg-red-500/70 -z-10 group-hover:w-full w-0 duration-400 absolute"></div>
                      LogOut
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
