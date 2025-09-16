"use client";
import { useLogout } from "@/utils/useLogout";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useAuthUser from "@/store/currentUser";

export default function NavBar() {
  const { name } = useAuthUser();
  const logout = useLogout();
  const [burgerOpen, setBurgerOpen] = useState<boolean>();
  return (
    <div className="max-h-full">
      <div className="flex select-none">
        <div className="ml-auto mr-4 ">
          <div
            className={`${
              !burgerOpen ? `rotate-90` : "rotate-0"
            } text-3xl md:text-4xl  transition-all hover:cursor-pointer duration-500 origin-center `}
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
            initial={{ x: 500 }}
            animate={{ x: 0 }}
            exit={{ x: 500, opacity: 0.2 }}
            transition={{ duration: 0.5 }}
            className="fixed md:w-[30%] max-[480px]:w-[100%] w-[50%] right-0 z-20"
          >
            <div className="w-full">
              <div className="p-7 rounded-l-xl bg-white border-2 border-r-0 border-blue-200 backdrop-blur-[10px] w-full absolute max-w-full">
                <ul className="list-none flex flex-col bg-sky-100/50 p-4 shadow-xl rounded-2xl ring-1 ring-sky-300 max-w-full gap-5 text-black font-semibold">
                  <li className="flex items-center bg">
                    <Link
                      href="/profile"
                      className="flex group items-center w-full gap-2 p-1 z-10 border-blue-400 border-1 hover:border-transparent overflow-hidden duration-300 rounded-4xl relative"
                    >
                      <div className="absolute h-full left-0 z-100 border-blue-600 rounded-4xl duration-870 w-0 group-hover:w-full not-hover:bg-amber-50/10 group-hover:border-2 border-0 transition-all" />
                      <div className="relative rounded-4xl overflow-hidden w-20 h-20 min-w-20 min-h-20">
                        <Image
                          src={"/ava.jpg"}
                          alt=""
                          fill
                          className="object-cover"
                        />
                      </div>
                      <p className="wrap-anywhere text-lg">{name}</p>
                    </Link>
                  </li>
                  <Link href={"/home"}>
                    <li className="flex gap-1 bg-white ring-blue-600 ring-1 p-1 py-3 rounded-xl">
                      <h3>📭</h3>
                      <p>My Chats</p>
                    </li>
                  </Link>
                  <Link href={"/contacts"}>
                    <li className="flex gap-1 bg-white animate-pulse ring-blue-600 ring-1 p-1 py-3 rounded-xl">
                      <h3>💻</h3>
                      <p>My Contacts</p>
                    </li>
                  </Link>
                  <li className="flex gap-1p-1 m-0 rounded-xl">
                    <button
                      onClick={() => {
                        logout();
                      }}
                      className="text-xl group overflow-hidden text-black backdrop-blur-3xl p-2 ml-auto transition-all:easy duration-300 hover:cursor-pointer  ring-2 ring-gray-400 relative rounded-xl"
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
