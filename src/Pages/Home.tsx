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
import { DataType, ItemType, PreviewType } from "../Api/DataTypes";
import { HOST, useDATA, useCards } from "../Api/STORE";
import Footer from "../Components/footer";
import DroneIcon from "../assets/Models/DroneModel1.png";
import { MakePreview } from "../Api/ServerFunctions";

export default function Home() {
  const { DATA } = useDATA();
  const { DroneCards, DroneSaleCards, FeaturedDroneCards } = useCards();
  /* const [DATA, setDATA] = useState<DataType>(undefined); */
  /*  const [DroneCards, setDroneCards] = useState<any[] | undefined>(undefined);
  const [DroneSaleCards, setDroneSaleCards] = useState<any[] | undefined>(
    undefined,
  );
  const [FeaturedDroneCards, setFeaturedDroneCards] = useState<any[] | undefined>(); */
  const [CapSales, setCapSales] = useState(true);
  const [CapShelf, setCapShelf] = useState(true);

  const [ViewFilterSearchBar, setViewFilterSearchBar] = useState(
    window.window.innerWidth > 800,
  );

  const screenSize = window.window.innerWidth;
  let CapLimit = 10;
  if (screenSize < 1500) {
    CapLimit = 8;
  }
  if (screenSize < 1200) {
    CapLimit = 6;
  }

  const { isAuthenticated, isLoading, user, getAccessTokenSilently } =
    useAuth0();

  const [filtRate, setFiltRate] = useState("all");
  const [filtSize, setFiltSize] = useState("all");
  const [filtSort, setFiltSort] = useState("recent");
  const [filtMinPrice, setFiltMinPrice] = useState("");
  const [filtMaxPrice, setFiltMaxPrice] = useState("");
  const [Filtering, setFiltering] = useState(false);

  useEffect(() => {
    Filtered();
    function Filtered() {
      const Filter1 = filtRate === "all";
      const Filter2 = filtSize === "all";
      const Filter3 = filtSort === "recent";
      const Filter4 = filtMinPrice === "";
      const Filter5 = filtMaxPrice === "";

      setFiltering(!(Filter1 && Filter2 && Filter3 && Filter4 && Filter5));

      SearchHandle(Search);
    }
  }, [filtMinPrice, filtMaxPrice, filtRate, filtSize, filtSort]);

  const [SearchDrones, setSearchDrones] = useState<any>(DroneCards);
  const [Search, setSearch] = useState("");

  function SearchHandle(text: string) {
    setSearch(text);
    let SearchTerms: string[] = [];
    if (text.length > 0) {
      SearchTerms = text.toLocaleLowerCase().split(" ");
    }

    const element = document.getElementById("SearchSystem");
    if (element) {
      const yOffset = -80; // adjust for navbar height
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }
    document.getElementById("seachSystem")?.scrollIntoView({
      behavior: "smooth",
    });

    if (DATA) {
      let sortedData: ItemType[] = DATA.drones;

      switch (filtSort) {
        case "lowPrice":
          sortedData = sortedData.sort(
            (a: ItemType, b: ItemType) =>
              (a.sale > 0 ? a.price - (a.sale / 100) * a.price : a.price) -
              (b.sale > 0 ? b.price - (b.sale / 100) * b.price : b.price),
          );
          break;
        case "highPrice":
          sortedData = sortedData.sort(
            (a: ItemType, b: ItemType) =>
              (b.sale > 0 ? b.price - (b.sale / 100) * b.price : b.price)-
              (a.sale > 0 ? a.price - (a.sale / 100) * a.price : a.price)
          );break;
          case "size":sortedData.sort(
            (a: ItemType, b: ItemType) =>a.size.localeCompare(b.size));break
          case "name":sortedData.sort(
            (a: ItemType, b: ItemType) =>a.name.localeCompare(b.name));break
      

        default:
          break;
      }

      const prepSearchDrones: ItemType[] = DATA.drones
        .filter((drone: ItemType) => {
          if (text === "") {
            return drone;
          }

          let hasTerm = false;

          SearchTerms.forEach((term) => {
            if (term === "" || term === " ") {
              return;
            }
            if (drone.description.toLocaleLowerCase().includes(term)) {
              hasTerm = true;
              return;
            }
            if (drone.name.toLocaleLowerCase().includes(term)) {
              hasTerm = true;
              return;
            }
            if (drone.model.toLocaleLowerCase().includes(term)) {
              hasTerm = true;
              return;
            }

            if (drone.features.join(" ").toLocaleLowerCase().includes(term)) {
              hasTerm = true;
              return;
            }

            /*  drone.features.forEach((feature) => {
              if (feature.toLocaleLowerCase().includes(term)) {
                hasTerm = true;
                return;
              }
            }); */
          });

          if (hasTerm) {
            return drone;
          }

          if (drone.name.includes(Search)) {
            return;
          }
        })
        .filter((drone: ItemType) => {
          if (filtSize === "all") {
            return drone;
          }
          if (drone.size === filtSize) {
            return drone;
          }
        })
        .filter((drone: ItemType) => {
          if (filtRate === "all") {
            return drone;
          }

          let totalStars = 0;
          const reviews = drone.reviews.length;
          if (reviews <= 0) {
            return;
          }
          if (reviews > 0) {
            drone.reviews.forEach((review) => {
              review.stars;
              totalStars += review.stars;
            });
          }

          try {
            const rate = parseFloat((totalStars / reviews).toFixed(1));

            const filt = parseInt(filtRate);
            if (rate >= filt && rate <= filt + 0.9) {
              return drone;
            }
          } catch {}
        })
        .filter((drone: ItemType) => {
          if (filtMinPrice == "" || parseFloat(filtMinPrice) == 0) {
            return drone;
          }

          console.log(drone.sale);
          const limit = parseFloat(filtMinPrice);
          const price =
            drone.sale > 0
              ? (drone.price - (drone.sale / 100) * drone.price) * 15
              : drone.price * 15;

          if (price < 100) {
            console.log(drone);
          }

          console.log(limit + " <<< " + price);
          if (price >= limit) {
            return drone;
          }
        })
        .filter((drone: ItemType) => {
          if (filtMaxPrice == "" || parseFloat(filtMaxPrice) == 0) {
            return drone;
          }

          console.log(drone.sale);
          const limit = parseFloat(filtMaxPrice);
          const price =
            drone.sale > 0
              ? (drone.price - (drone.sale / 100) * drone.price) * 15
              : drone.price * 15;

          if (price <= limit) {
            return drone;
          }
        })
        .map((drone: ItemType) => {
          return MakePreview(drone, "Search");
        });

      setSearchDrones(prepSearchDrones);
    }
  }

  function ResetFilter() {
    setFiltRate("all");
    setFiltMaxPrice("");
    setFiltMinPrice("");
    setFiltSort("recent");
    setFiltSize("all");
  }

  return (
    <section className="HomePage">
      <div className="Showcase">
        <div className="parentFront">
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
          <input
            onChange={(e) => {
              SearchHandle(e.target.value);
            }}
            type="text"
            placeholder="Search..."
          />
          <img src={SearchIcon} className="searchIcon" alt="" />
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
                      onChange={(e) => {
                        setFiltMinPrice(e.target.value);
                      }}
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
                      onChange={(e) => {
                        setFiltMaxPrice(e.target.value);
                      }}
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
                        onClick={() => setFiltRate("all")}
                        className="filtRate"
                      >
                        <p>All</p>
                        <img
                          src={filtRate === "all" ? checkIcon : uncheckIcon}
                        />
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
                      <option value={"Mini"}>Mini</option>
                      <option value={"Small"}>Small</option>
                      <option value={"Medium"}>Medium</option>
                      <option value={"Large"}>Large</option>
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
                      onChange={(e) => {
                        setFiltSort(e.target.value);
                      }}
                      name="sortBy"
                      defaultValue={"recent"}
                      className="filterSizeSelect"
                    >
                      <option value={"recent"}>Recent</option>
                      <option value={"lowPrice"}>Lowest Price</option>
                      <option value={"highPrice"}>Highest Price</option>
                      <option value={"size"}>Size</option>
                      <option value={"name"}>Name</option>
                    </select>
                  </div>
                </div>
              </div>
              <button onClick={ResetFilter} className="resetFilter">
                RESET
              </button>
            </div>
          </div>
        ) : undefined}

        <section className="MainContent">
          {Search.length > 0 || Filtering ? (
            <div className="searchResult">
              <div className="ItemsListHead">
                <p className="font11 itemsGroupName">Search results:</p>
                <p className="viewAll font5">
                  <img src={ViewAllIcon} alt="" />
                  View All
                </p>
              </div>
              <div className="droneCatalogue ItemListContainer">
                {SearchDrones.length > 0 ? (
                  SearchDrones
                ) : (
                  <p className="noMatchFound font9">NO MATCH FOUND</p>
                )}
              </div>
            </div>
          ) : undefined}

          {Search.length > 0 || Filtering ? undefined : (
            <>
              <div className="featured">
                <div className="ItemsListHead">
                  <p className="font11 itemsGroupName">Featured:</p>
                </div>
                <div className="ItemListContainer">
                  {FeaturedDroneCards.length === 0 ? (
                    <p className="noMatchFound font9">No inventory</p>
                  ) : (
                    FeaturedDroneCards
                  )}
                </div>
              </div>
              <div className="OnSale">
                <div
                  className="ItemsListHead"
                  onClick={() => setCapSales(!CapSales)}
                >
                  <p className="font11 itemsGroupName">On Sale:</p>
                  <p className="viewAll font5">
                    <img
                      style={
                        CapSales ? undefined : { transform: "rotate(180deg)" }
                      }
                      src={ViewAllIcon}
                      alt=""
                    />
                  </p>
                </div>
                <div className="droneCatalogue ItemListContainer">
                  {DroneSaleCards.length === 0 ? (
                    <p className="noMatchFound font9">No inventory</p>
                  ) : CapSales ? (
                    DroneSaleCards?.slice(0, CapLimit / 2)
                  ) : (
                    DroneSaleCards
                  )}
                </div>
                <button
                  onClick={() => {
                    setCapSales(!CapSales);
                  }}
                  className="showAllBtn font6"
                >
                  {!CapSales ? "Show Less" : "Show All"}
                </button>
              </div>
              <div className="CataLogue">
                <div
                  className="ItemsListHead"
                  onClick={() => setCapShelf(!CapShelf)}
                >
                  <p className="font11 itemsGroupName">Shelf:</p>
                  <p className="viewAll font5">
                    <img
                      style={
                        CapShelf ? undefined : { transform: "rotate(180deg)" }
                      }
                      src={ViewAllIcon}
                      alt=""
                    />
                  </p>
                </div>
                <div className="droneCatalogue ItemListContainer">
                  {DroneCards.length === 0 ? (
                    <p className="noMatchFound font9">No inventory</p>
                  ) : CapShelf ? (
                    DroneCards?.slice(0, CapLimit)
                  ) : (
                    DroneCards
                  )}
                </div>
                <button
                  onClick={() => {
                    setCapShelf(!CapShelf);
                  }}
                  className="showAllBtn font6"
                >
                  {!CapShelf ? "Show Less" : "Show All"}
                </button>
              </div>
              {DroneCards ? undefined : (
                <p className="noServer font9">Not connected to Server!</p>
              )}
            </>
          )}
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
