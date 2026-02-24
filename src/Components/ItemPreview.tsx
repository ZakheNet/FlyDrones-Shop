import "../assets/Styles/Item.css";
const test = "/src/assets/Drones/1/1.webp";
/* import BackgroundFeatured from "../assets/Backgrounds/Banner5.webp";
import BackgroundSearch from "../assets/Backgrounds/Banner2.webp";
import BackgroundOnSale from "../assets/Backgrounds/Banner5.webp";
import BackgroundAllView from "../assets/Backgrounds/Banner2.webp";
import BackgroundGeneric from "../assets/Backgrounds/Banner2.webp"; */
import SaleIcon from "../assets/Icons/Sale.png";

import { ItemType } from "../Api/DataTypes";
import { HOST, DEV } from "../Api/STORE";

const ImagePath = HOST + `${DEV ? "" : "public/"}Images/`;

export type PreviewType = "FeaturedDrone" | "AllDrones" | "OnSale" | "Search";

export default function ItemPreview({
  item,
  itemFrom,
}: {
  itemFrom: PreviewType;
  item: ItemType;
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



  return (
    <div className="ItemCard">
      {item.sale>0?<img src={SaleIcon} alt="" className="saleIcon" />:undefined}
      <div className="ItemPrevBody">
        
        <img className="previewImage" src={`${ImagePath + item.images[0]}`} />
        {item.sale>0?<p className="saleAmount">{item.sale}% Off</p>:undefined}
        <p className="itemName">{item.name}</p>
        <div className="ItemFeatures">
          <p className="featureText">Feature 1 </p>
          <p className="featureText">Some other</p>
        </div>
        <div className="detailBox">
          <div className="priceBox">
            <p className="itemPrice">
              {item.sale === 0
                ? PricePresentation(item.price)
                : PricePresentation((item.price - (item.sale / 100) * item.price))}
            </p>
            <p className="discounted">
              {item.sale > 0 ? PricePresentation(item.price) : undefined}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
