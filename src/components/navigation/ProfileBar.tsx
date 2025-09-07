import useAuthUser from "@/store/currentUser";
import Image from "next/image";
import Link from "next/link";

export default function ProfileBar() {
  const { email, avatarURL } = useAuthUser();
  return (
    <div className=" flex items-center gap-5 bg-yellow-200 ring-2 ring-amber-300 rounded-2xl p-1">
      <div className="p-1 bg-white rounded-3xl">
        <div className="w-16 h-16 bg-white rounded-4xl overflow-hidden relative">
          <Link href={"profile"}>
            <Image src={avatarURL || ""} fill alt="object-fit" />
          </Link>
        </div>
      </div>

      <p className="text-lg font-medium">{email}</p>
    </div>
  );
}
