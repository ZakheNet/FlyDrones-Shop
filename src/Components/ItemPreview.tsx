import "../assets/Styles/Item.css";
const test = "/src/assets/Drones/1/1.webp";
/* import BackgroundFeatured from "../assets/Backgrounds/Banner5.webp";
import BackgroundSearch from "../assets/Backgrounds/Banner2.webp";
import BackgroundOnSale from "../assets/Backgrounds/Banner5.webp";
import BackgroundAllView from "../assets/Backgrounds/Banner2.webp";
import BackgroundGeneric from "../assets/Backgrounds/Banner2.webp"; */
import SaleIcon from "../assets/Icons/Sale.png"

import { HOST, DEV } from "../Api/STORE";


const ImagePath = HOST + `${DEV ? "" : "public/"}Images/`;

export type ItemType = "FeaturedDrone" | "AllDrones" | "OnSale" | "Search";

export default function ItemPreview({
  image,
  name,
  price,
  itemFrom,
}: {
  itemFrom: ItemType;
  image: string;
  name: string;
  price: number;
}) {
  /*    function GetBackground(from:ItemType){
        switch (from) {
            case "AllDrones": return BackgroundAllView
            case "FeaturedDrone": return BackgroundFeatured
            case "OnSale": return BackgroundOnSale
            case "Search": return BackgroundSearch
            default:return BackgroundGeneric
        }
    } */

  function PricePresentation(price: number) {
    let newPrice = "R0";
    const ammount = price * 16;
    newPrice = ammount.toString();
    if (ammount.toString().length > 3) {
      newPrice =
        newPrice.slice(0, newPrice.length - 3) +
        " " +
        newPrice.slice(newPrice.length - 3);
    }

    return "R" + newPrice;
  }

  const priceView = PricePresentation(price);

  return (
    <div className="ItemCard">
      <img src={SaleIcon} alt="" className="saleIcon" />
      <div className="ItemPrevBody">
        <img className="previewImage" src={`${ImagePath + image}`} />
        <p className="itemName">{name}</p>
        <div className="detailBox">
          <div className="priceBox">
            <p className="itemPrice">{priceView}</p>
            <p className="discounted">{}4556</p>
          </div>
        </div>
      </div>
    </div>
  );
}
