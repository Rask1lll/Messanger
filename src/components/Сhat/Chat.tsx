import { useChatStore } from "@/store/chatStore";
import useAuthUser from "@/store/currentUser";
import { Message } from "@/types/Message";
import Image from "next/image";
import { useRef } from "react";

export default function Chat({
  sendMessage,
}: {
  sendMessage: (message: Message) => void;
}) {
  const { companion } = useChatStore();
  const messageInput = useRef<HTMLInputElement>(null);
  const { email } = useAuthUser();
  function getUserInput() {
    if (messageInput.current) {
      if (!messageInput.current?.value) return;
      const newMessage: Message = {
        from: email || "",
        createdAt: new Date(),
        content: messageInput.current?.value,
        to: companion.email || "",
      };
      sendMessage(newMessage);
      messageInput.current.value = "";
    }
  }

  return (
    <div className="sm:h-[52px] h-[30px] ">
      <div className=" flex min-h-0 justify-center items-center gap-2">
        <div className="bg-blue-100 lg:w-[40%] w-[70%] min-w-[300px] flex p-2 px-3 pl-5 rounded-4xl gap-7">
          <label
            htmlFor="sendFile"
            className=" flex items-center hover:cursor-pointer bg-blue-50 p-2 rounded-full hover:bg-blue-200 transition:colors duration-250 "
          >
            <Image
              src="/file.svg"
              alt="Attach"
              width={40}
              height={40}
              className="text-amber-400"
            />
          </label>
          <input type="file" id="sendFile" className="hidden" />
          <input
            type="text"
            className="outline-0 p-3 px-4 bg-white w-[100%] rounded-2xl"
            placeholder="Write something..."
            ref={messageInput}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                getUserInput();
              }
            }}
          />
          <button
            className="h-full bg-yellow-300 text-2xl p-2 px-4 hover:cursor-pointer hover:bg-amber-200 rounded-full"
            onClick={getUserInput}
          >
            {"✔"}
          </button>
        </div>
      </div>
    </div>
  );
}
