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
    name: "reres1res1res1res1res1res1s1",
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
    avatar: "/ava.jpg",
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
    avatar: "/ava.jpg",
  },
  {
    name: "res9",
    avatar: "/ava.jpg",
  },
  {
    name: "res32",
    avatar: "/ava.jpg",
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
  const { email, setAvatarURL, avatarURL } = useAuthUser();
  const [avatar, setAvatar] = useState<string | null>("");
  const avatarRef = useRef<HTMLInputElement | null>(null);
  const [userSearchFocused, setUserSearchFocused] = useState<boolean>(false);
  const { addMessage, messages } = useChatStore();

  const { setMessage } = useAlertStore();

  function sendMessage(message: Message) {
    addMessage(message);
  }

  useEffect(() => {
    chatTail.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [messages]);

  useEffect(() => {
    setAvatar(avatarURL);
  }, [avatarURL]);
  const [contacts, setContacts] = useState<JSX.Element[]>();

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
  let temp;
  function showContacts() {
    temp = re.map((contact) => {
      return (
        <div
          key={contact.name}
          className="not-last:border-b-[1px] gap-2 p-0 py-5 sm:px-5 not-sm:p-5 items-center sm:flex hover:cursor-pointer hover:bg-gray-300 border-blue-200"
        >
          <div className="relative w-20 h-20 shrink-0 rounded-full overflow-hidden ">
            <Image src={contact.avatar} alt="" fill className="object-cover" />
          </div>

          <div className="min-w-0">{contact.name}</div>
        </div>
      );
    });
    setContacts(temp);
  }

  useEffect(() => {
    showContacts();
  }, []);

  return (
    <div className="h-full">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1.0 }}
          transition={{ duration: 1 }}
          className="h-full"
        >
          <div className="h-[15%]">
            <CompanionSection />
          </div>
          <div className=" min-h-0 flex h-[85%] bg-[url('/chat_bg.jpg')]   ">
            <div className="relative max-w-[30%] ">
              <div className=" z-10 top-2 left-2 w-[90%] flex justify-center absolute ">
                <motion.div
                  initial={{ x: -200 }}
                  animate={{ x: 0 }}
                  transition={{ duration: 1 }}
                  className="w-[80%] min-w-[144px]"
                >
                  <div
                    className={`flex items-center px-2 gap-3 ${
                      userSearchFocused &&
                      "outline-blue-600 blur-none shadow-xl shadow-blue-300 "
                    } rounded-2xl  transition-all bg-white outline-1 overflow-hidden duration-500`}
                  >
                    <Image
                      src={"/search_icon.png"}
                      width={25}
                      height={25}
                      alt=""
                    />
                    <input
                      type="text"
                      placeholder="Search chats"
                      className="ring-0 outline-0 py-2"
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
                className={` overflow-x-hidden custom-scroll max-h-[100%] bg-white flex flex-col sm:font-semibold sm:text-xl text-gray-600 border-2 border-r-0 border-t-0 border-blue-300 ${
                  userSearchFocused && "opacity-100"
                } `}
              >
                <div className="p-[10%]" />
                {contacts}
              </div>
            </div>
            <div className="relative  w-[80%] ">
              <div className="h-full pb-20 overflow-y-scroll">
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

              <div className="absolute w-full bottom-[5%]  ">
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
