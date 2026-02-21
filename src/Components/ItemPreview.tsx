import "../assets/Styles/Item.css";
const test = "/src/assets/Drones/1/1.webp";
import BackgroundFeatured from "../assets/Backgrounds/Banner5.webp";
import BackgroundSearch from "../assets/Backgrounds/Banner2.webp";
import BackgroundOnSale from "../assets/Backgrounds/Banner5.webp";
import BackgroundAllView from "../assets/Backgrounds/Banner2.webp";
import BackgroundGeneric from "../assets/Backgrounds/Banner2.webp";

export type ItemType ="FeaturedDrone"|"AllDrones"|"OnSale"|"Search"

export default function ItemPreview({
  image,
  name,
  price,
  itemFrom
}: {
    itemFrom:ItemType;
  image: string;
  name: string;
  price: number;
}) {

    function GetBackground(from:ItemType){
        switch (from) {
            case "AllDrones": return BackgroundAllView
            case "FeaturedDrone": return BackgroundFeatured
            case "OnSale": return BackgroundOnSale
            case "Search": return BackgroundSearch
            default:return BackgroundGeneric
        }
    }

    function PricePresentation(price:number){
        let newPrice="R0"
        const ammount = price*16
        newPrice=ammount.toString()
        if(ammount.toString().length>3){
            newPrice=newPrice.slice(0,newPrice.length-3)+" "+newPrice.slice(newPrice.length-3)
        }

        return "R"+newPrice
    }

    const priceView=PricePresentation(price)

  return (
    <div
      style={{ backgroundImage: `url(${GetBackground(itemFrom)})` }}
      className="ItemPreview"
    >
      <h1>{name}</h1>
      <div className="ItemPrevBody">
        <img className="previewImage" src={`${image}`} />
        <div className="detailBox">
          <p className="itemPrice">{priceView}</p>
        </div>
      </div>
    </div>
  );
}
