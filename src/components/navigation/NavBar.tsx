import { useLogout } from "@/utils/useLogout";

export default function NavBar() {
  const logout = useLogout();
  return (
    <div className="flex justify-end mr-[2%]">
      <button
        onClick={() => {
          logout();
        }}
        className="p-3 px-5 hover:bg-red-400 transition-all:easy duration-300 hover:cursor-pointer bg-red-600 text-white rounded-xl mb-3"
      >
        LogOut
      </button>
    </div>
  );
}
