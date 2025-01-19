import { create } from "zustand";
import { User } from "@/app/models/models";

export const userStore = create<{
  user: User | null;
  setUser: (newUser: User) => void;
}>((set) => ({
  user: null,
  setUser: (newUser: User) => set({ user: newUser }),
}));
