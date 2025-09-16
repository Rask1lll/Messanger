import { create } from "zustand";

interface alert {
  message: string;
  isSecure: boolean;
  setMessage: (newMessage: string) => void;
  clearMessage: () => void;
  setIsSecure: (t: boolean) => void;
}

const useAlertStore = create<alert>()((set) => ({
  message: "",
  isSecure: true,
  setIsSecure: (a) => set({ isSecure: a }),
  setMessage: (newMessage) =>
    set({
      message: newMessage,
    }),
  clearMessage: () => set({ message: "" }),
}));

export default useAlertStore;
