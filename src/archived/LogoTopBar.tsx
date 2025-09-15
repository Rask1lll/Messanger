import Image from "next/image";
import Link from "next/link";

export default function LogoTopBar() {
  return (
    <Link href={"/home"}>
      <div className="flex sm:pr-7 items-center max-h-full not-sm:p-1 text-xl gap-3 font-semibold bg-blue-300 rounded-2xl p-2 text-gray-500">
        <Image
          src={"/logo.png"}
          width={0}
          height={0}
          alt=""
          quality={100}
          className="sm:w-13 w-10 h-10 sm:h-13 object-cover "
          priority
          unoptimized={true}
        ></Image>
        Alem
      </div>
    </Link>
  );
}
