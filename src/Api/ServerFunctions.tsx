import { HOST } from "./STORE";
import { ItemType } from "./DataTypes";
import { useAuth0 } from "@auth0/auth0-react";
import { DEV, userDev } from "./STORE";
import { useDATA, useProfile } from "./STORE";
import { useEffect } from "react";
import { userType } from "./DataTypes";

export async function SetFavourite(itemID: string,user:userType|undefined) {
    if(user || DEV){
        const res = await fetch(HOST + "server", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                task: "like",
                item:itemID,
                userID:user?.sub,
                name: user?.given_name || user?.nickname,
            }),
        });
        if(res.status===200){
           /*  UpdateUserData() */
        }
    }
}

export async function SetNotFavourite(itemID: string,user:userType|undefined) {
    if(user || DEV){
        const res = await fetch(HOST + "server", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                task: "unlike",
                item:itemID,
                userID:user?.sub,
                name: user?.given_name || user?.nickname,
            }),
        });
        if(res.status===200){
           /*  UpdateUserData() */
        }
    }
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
            setFavourites(data.userProfile.favourites)
          }
        }
      }
    } catch {}
  }, []);
}
