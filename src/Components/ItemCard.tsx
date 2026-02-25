import "../assets/Styles/Item.css";
const test = "/src/assets/Drones/1/1.webp";
import SaleIcon from "../assets/Icons/Sale.png";
import LikedIcon from "../assets/Icons/HearlLove.png";
import unLikedIcon from "../assets/Icons/HeartOpen.png";
import { SetFavourite, SetNotFavourite } from "../Api/ServerFunctions";

import { ItemType, PreviewType } from "../Api/DataTypes";
import { HOST, DEV, useDATA, useProfile, userDev } from "../Api/STORE";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const ImagePath = HOST + `${DEV ? "" : "public/"}Images/`;

export default function ItemPreview({
  item,
  itemFrom,
}: {
  itemFrom: PreviewType;
  item: ItemType;
}) {
  function PricePresentation(price: number) {
    let newPrice = "R0";
    const ammount = (price * 16).toFixed();
    newPrice = ammount.toString();
    if (ammount.toString().length > 3) {
      newPrice =
        newPrice.slice(0, newPrice.length - 3) +
        " " +
        newPrice.slice(newPrice.length - 3);
    }

    return "R" + newPrice;
  }

  const { favourites } = useProfile();
  const { user, isAuthenticated,loginWithRedirect } = useAuth0();

  const [isFavourite, setIsFavourite] = useState(favourites.includes(item.id));

  function HandleLike() {
    if (isAuthenticated || DEV) {
      if (user || DEV) {
          setIsFavourite(!isFavourite);
        if (isFavourite) {
          SetNotFavourite(item.id, DEV ? userDev : user);
        } else {
          SetFavourite(item.id, DEV ? userDev : user);
        }
      }
      else{
        loginWithRedirect()
      }
    }
  }

  return (
    <div className="ItemCard">
      {item.sale > 0 ? (
        <img src={SaleIcon} alt="" className="saleIcon" />
      ) : undefined}

      <button
        onClick={() => {
          HandleLike();
        }}
        className="LikeButton"
      >
        <img
          src={isFavourite ? LikedIcon : unLikedIcon}
          alt=""
          className="likeIcon"
        />
      </button>

      <div className="ItemPrevBody">
        <div className="ImagePrevBox">
          <img className="previewImage" src={`${ImagePath + item.images[0]}`} />
          {item.sale > 0 ? (
            <p className="saleAmount">{item.sale}% Off</p>
          ) : undefined}
        </div>

        <p className="itemName font5">{item.name}</p>
        <div className="ItemFeatures">
          {item.features[0] && item.features[0].length < 15 ? (
            <p className="featureText">{item.features[0]}</p>
          ) : undefined}
          {item.features[1] && item.features[1].length < 15 ? (
            <p className="featureText">{item.features[1]}</p>
          ) : undefined}
        </div>
        <p
          className={`inStock font5 ${item.remaining > 10 ? undefined : "lowStock"}`}
        >
          {item.remaining > 10
            ? "IN STOCK"
            : item.remaining < 1
              ? "Out of stock"
              : "ONLY " + item.remaining + " LEFT"}
        </p>
        <div className="detailBox">
          <div className="priceBox">
            <p className="itemPrice font6">
              {item.sale === 0
                ? PricePresentation(item.price)
                : PricePresentation(
                    item.price - (item.sale / 100) * item.price,
                  )}
            </p>
            <p className="discounted font6">
              {item.sale > 0 ? PricePresentation(item.price) : undefined}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
