export default function ProfileActions({
  em = "",
  content,
}: {
  em: string;
  content: string;
}) {
  return (
    <div
      className={`min-w-50 hover:scale-105 text-white nth-[4]:text-black nth-[4]:bg-red-200/55 hover:cursor-pointer transition-all ring-blue-200 duration-150 rounded-2xl nth-[4]:ring-[#f08181]  nth-[2]:bg-blue-300/80 nth-[3]:bg-cyan-300/70 nth-[1]:bg-[#387effab] 300 p-5 inset-shadow-xs  ring-2 w-full`}
    >
      <div className=" text-xl font-semibold flex gap-3 items-center">
        <p className="text-2xl">{em}</p>
        <p>{content}</p>
      </div>
    </div>
  );
}
