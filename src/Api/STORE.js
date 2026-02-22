import { create } from "zustand";
export const DEV = true 
export const HOST =DEV? "http://localhost:3000/":"https://flydronesserver.netlify.app/"

export const useOnPage = create((set) => ({
  OnPage: "home",
  goMenu: () => set(() => ({ onPage: "menu" })),
  goAuth: () => set(() => ({ onPage: "menu" })),
}));


import DevProfilePic from "../assets/Pictures/DevProfilePic.png"
export const userDev= {
  email: "zakhenet@gmail.com",
  email_verified: true,
  family_name: "Santa",
  given_name: "Hero",
  name: "Hero Santa",
  nickname: "BadSanta",
  picture:DevProfilePic,
  sub: "google-oauth2|109627211575636290129",
  updated_at: "2026-02-21T15:19:16.992Z",
}
