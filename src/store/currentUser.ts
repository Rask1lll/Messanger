import { create } from "zustand";
// store/currentUser.ts
import { User } from "@/types/User";
import { persist } from "zustand/middleware";

interface AuthActions extends User {
  setEmail: (email: string | null) => void;
  clearEmail: () => void;
  setUserName: (newname: string) => void;
  setAvatarURL: (url: string | null) => void;
  setUserDesc: (newDesc: string) => void;
  reset: () => void;
  resetAll: () => void;
  setCreatedAt: (s: string) => void;
}

const initialState: User = {
  name: "",
  email: null,
  avatarURL: null,
  description: "",
  createdAt: "",
};

const useAuthUser = create<AuthActions>()(
  persist(
    (set, get) => ({
      ...initialState,
      setCreatedAt: (s: string) => set({ createdAt: s }),
      setEmail: (email) => set({ email }),
      clearEmail: () => set({ email: null }),
      setAvatarURL: (url) => set({ avatarURL: url }),
      setUserName: (newname) => set({ name: newname }),
      setUserDesc: (newDesc) => set({ description: newDesc }),
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
