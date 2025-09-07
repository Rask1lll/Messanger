// store/currentUser.ts
import { User } from "@/types/User";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthActions extends User {
  setEmail: (email: string | null) => void;
  clearEmail: () => void;
  setAvatarURL: (url: string | null) => void;
  reset: () => void;
  resetAll: () => void;
}

const initialState: User = { email: null, avatarURL: null };

const useAuthUser = create<AuthActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      setEmail: (email) => set({ email }),
      clearEmail: () => set({ email: null }),
      setAvatarURL: (url) => set({ avatarURL: url }),

      reset: () => set({ ...initialState }),

      resetAll: () => {
        localStorage.removeItem("token");
        useAuthUser.persist?.clearStorage?.();
        get().reset();
      },
    }),
    {
      name: "User",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        email: state.email,
        avatarURL: state.avatarURL,
      }),
    }
  )
);

export default useAuthUser;
