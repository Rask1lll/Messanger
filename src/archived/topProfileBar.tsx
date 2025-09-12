import ProfileBar from "@/components/navigation/ProfileBar";

function TopProfile() {
  return (
    <div className="not-sm:hidden">
      <div className="flex box-border items-center mb-2 p-3 px-3 pr-6 rounded-4xl justify-between ">
        <ProfileBar></ProfileBar>
        <button
          onClick={() => {}}
          className="text-xl p-3 h-[80%] px-5 hover:bg-red-900 transition-all:easy duration-300 hover:cursor-pointer bg-[rgba(255,0,0,0.55)] ring-1 ring-red-600 text-white rounded-xl"
        >
          LogOut
        </button>
      </div>
    </div>
  );
}
