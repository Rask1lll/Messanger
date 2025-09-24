import { Message } from "@/types/Message";
import { User } from "@/types/User";
import { create } from "zustand";

interface currentChat {
  currentChat: string;
  companion: User;
  messages: Message[];
  addMessage: (message: Message) => void;
  setCompanion: (companion: User) => void;
  setNewChat: (newMessages: Message[]) => void;
  setCurrentChat: (newChatId: string) => void;
}
export const useChatStore = create<currentChat>()((set) => ({
  currentChat: "",
  setCurrentChat: (id) => set({ currentChat: id }),
  companion: {
    email: "Sobes@gmail.com",
    avatarURL: "/next.svg",
    name: "TempUser",
    description: "",
    createdAt: "21-21-2-212",
  },
  messages: [],
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  setCompanion: (newCompanion) => set({ companion: newCompanion }),
  setNewChat: (newMessages) => set({ messages: newMessages }),
}));
