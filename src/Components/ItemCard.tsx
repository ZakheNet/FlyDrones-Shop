import "../assets/Styles/Item.css";
const test = "/src/assets/Drones/1/1.webp";
import SaleIcon from "../assets/Icons/Sale.png";
import LikedIcon from "../assets/Icons/HearlLove.png";
import unLikedIcon from "../assets/Icons/HeartOpen.png";
import StartIcon from "../assets/Icons/StarGold.png";
import { SetFavourite, SetNotFavourite,PricePresentation } from "../Api/ServerFunctions";


import { ItemType, PreviewType } from "../Api/DataTypes";
import {
  HOST,
  DEV,
  useDATA,
  useProfile,
  userDev,
  useSaves
} from "../Api/STORE";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {useLocation,useHref, useNavigate} from "react-router";

const ImagePath = HOST + `${DEV ? "" : "public/"}Images/`;

export default function ItemPreview({
  item,
  itemFrom,
}: {
  itemFrom: PreviewType;
  item: ItemType;
}) {
  const NavigateTo =useNavigate()


  const { favourites } = useProfile();
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const { OnProduct,setOnProduct } = useSaves();

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
      } else {
        loginWithRedirect();
      }
    } else {
      loginWithRedirect();
    }
  }

  function GetStars(drone: ItemType) {
    let totalStars = 0;
    const reviews = drone.reviews.length;
    if (reviews <= 0) {
      return <p className="RateStars font5">0 </p>;
    }
    if (reviews > 0) {
      drone.reviews.forEach((review) => {
        review.stars;
        totalStars += review.stars;
      });
    }

    try {
      const rate = parseFloat((totalStars / reviews).toFixed(1));

      return (
        <div className="rateNumBox">
          {" "}
          <p className="RateStars font5">
            {rate.toString().length == 1 ? rate + ".0" : rate}
          </p>
          <p className="rateNumbers"> ({reviews})</p>
        </div>
      );
    } catch {
      return <p className="RateStars font5">0 (0)</p>;
    }
  }

  async function HandleClick() {
    await setOnProduct(item);
    console.log(OnProduct)
/*     NavigateTo("/Product/"+item.id) */
    
  }

  return (
    <div className="ItemCard">
      <button
        onClick={() => {
          HandleLike();
        }}
        className="LikeButton"
      >
        <img
          draggable={false}
          src={isFavourite ? LikedIcon : unLikedIcon}
          alt=""
          className="likeIcon"
        />
      </button>
      <a className="upperCard" onClick={HandleClick}>
        {item.sale > 0 ? (
          <img draggable={false} src={SaleIcon} alt="" className="saleIcon" />
        ) : undefined}

        <div className="ItemPrevBody">
          <div className="ImagePrevBox">
            <img
              draggable={false}
              className="previewImage"
              src={`${ImagePath + item.images[0]}`}
            />
            {item.sale > 0 ? (
              <p className="saleAmount">{item.sale}% Off</p>
            ) : undefined}

            <div className="itemRating">
              <img draggable={false} src={StartIcon} className="starIcon" />
              {GetStars(item)}
            </div>
          </div>
        </div>
      </a>
      <p className="bottomCard" onClick={HandleClick}>
        <p className="itemName font5">{item.name}</p>
        <div className="ItemFeatures">
          {item.features[0] && item.features[0].length < 15 ? (
            <p className="featureText">{item.features[0]}</p>
          ) : undefined}
          {item.features[1] && item.features[1].length < 15 ? (
            <p className="featureText cardFeature2">{item.features[1]}</p>
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
      </p>
    </div>
  );
}
