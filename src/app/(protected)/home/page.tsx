"use client";
import Chat from "@/components/Сhat/Chat";
import CompanionSection from "@/components/Сhat/CompanionSection";
import IncomingMessage from "@/components/Сhat/IncomingMessage";
import OutgoingMessage from "@/components/Сhat/OutgoingMessage";
import { useChatStore } from "@/store/chatStore";
import useAuthUser from "@/store/currentUser";
import { Message } from "@/types/Message";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type chat = {
  name: string;
  messages: Message[];
  chatAvatar: string;
};

const HomePage = () => {
  const { email } = useAuthUser();
  const userReschRef = useRef<HTMLInputElement | null>(null);
  const [userSearchFocused, setUserSearchFocused] = useState<boolean>(false);
  const { addMessage, setCurrentChat, currentChat, messages } = useChatStore();
  const [userChats, setUserChats] = useState<[chat] | null>(null);
  const [searchingUsers, setSearchingUsers] = useState<
    [{ name: string; avatarURL: string; id: string }] | null
  >(null);

  const wsRef = useRef<WebSocket | null>(null);

  async function userSearchChats(input: string) {
    if (!input.trim()) {
      setSearchingUsers(null);
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:2000/users?name=${encodeURIComponent(input)}`
      );

      if (!res.ok) {
        console.error("Ошибка запроса:", res.statusText);
        return;
      }

      const data = await res.json();
      setSearchingUsers(data);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:4001");

    wsRef.current = ws;

    const token = String(localStorage.getItem("token"));

    ws.onopen = () => {
      ws.send(JSON.stringify(token));
      console.log(token);
      console.log("Connected to Chat websocket ");
    };

    ws.onmessage = (message) => {
      const newMessage: Message = JSON.parse(message.data);
      addMessage(newMessage);
    };

    ws.onclose = () => {
      console.log("Connection closed");
    };
    async function getChatsForRender() {
      const chats = await getChats();
      setUserChats(chats);
    }

    getChatsForRender();

    return () => {
      ws.close();
    };
  }, []);

  function sendMessageToServer(message: Message) {
    wsRef.current?.send(JSON.stringify(message));
  }

  function sendMessage(message: Message) {
    addMessage(message);
    sendMessageToServer(message);
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

  async function getChats() {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:2000/chat", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        console.error(res.statusText);
      }

      const result = await res.json();

      return result;
    } catch (e) {
      console.error(`New error fetch chat data`, e);
    }
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
              <div className=" z-10 sm:top-2 not-sm:hidden left-2 sm:w-[90%] flex justify-center absolute ">
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
                      ref={userReschRef}
                      onChange={(e) => {
                        userSearchChats(e.currentTarget.value);
                      }}
                    />
                  </div>
                </motion.div>
              </div>
              <div
                className={`sm:pt-14 relative flex-col not-sm:overflow-y-hidden pb-1 not-sm:h-full no-scroll border-1 rounded-2x border-blue-600 border-t-0 not-sm:overflow-x-scroll overflow-x-scroll h-full max-h-[100%] bg-white flex sm:flex-col sm:font-semibold sm:text-xl text-gray-600 `}
              >
                <div className="p-5 sm:hidden"></div>
                <div className="sm:hidden fixed h-10 p-1">
                  <motion.div
                    initial={{ x: -200 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 1 }}
                    className="h-full"
                  >
                    <div
                      className={`flex items-center gap-4 p-1 sm:gap-3 ${
                        userSearchFocused &&
                        "outline-blue-600 blur-none shadow-xl shadow-blue-300 "
                      } rounded-2xl not-sm:w-[100%] w-full h-full transition-all bg-white outline-1 overflow-hidden duration-500`}
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
                <div className="sm:flex-col flex">
                  {searchingUsers ? (
                    searchingUsers.map((contact) => {
                      return (
                        <div
                          onClick={() => setCurrentChat(contact.id)}
                          key={contact.name}
                          className="1 transition-all duration-100 relative flex not-sm:px-2 gap-2 not-sm:max-h-[100%] sm:h-20 not-last:border-b-[1px] wrap-anywhere first:border-t-[1px]  not-sm:h-full md:p-2 not-sm:flex  not-sm:flex-col items-center sm:flex hover:cursor-pointer hover:bg-purple-300/15 border-blue-200/40"
                        >
                          <div className="relative sm:w-16 not-sm:mb-0 sm:h-16 w-16 h-14 shrink-0 rounded-full overflow-hidden ">
                            <Image
                              src={"http://localhost:4000" + contact.avatarURL}
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
                    })
                  ) : userChats ? (
                    userChats.map((contact) => {
                      return (
                        <div
                          onClick={() => setCurrentChat("id")}
                          key={contact.name}
                          className=" transition-all duration-100 relative flex not-sm:px-2 gap-2 not-sm:max-h-[100%] sm:h-20 not-last:border-b-[1px] wrap-anywhere first:border-t-[1px]  not-sm:h-full md:p-2 not-sm:flex  not-sm:flex-col items-center sm:flex hover:cursor-pointer hover:bg-purple-300/15 border-blue-200/40"
                        >
                          <div className="relative sm:w-16 not-sm:mb-0 sm:h-16 w-16 h-14 shrink-0 rounded-full overflow-hidden ">
                            <Image
                              src={"http://localhost:4000" + contact.chatAvatar}
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
                    })
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            </div>
            <div className="relative not-sm:h-[80%] w-full h-[100%] ">
              <div className="h-[100%] sm:pt-12 w-full overflow-hidden custom-scroll pb-20 rounded-none chat_bg overflow-y-scroll">
                {!currentChat ? (
                  <div className="text-2xl font-semibold text-center mt-[20%]">
                    {" "}
                    Choose chat pls{" "}
                  </div>
                ) : (
                  messages.map((el, i) => {
                    {
                      return el.from === email ? (
                        <OutgoingMessage message={el} isMerge={isMerge(i)} />
                      ) : (
                        <IncomingMessage message={el} isMerge={isMerge(i)} />
                      );
                    }
                  })
                )}

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
