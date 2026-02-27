import { HOST } from "./STORE";
import { DataType, ItemType } from "./DataTypes";
import { useAuth0 } from "@auth0/auth0-react";
import { DEV, userDev } from "./STORE";
import { useDATA, useProfile } from "./STORE";
import { useEffect } from "react";
import { userType } from "./DataTypes";
import { PreviewType } from "./DataTypes";
import ItemCard from "../Components/ItemCard";

export async function SetFavourite(itemID: string, user: userType | undefined) {
  if (user || DEV) {
    const res = await fetch(HOST + "server", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        task: "like",
        item: itemID,
        userID: user?.sub,
        name: user?.given_name || user?.nickname,
      }),
    });
    if (res.status === 200) {
      /*  UpdateUserData() */
    }
  }
}

export async function SetNotFavourite(
  itemID: string,
  user: userType | undefined,
) {
  if (user || DEV) {
    const res = await fetch(HOST + "server", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        task: "unlike",
        item: itemID,
        userID: user?.sub,
        name: user?.given_name || user?.nickname,
      }),
    });
    if (res.status === 200) {
      /*  UpdateUserData() */
    }
  }
}

export async function GetData(setDATA: (x: any) => void) {
  useEffect(() => {
    async function GetData() {
      try {
        const res = await fetch(HOST + "Stock");

        const resData = await res.json();

        setDATA(resData);
      } catch (e) {
        console.log(e);
      }
    }
    GetData();
  }, []);
}

export async function UpdateUserData() {
  const { setFavourites, setCart } = useProfile();
  const { user } = useAuth0();

  useEffect(() => {
    try {
      Update();
      async function Update() {
        const res = await fetch(HOST + "server", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            task: "getProfile",
            name: DEV
              ? userDev.name
              : user?.given_name || user?.nickname || user?.name,
            userID: DEV ? userDev.sub : user?.sub,
          }),
        });
        if (res.status === 200) {
          const data = await res.json();
          if (data.state === "good") {
            setCart(data.userProfile.cart);
            setFavourites(data.userProfile.favourites);
          }
        }
      }
    } catch {}
  }, []);
}

export function MakeCards(
  DATA: DataType,
  setDroneCards: (x: any[]) => void,
  setFeaturedDroneCards: (x: any[]) => void,
  setDroneSaleCards: (x: any[]) => void,
) {
  if (DATA) {
    const preDroneCards = DATA.drones.map((drone: ItemType) => {
      return MakePreview(drone, "AllDrones");
    });
    setDroneCards(preDroneCards);


    const preFeaturedDroneCards = DATA.drones
      .filter((drone: ItemType) => DATA.featuredDrones.includes(drone.id))
      .map((drone: ItemType) => {
        return MakePreview(drone, "FeaturedDrone");
      });
    setFeaturedDroneCards(preFeaturedDroneCards);

    const preSaleDrones = DATA.drones
      .filter((drone: ItemType) => drone.sale > 0)
      .map((drone: ItemType) => {
        return MakePreview(drone, "FeaturedDrone");
      });
    setDroneSaleCards(preSaleDrones);
  }
}

export function MakePreview(item: ItemType, from: PreviewType) {
  return <ItemCard key={item.id} item={item} itemFrom={from} />;
}
