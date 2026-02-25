import ImageA from "../assets/Drones/3/3.webp";
import ImageB from "../assets/Drones/3/3.png";
import HomeVideo from "../assets/Video/HomeVideo.mp4";
import "../assets/Styles/Home.css";
import DroneModel1 from "../assets/Models/DroneModel1.png";
import DroneModel2 from "../assets/Models/DroneModel2.png";
import DroneModel3 from "../assets/Models/DroneModel3.png";
import SearchIcon from "../assets/Icons/SearchLogo.png";
import filterIcon from "../assets/Icons/drop.png";
import ItemPreview from "../Components/ItemCard";
import ViewAllIcon from "../assets/Icons/drop.png";
import starIcon from "../assets/Icons/starIcon.png";
import uncheckIcon from "../assets/Icons/uncheck.png";
import checkIcon from "../assets/Icons/check.png";
import { Features } from "tailwindcss";
import { useAuth0 } from "@auth0/auth0-react";
import backIcon from "../assets/Icons/cancel.png";
import { useEffect, useState } from "react";
import { DataType, ItemType,PreviewType } from "../Api/DataTypes";
import { HOST } from "../Api/STORE";
import Footer from "../Components/footer";
import DroneIcon from "../assets/Models/DroneModel1.png";

export default function Home() {
  const [DATA, setDATA] = useState<DataType>(undefined);
  const [AllDrones, setAllDrones] = useState<any>(undefined);
  const [FeaturedDrones, setFeaturedDrones] = useState<any>();

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

  useEffect(() => {
    if (DATA) {
      const preAllDrones = DATA.drones.map((drone) => {
        return MakePreview(drone, "AllDrones");
      });
      setAllDrones(preAllDrones);

      const preFeaturedDrones = DATA.drones
        .filter((drone) => DATA.featuredDrones.includes(drone.id))
        .map((drone) => {
          return MakePreview(drone, "FeaturedDrone");
        });
      setFeaturedDrones(preFeaturedDrones);
    }
  }, [DATA]);

  const [ViewFilterSearchBar, setViewFilterSearchBar] = useState(
    window.window.innerWidth > 800,
  );
  const { isAuthenticated, isLoading, user, getAccessTokenSilently } =
    useAuth0();

  const [filtRate, setFiltRate] = useState("0");
  const [filtSize, setFiltSize] = useState("all");
  const [filtName, setFiltName] = useState("none");
  function Filter() {
    const rate = "";
  }

  function MakePreview(item: ItemType, from: PreviewType) {
    return <ItemPreview key={item.id} item={item} itemFrom={from} />;
  }

  return (
    <section className="HomePage">
      <div className="Showcase">
        <div>
          <div className="FrontWordsBox">
            <div className="FrontWordsBackground">
              <img
            draggable={false}
            src={DroneModel3}
            alt=""
            className="droneHovering droneModel"
          />
              <p className="HomeTittle font13">FLY DRONES</p>
            </div>
          </div>
          <p className="tittleSlogan font14">Providing revolutionary flying</p>
          
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
              <h1 className="filterSerchTittle font1">FILTER SEARCH</h1>
              <button
                onClick={() => setViewFilterSearchBar(false)}
                className="HideFilterBtn"
              >
                <img src={backIcon} alt="" />
              </button>
            </div>
            <div className="filterTypes">
              <div className="filterItem">
                <p className="filterSubTittle font1">Price range:</p>
                <div className="filterActions">
                  <div className="filtInputPair">
                    <label className="filtLabel font5">Min</label>
                    <input
                      min={0}
                      max={1000000}
                      type="number"
                      placeholder="Min Price"
                      name="minPrice"
                    />
                  </div>
                  <div className="filtInputPair">
                    <label className="filtLabel font5">Max</label>
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
                <p className="filterSubTittle font1">Star rating:</p>
                <div className="filterActions singlePair">
                  <div className="filtInputPair singlePair">
                    <label className="filtLabel font5 ">Rating</label>

                    <div className="filtRatings">
                      <div
                        onClick={() => setFiltRate("0")}
                        className="filtRate"
                      >
                        <p>All</p>
                        <img src={filtRate === "0" ? checkIcon : uncheckIcon} />
                      </div>
                      {/* <div onClick={()=>setFiltRate("1")} className="filtRate">
                          <p>+1</p>
                          <img src={filtRate==="1"? checkIcon:uncheckIcon}/>
                      </div> */}
                      <div
                        onClick={() => setFiltRate("2")}
                        className="filtRate"
                      >
                        <p>2</p>
                        <img src={filtRate === "2" ? checkIcon : uncheckIcon} />
                      </div>
                      <div
                        onClick={() => setFiltRate("3")}
                        className="filtRate"
                      >
                        <p>3</p>
                        <img src={filtRate === "3" ? checkIcon : uncheckIcon} />
                      </div>
                      <div
                        onClick={() => setFiltRate("4")}
                        className="filtRate"
                      >
                        <p>4</p>
                        <img src={filtRate === "4" ? checkIcon : uncheckIcon} />
                      </div>
                      <div
                        onClick={() => setFiltRate("5")}
                        className="filtRate"
                      >
                        <p>5</p>
                        <img src={filtRate === "5" ? checkIcon : uncheckIcon} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="filterItem">
                <p className="filterSubTittle font1">Drone Size:</p>
                <div className="filterActions singlePair">
                  <div className="filtInputPair singlePair">
                    <label className="filtLabel font5 ">Size</label>
                    <select
                      name="droneSize"
                      defaultValue={"all"}
                      className="filterSizeSelect"
                      onChange={(value) => {
                        setFiltSize(value.target.value);
                      }}
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
                <p className="filterSubTittle font1">Sort By:</p>
                <div className="filterActions singlePair">
                  <div className="filtInputPair singlePair">
                    <label className="filtLabel font5 ">Sort</label>
                    <select
                      name="sortBy"
                      defaultValue={"none"}
                      className="filterSizeSelect"
                    >
                      <option value={"none"}>None</option>
                      <option value={"lowPrice"}>Lowest Price</option>
                      <option value={"highPrice"}>Highest Price</option>
                      <option value={"size"}>Size</option>
                      <option value={"name"}>Name</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : undefined}

        <section className="MainContent">
          <div className="featured">
            <div className="ItemsListHead">
              <p>Featured:</p>
            </div>
            <div className="ItemListContainer">{FeaturedDrones}</div>
          </div>
          <div className="OnSale">
            <div className="ItemsListHead">
              <p>On Sale:</p>
              <p className="viewAll">
                <img src={ViewAllIcon} alt="" />
                View All
              </p>
            </div>
            <div className="droneCatalogue ItemListContainer">{AllDrones}</div>
          </div>
          <div className="CataLogue">
            <div className="ItemsListHead">
              <p>Catalogue:</p>
              <p className="viewAll">
                <img src={ViewAllIcon} alt="" />
                View All
              </p>
            </div>
            <div className="droneCatalogue ItemListContainer">{AllDrones}</div>
          </div>
          
          <div className="CataLogue">
            <div className="ItemsListHead">
              <p>Catalogue:</p>
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
      <Footer />
    </section>
  );
}
