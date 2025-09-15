// store/currentUser.ts
import { User } from "@/types/User";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthActions extends User {
  setEmail: (email: string | null) => void;
  clearEmail: () => void;
  setUserName: (newname: string) => void;
  setAvatarURL: (url: string | null) => void;
  reset: () => void;
  resetAll: () => void;
}

const initialState: User = { name: "", email: null, avatarURL: null };

const useAuthUser = create<AuthActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      setEmail: (email) => set({ email }),
      clearEmail: () => set({ email: null }),
      setAvatarURL: (url) => set({ avatarURL: url }),
      setUserName: (newname) => set({ name: newname }),

      reset: () => set({ ...initialState }),

      resetAll: () => {
        localStorage.removeItem("token");
        useAuthUser.persist?.clearStorage?.();
        get().reset();
      },
    }),
    {
      name: "User",
    }
  )
);

export default useAuthUser;
