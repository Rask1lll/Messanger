import { Message } from "@/types/Message";

export default function OutgoingMessage({
  message,
  isMerge,
}: {
  message: Message;
  isMerge: boolean;
}) {
  return (
    <div
      className={`w-full flex justify-end ${
        isMerge ? "py-1" : "py-2"
      } p-4 text-end`}
    >
      <div className="flex flex-col items-end max-w-[50%]">
        {!isMerge && <h1 className="font-semibold">{message.from}</h1>}
        <p
          className={`bg-green-400 ${
            isMerge ? `py-2` : "py-3"
          } p-3 max-w-[100%] wrap-anywhere w-fit text-white text-right rounded-2xl`}
        >
          {message.content}
        </p>
        <p className="text-[12px] font-semibold">19:50</p>
      </div>
    </div>
  );
}
