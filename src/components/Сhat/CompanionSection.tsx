import { useChatStore } from "@/store/chatStore";
import Image from "next/image";
import NavBar from "../navigation/NavBar";

export default function CompanionSection() {
  const { companion } = useChatStore();
  return (
    <div
      className={`flex justify-between box-border h-full  border-[1px] border-blue-600 rounded-b-none rounded-4xl `}
    >
      <div className="flex md:px-8 px-2 items-center gap-7">
        <div className="relative not-sm:w-15 not-sm:h-15 w-20 h-20 rounded-full overflow-hidden ">
          <Image src={"/ava.jpg"} alt="" fill className="" />
        </div>
        <div className="flex-col flex gap-2">
          <span className="text-xl">{companion.email}</span>
          <span className="text-sm opacity-70">Registered since 1980</span>
        </div>
      </div>

      <div className="min-[600px]:mt-10 mt-5 mr-6">
        <NavBar />
      </div>
    </div>
  );
}
