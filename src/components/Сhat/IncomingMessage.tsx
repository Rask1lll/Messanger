import { Message } from "@/types/Message";

export default function IncomingMessage({
  message,
  isMerge,
}: {
  message: Message;
  isMerge: boolean;
}) {
  return (
    <div
      className={`w-full flex justify-start ${
        isMerge ? "py-1" : "py-2"
      } p-4 text-end`}
    >
      <div className="max-w-[70%] sm:max-w-[50%]">
        {!isMerge && (
          <h5 className="font-semibold text-left">{message.from}</h5>
        )}
        <p
          className={`bg-white border- border-blue-600 ${
            isMerge ? `py-2` : "py-3"
          } p-3 text-left wrap-anywhere sm:text-base text-sm flex rounded-2xl`}
        >
          {message.content}
        </p>
        <p className="text-[12px] font-semibold text-left">19:50</p>
      </div>
    </div>
  );
}
