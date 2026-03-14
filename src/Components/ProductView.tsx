import { useEffect, useState } from "react";
import { ItemType } from "../Api/DataTypes";
import { useSaves, HOST, DEV } from "../Api/STORE";
import ZoomIn from "../assets/Icons/full-screen.png";
import { useNavigate, useNavigation } from "react-router";
import BackIcon from "../assets/Icons/Back.png";
import ExitFullViewIcon from "../assets/Icons/Cancel.png";
import "../assets/Styles/ProductView.css";
import tempImage from "../assets/Icons/Animated/loadingAnim.gif";
import colorPalatteIcon from "../assets/Icons/Colors.png";
import { PricePresentation } from "../Api/ServerFunctions";
const ImagePath = HOST + `${DEV ? "" : "public/"}Images/`;
import unFavouriteIcon from "../assets/Icons/HeartOpen.png";
import FavouriteIcon from "../assets/Icons/HearlLove.png";
import addCartIcon from "../assets/Icons/cart.png";
import ArrowIcon from "../assets/Icons/Arrow2.png";
import { useCards } from "../Api/STORE";
export default function ItemView() {
  const { OnProduct }: { OnProduct: ItemType } = useSaves();
  const [Item, setItem] = useState<ItemType>(OnProduct);
  useEffect(() => {
    setItem(OnProduct);
    console.log("read done!!");
    if (OnProduct) {
    }
  }, [OnProduct]);

  const NavigateTo = useNavigate();

  if (Item === undefined) {
    window.location.href = "/";
  }

  const [activePreview, setActivePreview] = useState(0);
  const [SeeFullPreview, setSeeFullPreview] = useState(false);
  const { DroneCards } = useCards();
  const MonthsNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const screenSize = window.window.innerWidth;
  let CapLimit = 10;
  if (screenSize < 1500) {
    CapLimit = 8;
  }
  if (screenSize < 1200) {
    CapLimit = 6;
  }
  function DeliveryCalculator() {
    const dt = new Date();
    const Y = dt.getFullYear();
    const M = dt.getMonth();
    const D = dt.getDate();
    const Month = MonthsNames[M];
    console.log(Month);

    if (D < 28) {
      if (M === 1) {
        return `${2} ${MonthsNames[M + 1]} ${Y}`;
      }
      return `${D + 3} ${Month} ${Y}`;
    } else {
      if (M === 11) {
        return `${1} ${MonthsNames[0]} ${Y + 1}`;
      }
      return `${1} ${MonthsNames[M + 1]} ${Y}`;
    }

    return ``;
  }

  return (
    <section className="ProductsContainer">
      <div className="ProductHeader">
        <button
          onClick={() => NavigateTo("/")}
          className="productBackBtn font6"
        >
          <img src={BackIcon} className="backProductIcon" alt="" />
          BACK
        </button>
        <div className="MainProductBox">
          <div className="GroupPreviews">
            <div className="sideImages">
              <img
                draggable={false}
                onClick={() => setActivePreview(0)}
                src={Item ? `${ImagePath + Item.images[0]}` : tempImage}
                className="prevSideImg prevImage1"
              />
              <img
                draggable={false}
                onClick={() => setActivePreview(1)}
                src={Item ? `${ImagePath + Item.images[1]}` : tempImage}
                className="prevSideImg prevImage2"
              />
              <img
                draggable={false}
                onClick={() => setActivePreview(2)}
                src={Item ? `${ImagePath + Item.images[2]}` : tempImage}
                className="prevSideImg prevImage3"
              />
            </div>
            {SeeFullPreview ? undefined : (
              <div
                onClick={() => setSeeFullPreview(true)}
                className="mainPreviewBox"
              >
                <img src={ZoomIn} className="ZoomImageIcon" />
                <img
                  draggable={false}
                  src={
                    Item
                      ? `${ImagePath + Item.images[activePreview]}`
                      : tempImage
                  }
                  className="MainPreviewImg "
                />
              </div>
            )}
            {SeeFullPreview ? (
              <div className="FullImageBox">
                <button
                  onClick={() => setSeeFullPreview(false)}
                  className="exitFullViewBtn"
                >
                  <img
                    src={ExitFullViewIcon}
                    className="ExitFullViewIcon"
                    alt=""
                  />
                </button>
                <div className="FullViewButtons">
                  <button
                    onClick={() =>
                      setActivePreview(
                        activePreview == 0 ? 2 : activePreview - 1,
                      )
                    }
                    className="PrevPreviewButton activePrevChangeButton"
                  >
                    <img src={ArrowIcon} />
                  </button>
                  <button
                    onClick={() =>
                      setActivePreview(
                        activePreview == 2 ? 0 : activePreview + 1,
                      )
                    }
                    className="NextPreviewButton activePrevChangeButton"
                  >
                    <img
                      style={{ transform: "rotate(180deg)" }}
                      src={ArrowIcon}
                    />
                  </button>
                </div>
                <img
                  draggable={false}
                  onClick={() => setActivePreview(0)}
                  src={
                    Item
                      ? `${ImagePath + Item.images[activePreview]}`
                      : tempImage
                  }
                  className="FullImageShow "
                />
              </div>
            ) : undefined}
          </div>

          <div className="InfoAndPriceContainer">
            <div className="PreviewInfoBox">
              <p className="productName font6">{Item.name}</p>
              <p className="modelName font5">Model: {Item.model}</p>
              <div className="descriptionBox">
                <p className="descriptionLabel font3">Description:</p>
                <p className="productDescription font3">{Item.description}</p>
              </div>
              <div className="colorsContainer">
                <p className="colorsTittle font3">Available colours:</p>
                <div className="ColorAssorted">
                  <img src={colorPalatteIcon} alt="" />
                  <div className="colorsAvailableBox">
                    {Item.colors.map((color) => (
                      <div className="colorNamePair">
                        <div
                          className="colorAvailable"
                          style={{ background: `${color}` }}
                        ></div>
                        <p className="colorName font3">{color.toUpperCase()}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="subinfoBox">
                <div className="featuresBox">
                  <p className="featuresTittle font3">FEATURES:</p>
                  <div className="featuresList">
                    {Item.features.map((feature) => {
                      return <p className="featureName font3">•{feature}</p>;
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="ActionContainer">
              <div className="MonetizeBox">
                <div className="PricesPair">
                  {
                    <p className="ProductPrice font5">
                      {PricePresentation(
                        Item.sale > 0
                          ? Item.price - (Item.sale / 100) * Item.price
                          : Item.price,
                      )}
                    </p>
                  }
                  {Item.sale > 0 ? (
                    <p className="OriginalPriceTag font2">
                      {PricePresentation(Item.price)}
                    </p>
                  ) : undefined}
                </div>
                {Item.sale > 0 ? (
                  <div className="saveBox">
                    <p className="theSaleOff font2">{Item.sale}% OFF </p>
                    <p className="SaveAmmount font2">
                      SAVE {PricePresentation((Item.sale / 100) * Item.price)}
                    </p>
                  </div>
                ) : undefined}
                <div className="actionBuyBox">
                  <div className="EstimationBox">
                    <p className="estimatedDeliveryTittle font5">
                      Delivery By:
                    </p>
                    <p className="estimatedDeliveryDate font6">
                      {DeliveryCalculator()}
                    </p>
                  </div>
                  <button className="addToFavs font5">
                    <img src={FavouriteIcon} className="favIconAct" />
                    Add to Favourites
                  </button>
                  <button className="addToCart">
                    <img src={addCartIcon} className="addCartIcon" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="AlsoLikeContainer">
          <p className="youmayText font3">You may also like:</p>
          <div className="moreRecommedsBox">
            {DroneCards.slice(8, 8 + CapLimit)}
          </div>
        </div>
      </div>
    </section>
  );
}
