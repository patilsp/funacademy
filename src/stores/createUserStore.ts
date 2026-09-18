import dayjs from "dayjs";
import type { BoundStateCreator } from "~/hooks/useBoundStore";

export type UserSlice = {
  name: string;
  username: string;
  joinedAt: dayjs.Dayjs;
  loggedIn: boolean;
  email: string;
  pictureUrl: string;
  setName: (name: string) => void;
  setUsername: (username: string) => void;
  setEmail: (email: string) => void;
  setPictureUrl: (pictureUrl: string) => void;
  logIn: () => void;
  logOut: () => void;
};

export const createUserSlice: BoundStateCreator<UserSlice> = (set) => ({
  name: "",
  username: "",
  joinedAt: dayjs(),
  loggedIn: false,
  email: "",
  pictureUrl: "",
  setName: (name: string) => set(() => ({ name })),
  setUsername: (username: string) => set(() => ({ username })),
  setEmail: (email: string) => set(() => ({ email })),
  setPictureUrl: (pictureUrl: string) => set(() => ({ pictureUrl })),
  logIn: () => set(() => ({ loggedIn: true })),
  logOut: () => set(() => ({ loggedIn: false })),
});
