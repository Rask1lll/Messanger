import useAuthUser from "@/store/currentUser";
import Image from "next/image";
import Link from "next/link";

export default function ProfileBar() {
  const { email, avatarURL } = useAuthUser();
  return (
    <div className=" flex items-center gap-2 sm:ring-2 ring-amber-300 rounded-2xl p-1">
      <div className=" bg-white  overflow-hidden">
        <div className="w-14 h-14 bg-white rounded-full overflow-hidden relative">
          <Link href={"profile"}>
            <Image src={avatarURL || ""} fill alt="object-fit" />
          </Link>
        </div>
      </div>

      <p className="sm:text-lg text-sm font-medium ">{email}</p>
    </div>
  );
}
