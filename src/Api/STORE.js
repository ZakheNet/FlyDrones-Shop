import { create } from "zustand";
export const DEV = window.location.href.toString().includes("http://localhost");
export const HOST = DEV
  ? "http://localhost:3000/"
  : "https://flydronesserver.netlify.app/";



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


export const useProfile = create((set) => ({
  favourites: [],
  cart: [],
  address: {},
  setFavourites: (value) => set(() => ({ favourites: value })),
  setCart: (value) => set(() => ({ cart: value })),
  setAddress: (value) => set(() => ({ address: value })),
}));

export const useDATA=create((set)=>({
  DATA:undefined,
  setDATA:(data)=>set(()=>({DATA:data}))
}))

export const useCards=create((set)=>({
  DroneCards:[],
  DroneSaleCards:[],
  FeaturedDroneCards:[],
  setDroneCards:(data)=>set(()=>({DroneCards:data})),
  setDroneSaleCards:(data)=>set(()=>({DroneSaleCards:data})),
  setFeaturedDroneCards:(data)=>set(()=>({FeaturedDroneCards:data})),

}))

export const useSaves=create((set)=>({
  OnProduct:undefined,
  setOnProduct:(data)=>set(()=>({OnProduct:data}))
}))