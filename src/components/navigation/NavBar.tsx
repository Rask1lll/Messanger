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
    <div className="z-100 relative">
      <div className="not-sm:hidden">
        <div className="flex box-border items-center mb-2 p-3 px-3 pr-6 rounded-4xl justify-between ">
          <ProfileBar></ProfileBar>
          <button
            onClick={() => {
              logout();
            }}
            className="text-xl p-3 h-[80%] px-5 hover:bg-red-900 transition-all:easy duration-300 hover:cursor-pointer bg-[rgba(255,0,0,0.55)] ring-1 ring-red-600 text-white rounded-xl"
          >
            LogOut
          </button>
        </div>
      </div>
      <div className="not-sm:flex items-center relative hidden">
        <div className="flex text-xl gap-2 font-semibold bg-blue-300 rounded-2xl p-2 text-gray-500">
          <Image src={"/logo.png"} width={30} height={30} alt=""></Image>
          Alem
        </div>
        <div className="ml-auto mr-4 ">
          <div
            className={`${
              !burgerOpen ? `rotate-90` : "rotate-0"
            } text-2xl  transition-all hover:cursor-pointer duration-200 origin-center `}
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
            exit={{ x: 300 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className=" w-full flex justify-end">
              <div className="p-7 rounded-l-xl bg-[rgba(185,23,255,0.93)] absolute max-w-[70%]">
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
                    <li className="flex gap-1 bg-purple-400 p-1 py-3 rounded-xl">
                      <h3>📭</h3>
                      <p>My Chats</p>
                    </li>
                  </Link>
                  <li className="flex gap-1 bg-purple-400 p-1 py-3 rounded-xl">
                    <h3>💻</h3>
                    <p>My Contacts</p>
                  </li>
                  <li className="flex gap-1p-1 m-0 rounded-xl">
                    <button
                      onClick={() => {
                        logout();
                      }}
                      className="text-xl p-3 ml-auto hover:bg-red-400 transition-all:easy duration-300 hover:cursor-pointer bg-red-600 text-white rounded-xl"
                    >
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
