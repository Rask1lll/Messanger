import { useLogout } from "@/utils/useLogout";
import ProfileBar from "./ProfileBar";

export default function NavBar() {
  const logout = useLogout();
  return (
    <div className="flex items-center ring-1 mb-2 p-3 px-3 pr-6 ring-gray-400 rounded-4xl justify-between ">
      <ProfileBar></ProfileBar>
      <button
        onClick={() => {
          logout();
        }}
        className="text-xl p-3 h-[60%] px-5 hover:bg-red-400 transition-all:easy duration-300 hover:cursor-pointer bg-red-600 text-white rounded-xl"
      >
        LogOut
      </button>
    </div>
  );
}
