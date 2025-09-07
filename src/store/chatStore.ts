const message: Message[] = [
  {
    from: "RASSUL",
    content: `
    message:Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid hic nobis tempora optio, tenetur et voluptate sapiente quod accusantium a, distinctio vero rerum quam. Nostrum dolore voluptatum beatae quo iure?`,
    createdAt: new Date(),
    to: "",
  },
  {
    from: "RASSUL",
    content: `
    message:Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid hic nobis tempora optio, tenetur et voluptate sapiente quod accusantium a, distinctio vero rerum quam. Nostrum dolore voluptatum beatae quo iure?`,
    createdAt: new Date(),
    to: "",
  },
  {
    from: "RASSUL",
    content: `
    message:Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid hic nobis tempora optio, tenetur et voluptate sapiente quod accusantium a, distinctio vero rerum quam. Nostrum dolore voluptatum beatae quo iure?`,
    createdAt: new Date(),
    to: "",
  },
  {
    from: "RASSUL",
    content: `
    message:Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid hic nobis tempora optio, tenetur et voluptate sapiente quod accusantium a, distinctio vero rerum quam. Nostrum dolore voluptatum beatae quo iure?`,
    createdAt: new Date(),
    to: "",
  },
  {
    from: "RASSUL",
    content: `
    message:Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid hic nobis tempora optio, tenetur et voluptate sapiente quod accusantium a, distinctio vero rerum quam. Nostrum dolore voluptatum beatae quo iure?`,
    createdAt: new Date(),
    to: "",
  },
  {
    from: "RASSUL",
    content: `
    message:Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid hic nobis tempora optio, tenetur et voluptate sapiente quod accusantium a, distinctio vero rerum quam. Nostrum dolore voluptatum beatae quo iure?`,
    createdAt: new Date(),
    to: "",
  },
  {
    from: "RASSUL",
    content: `
    message:Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid hic nobis tempora optio, tenetur et voluptate sapiente quod accusantium a, distinctio vero rerum quam. Nostrum dolore voluptatum beatae quo iure?`,
    createdAt: new Date(),
    to: "",
  },
  {
    from: "RASSUL",
    content: `
    message:Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid hic nobis tempora optio, tenetur et voluptate sapiente quod accusantium a, distinctio vero rerum quam. Nostrum dolore voluptatum beatae quo iure?`,
    createdAt: new Date(),
    to: "",
  },
  {
    from: "RASSUL",
    content: `
    message:Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid hic nobis tempora optio, tenetur et voluptate sapiente quod accusantium a, distinctio vero rerum quam. Nostrum dolore voluptatum beatae quo iure?`,
    createdAt: new Date(),
    to: "",
  },
  {
    from: "RASSUL",
    content: `
    message:Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid hic nobis tempora optio, tenetur et voluptate sapiente quod accusantium a, distinctio vero rerum quam. Nostrum dolore voluptatum beatae quo iure?`,
    createdAt: new Date(),
    to: "",
  },
  {
    from: "RASSUL",
    content: `
    message:Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid hic nobis tempora optio, tenetur et voluptate sapiente quod accusantium a, distinctio vero rerum quam. Nostrum dolore voluptatum beatae quo iure?`,
    createdAt: new Date(),
    to: "",
  },
  {
    from: "RASSUL",
    content: `
    message:Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid hic nobis tempora optio, tenetur et voluptate sapiente quod accusantium a, distinctio vero rerum quam. Nostrum dolore voluptatum beatae quo iure?`,
    createdAt: new Date(),
    to: "",
  },
];

import { Message } from "@/types/Message";
import { User } from "@/types/User";
import { create } from "zustand";

interface currentChat {
  companion: User;
  messages: Message[];
  addMessage: (message: Message) => void;
  setCompanion: (companion: User) => void;
  setNewChat: (newMessages: Message[]) => void;
}
export const useChatStore = create<currentChat>()((set) => ({
  companion: {
    email: "Sobes@gmail.com",
    avatarURL: "/next.svg",
  },
  messages: message,
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  setCompanion: (newCompanion) => set({ companion: newCompanion }),
  setNewChat: (newMessages) => set({ messages: newMessages }),
}));
