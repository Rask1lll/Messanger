import { create } from "zustand";

interface alert {
  message: string;
  setMessage: (newMessage: string) => void;
  clearMessage: () => void;
}

const useAlertStore = create<alert>()((set) => ({
  message: "",
  setMessage: (newMessage) =>
    set({
      message: newMessage,
    }),
  clearMessage: () => set({ message: "" }),
}));

export default useAlertStore;
