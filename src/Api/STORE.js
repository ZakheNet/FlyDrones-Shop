import { create } from "zustand";
export const DEV = window.location.href.toString().includes("http://localhost");
export const HOST = DEV
  ? "http://localhost:3000/"
  : "https://flydronesserver.netlify.app/";

export const useOnPage = create((set) => ({
  OnPage: "home",
  goMenu: () => set(() => ({ onPage: "menu" })),
  goAuth: () => set(() => ({ onPage: "menu" })),
}));

import DevProfilePic from "../assets/Pictures/DevProfilePic.png";
export const userDev = {
  email: "zakhenet@gmail.com",
  email_verified: true,
  family_name: "Santa",
  given_name: "Hero",
  name: "Gwen Wonder",
  nickname: "BadSanta",
  picture: DevProfilePic,
  sub: "gwensUserId27 ",
  updated_at: "2026-02-21T15:19:16.992Z",
};

export const useDATA = create(() => ({
  allDrones: [],
  allSales: [],
  allFeatures: [],
}));

export const useProfile = create((set) => ({
  favourites: [],
  cart: [],
  address: {},
  setFavourites: (value) => set(() => ({ favourites: value })),
  setCart: (value) => set(() => ({ cart: value })),
  setAddress: (value) => set(() => ({ address: value })),
}));
