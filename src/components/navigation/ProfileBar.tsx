import useAuthUser from "@/store/currentUser";
import Image from "next/image";
import Link from "next/link";

export default function ProfileBar() {
  const { email, avatarURL } = useAuthUser();
  return (
    <Link
      href={"profile"}
      className="group z-10 relative rounded-2xl overflow-hidden sm:ring-2 ring-blue-200"
    >
      <div className="absolute w-full h-full flex items-center justify-center -z-20">
        <div className="group-hover:w-[100%] bg-blue-100 duration-300  w-[0px]  h-[100%]"></div>
      </div>
      <div className=" flex items-center gap-2   p-1">
        <div className="  overflow-hidden">
          <div className="w-14 h-14 bg-white rounded-full overflow-hidden relative">
            <Image src={avatarURL || ""} fill alt="object-fit" />
          </div>
        </div>

        <p className="sm:text-lg text-sm font-medium ">{email}</p>
      </div>
    </Link>
  );
}
