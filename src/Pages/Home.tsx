import ImageA from "../assets/Drones/3/3.webp";
import ImageB from "../assets/Drones/3/3.png";
import HomeVideo from "../assets/Video/HomeVideo.mp4";
import "../assets/Styles/Home.css";
import DroneModel1 from "../assets/Models/DroneModel1.png";
import DroneModel2 from "../assets/Models/DroneModel2.png";
import DroneModel3 from "../assets/Models/DroneModel3.png";
import SearchIcon from "../assets/Icons/SearchLogo.png";
import filterIcon from "../assets/Icons/drop.png";
import ItemPreview from "../Components/ItemPreview";
import ViewAllIcon from "../assets/Icons/drop.png";
import starIcon from "../assets/Icons/starIcon.png"
import uncheckIcon from "../assets/Icons/uncheck.png"
import checkIcon from "../assets/Icons/check.png"
import DATA from "../Api/DATA";
import { Features } from "tailwindcss";
import { ItemType } from "../Components/ItemPreview";
import { useAuth0 } from "@auth0/auth0-react";
import backIcon from "../assets/Icons/cancel.png";
import { useState } from "react";

export default function Home() {
  console.log(window.window.innerWidth);

  const [ViewFilterSearchBar, setViewFilterSearchBar] = useState(
    window.window.innerWidth > 800,
  );
  const { isAuthenticated, isLoading, user, getAccessTokenSilently } =
    useAuth0();

  console.log(ViewFilterSearchBar);
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
        <button
          onClick={() => {
            setViewFilterSearchBar(!ViewFilterSearchBar);
          }}
          className="FilterBar"
        >
          <p>Filter</p>
          <img
            src={filterIcon}
            style={
              ViewFilterSearchBar ? undefined : { transform: "rotate(-90deg)" }
            }
            alt=""
          />
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
        {ViewFilterSearchBar ? (
          <div className="filterSystem">
            <div className="filterTopBar">
              <h1 className="filterSerchTittle">Filter Search</h1>
              <button
                onClick={() => setViewFilterSearchBar(false)}
                className="HideFilterBtn"
              >
                <img src={backIcon} alt="" />
              </button>
            </div>
            <div className="filterTypes">
              <div className="filterItem">
                <p className="filterSubTittle">Price range:</p>
                <div className="filterActions">
                  <div className="filtInputPair">
                    <label className="filtLabel">Min</label>
                    <input
                      min={0}
                      max={1000000}
                      type="number"
                      placeholder="Min Price"
                      name="minPrice"
                    />
                  </div>
                  <div className="filtInputPair">
                    <label className="filtLabel">Max</label>
                    <input
                      min={0}
                      max={1000000}
                      type="number"
                      placeholder="Max Price"
                      name="minPrice"
                    />
                  </div>
                </div>
              </div>


              <div className="filterItem">
                <p className="filterSubTittle">Drone Size:</p>
                <div className="filterActions singlePair">
                  <div className="filtInputPair singlePair">
                    <label className="filtLabel ">Rating:</label>

                    <div className="filtRatings">
                      <div className="filtRate">
                          <p>All</p>
                          <img src={uncheckIcon}/>
                      </div>
                      {/* <div className="filtRate">
                          <p>+1</p>
                          <img src={uncheckIcon}/>
                      </div> */}
                      <div className="filtRate">
                          <p>+2</p>
                          <img src={uncheckIcon}/>
                      </div>
                      <div className="filtRate">
                          <p>+3</p>
                          <img src={uncheckIcon}/>
                      </div>
                      <div className="filtRate">
                          <p>+4</p>
                          <img src={uncheckIcon}/>
                      </div>
                      <div className="filtRate">
                          <p>+5</p>
                          <img src={uncheckIcon}/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              <div className="filterItem">
                <p className="filterSubTittle">Drone Size:</p>
                <div className="filterActions singlePair">
                  <div className="filtInputPair singlePair">
                    <label className="filtLabel ">Size</label>
                    <select
                      name="droneSize"
                      defaultValue={"all"}
                      className="filterSizeSelect"
                    >
                      <option value={"all"}>All</option>
                      <option value={"mini"}>Mini</option>
                      <option value={"small"}>Small</option>
                      <option value={"medium"}>Medium</option>
                      <option value={"large"}>Large</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="filterItem">
                <p className="filterSubTittle">Sort By:</p>
                <div className="filterActions singlePair">
                  <div className="filtInputPair singlePair">
                    <label className="filtLabel ">Size</label>
                    <select
                      name="sortBy"
                      defaultValue={"none"}
                      className="filterSizeSelect"
                    >
                      <option value={"none"}>None</option>
                      <option value={"Name"}>Name</option>
                      <option value={"Price Highest"}>Highest Price</option>
                      <option value={"Price Lowest"}>Lowest Price</option>
                      <option value={"Drone Size"}>Size</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : undefined}

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

      {/*       <h1>...</h1>
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
      <h1>...</h1> */}
    </section>
  );
}
