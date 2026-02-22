import ImageA from "../assets/Drones/3/3.webp";
import ImageB from "../assets/Drones/3/3.png";
import HomeVideo from "../assets/Video/HomeVideo.mp4";
import "../assets/Styles/Home.css";
import DroneModel1 from "../assets/Models/DroneModel1.png";
import DroneModel2 from "../assets/Models/DroneModel2.png";
import DroneModel3 from "../assets/Models/DroneModel3.png";
import SearchIcon from "../assets/Icons/SearchLogo.png";
import filterIcon from "../assets/Icons/settings.png";
import ItemPreview from "../Components/ItemPreview";
import ViewAllIcon from "../assets/Icons/drop.png";
import DATA from "../Api/DATA";
import { Features } from "tailwindcss";
import { ItemType } from "../Components/ItemPreview";
import { useAuth0 } from "@auth0/auth0-react";

export default function Home() {
  const { isAuthenticated, isLoading, user, getAccessTokenSilently } =
    useAuth0();

  const AllDrones = DATA.drones.map((drone) => {
    return MakePreview(drone, "AllDrones");
  });
  const FeaturedDrones = DATA.drones.map((drone) => {
    if (DATA.featuredDrones.includes(drone.id.toString())) {
      return MakePreview(drone, "FeaturedDrone");
    } else return undefined;
  });

  function MakePreview(
    item: {
      id: string;
      images: string[];
      name: string;
      price: number;
    },
    from: ItemType,
  ) {
    return (
      <ItemPreview
        itemFrom={from}
        key={item.id}
        image={item.images[0]}
        name={item.name}
        price={item.price}
      />
    );
  }

  return (
    <section className="HomePage">
      <div className="Showcase">
        <div>
          <img
            draggable={false}
            src={DroneModel3}
            alt=""
            className="droneHovering droneModel"
          />
        </div>
      </div>
      <div id="SearchSystem" className="SearchSystem">
        <button className="FilterBar">
          <p>Filter</p>
          <img src={filterIcon} alt="" />
        </button>
        <div className="SearchBar">
          <input type="text" placeholder="Search..." />
          <button className="searchBtn">
            <img src={SearchIcon} alt="" />
            <p className="searchTittle">SEARCH</p>
          </button>
        </div>
      </div>

      <div className="filterMainPair">
        <div className="filterSystem">
          <h1>FILTER</h1>
        </div>
        <section className="MainContent">
          <div className="featured">
            <h1>Featured:</h1>
            <div className="ItemListContainer">{FeaturedDrones}</div>
          </div>
          <div className="OnSale">
            <h1>On Sale Now:</h1>
          </div>
          <div className="CataLogue">
            <div className="centerSpace">
              <h1>Catalogue:</h1>
              <p className="viewAll">
                <img src={ViewAllIcon} alt="" />
                View All
              </p>
            </div>
            <div className="droneCatalogue ItemListContainer">{AllDrones}</div>
          </div>
        </section>
      </div>

      <h1>...</h1>
      <h1>...</h1>
      <h1>...</h1>
      <h1>...</h1>
      <h1>...</h1>
      <h1>...</h1>
      <h1>...</h1>
      <h1>...</h1>
      <h1>...</h1>
      <h1>...</h1>
      <h1>...</h1>
      <h1>...</h1>
      <h1>...</h1>
      <h1>...</h1>
      <h1>...</h1>
      <h1>...</h1>
      <h1>...</h1>
      <h1>...</h1>
      <h1>...</h1>
      <h1>...</h1>
      <h1>...</h1>
      <h1>...</h1>
      <h1>...</h1>
      <h1>...</h1>
      <h1>...</h1>
    </section>
  );
}
