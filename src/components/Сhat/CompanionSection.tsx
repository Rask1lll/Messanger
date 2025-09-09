import { useChatStore } from "@/store/chatStore";
import Image from "next/image";

export default function CompanionSection() {
  const { companion } = useChatStore();
  return (
    <div
      className={`flex gap-7 box-border h-full px-8 items-center  border-[3px] border-gray-300 rounded-t-4xl `}
    >
      <div>
        <Image
          src={companion.avatarURL || "/next.svg"}
          alt=""
          width={100}
          height={100}
          quality={100}
          className="rounded-4xl object-cover p-3 bg-gray-100"
        />
      </div>
      <div className="flex-col flex gap-2">
        <span className="text-xl">{companion.email}</span>
        <span className="text-sm opacity-70">Registered since 1980</span>
      </div>
    </div>
  );
}
