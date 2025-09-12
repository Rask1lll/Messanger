"use client";
import Chat from "@/components/Сhat/Chat";
import CompanionSection from "@/components/Сhat/CompanionSection";
import IncomingMessage from "@/components/Сhat/IncomingMessage";
import OutgoingMessage from "@/components/Сhat/OutgoingMessage";
import useAlertStore from "@/store/alertStore";
import { useChatStore } from "@/store/chatStore";
import useAuthUser from "@/store/currentUser";
import { Message } from "@/types/Message";
import { animate, AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { JSX } from "react/jsx-runtime";
const re = [
  {
    name: "reres1",
    avatar: "/ava.jpg",
  },
  {
    name: "res2",
    avatar: "/ava.jpg",
  },
  {
    name: "res3",
    avatar: "/ava.jpg",
  },
  {
    name: "res4",
    avatar: "/3ava.jpg",
  },
  {
    name: "res5",
    avatar: "/ava.jpg",
  },
  {
    name: "res6",
    avatar: "/ava.jpg",
  },
  {
    name: "res7",
    avatar: "/ava.jpg",
  },
  {
    name: "res8",
    avatar: "/a2va.jpg",
  },
  {
    name: "res9",
    avatar: "/ava.jpg",
  },
  {
    name: "res32",
    avatar: "/av1a.jpg",
  },
  {
    name: "res43",
    avatar: "/ava.jpg",
  },
  {
    name: "res51",
    avatar: "/ava.jpg",
  },
];

const HomePage = () => {
  const { email } = useAuthUser();
  const [userSearchFocused, setUserSearchFocused] = useState<boolean>(false);
  const { addMessage, messages } = useChatStore();

  function sendMessage(message: Message) {
    addMessage(message);
  }

  useEffect(() => {
    chatTail.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [messages]);

  const chatTail = useRef<HTMLDivElement>(null);

  function isMerge(index: number): boolean {
    if (messages.length === 0) return false;
    console.log(messages[index]);

    if (index < 1) {
      return false;
    }
    if (
      messages[index - 1].from === undefined ||
      messages[index].from === undefined
    )
      return false;
    if (messages[index - 1].from === messages[index].from) {
      return true;
    }
    return false;
  }

  return (
    <div className="h-full">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1.0 }}
          transition={{ duration: 1 }}
          className="h-full"
        >
          <div className="sm:h-[15%] h-[10%]">
            <CompanionSection />
          </div>
          <div className="relative not-sm:flex-col flex h-[90%] sm:h-[85%] ">
            <div className="relative min-w-[220px] max-w-full not-sm:h-[20%] sm:max-w-[30%] max-h-full ">
              <div className=" z-10 sm:top-2  left-2 sm:w-[90%] flex justify-center absolute ">
                <motion.div
                  initial={{ x: -200 }}
                  animate={{ x: 0 }}
                  transition={{ duration: 1 }}
                  className="w-[80%] min-w-[144px]"
                >
                  <div
                    className={`flex items-center px-2 gap-1 sm:gap-3 ${
                      userSearchFocused &&
                      "outline-blue-600 blur-none shadow-xl shadow-blue-300 "
                    } rounded-2xl not-sm:w-[70%] transition-all bg-white outline-1 overflow-hidden duration-500`}
                  >
                    <Image
                      src={"/search_icon.png"}
                      width={25}
                      height={25}
                      alt=""
                      className="not-sm:w-5 not-sm:h-5"
                    />
                    <input
                      type="text"
                      placeholder="Search chats"
                      className="ring-0 outline-0 sm:py-2  "
                      onFocus={() => {
                        setUserSearchFocused(true);
                      }}
                      onBlur={() => {
                        setUserSearchFocused(false);
                      }}
                    />
                  </div>
                </motion.div>
              </div>
              <div
                className={`sm:pt-14 pt-5 gap-2 not-sm:overflow-y-hidden pb-1 p-2 no-scroll border-1 rounded-2x border-blue-600 border-t-0 sm:overflow-x-hidden not-sm:overflow-x-scroll overflow-x-scroll h-full max-h-[100%] bg-white flex sm:flex-col sm:font-semibold sm:text-xl text-gray-600 `}
              >
                {re.map((contact) => {
                  return (
                    <div
                      key={contact.name}
                      className="p-1 flex not-sm:px-2 gap-2 card-bg not-sm:max-h-[100%] not-last:border-b-[1px] wrap-anywhere h-[100%]   not-sm:h-full md:p-2 not-sm:flex  not-sm:flex-col items-center sm:flex hover:cursor-pointer hover:bg-gray-300 border-blue-200"
                    >
                      <div className="relative sm:w-16 not-sm:mb-0 sm:h-16 w-14 h-14 shrink-0 rounded-full overflow-hidden ">
                        <Image
                          src={contact.avatar}
                          alt=""
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className=" text-center text-base max-[700px]:text-[16px]">
                        {contact.name}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="relative not-sm:h-[80%] h-[100%] ">
              <div className="h-[100%] sm:pt-12 overflow-hidden custom-scroll pb-20 rounded-none chat_bg overflow-y-scroll">
                {messages.map((el, i) => {
                  {
                    return el.from === email ? (
                      <OutgoingMessage message={el} isMerge={isMerge(i)} />
                    ) : (
                      <IncomingMessage message={el} isMerge={isMerge(i)} />
                    );
                  }
                })}

                <div ref={chatTail} />
              </div>

              <div className="absolute w-full sm:bottom-[3%] bottom-10 ">
                <Chat sendMessage={sendMessage}></Chat>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default HomePage;
