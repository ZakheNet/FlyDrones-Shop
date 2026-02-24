import "../assets/Styles/Header.css";
import ProfileIcon from "../assets/Icons/Profile.png";
import SiteLogo from "../assets/Icons/DroneLogo.png";
import { useAuth0 } from "@auth0/auth0-react";
import { DEV } from "../Api/STORE";
import { useState } from "react";

import LogoutIcon from "../assets/Icons/Leave.png";
import AlertIcon from "../assets/Icons/alert.png";
import VerifiedIcon from "../assets/Icons/Correct.png";
import backIcon from "../assets/Icons/cancel.png";
import loadingIcon from "../assets/Icons/Drone2.png";
import SideMenuIcon from "../assets/Icons/more.png";
import { userDev } from "../Api/STORE";

export default function Header() {
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } =
    useAuth0();
  const [ViewProfile, setViewProfile] = useState(false);
  const [ViewSideMenu, setViewSideMenu] = useState(false);

  return (
    <>
      <header className="Header">
        <div className="sideMenuTottleBox">
          <div className="logos">
            <img src={SiteLogo} />
            <p className="storeTittle">DroneApex</p>
          </div>
          <button
            onClick={() => {
              setViewSideMenu(!ViewSideMenu);
              setViewProfile(false);
            }}
            className={`SideMenuToggle`}
          >
            <img src={SideMenuIcon} alt="" />
          </button>
        </div>
        <div className="HeadMenu">
          <nav
            className={`HeadNavLinks ${ViewSideMenu ? "SideMenu" : "noSideMenu"}`}
          >
            <a href="#SearchSystem">Shop</a>
            {isLoading ? undefined : <a href="#">Cart</a>}
            <a href="#">Sales</a>
            {isLoading ? undefined : <a href="#">Favourites</a>}
            {isLoading ? undefined : (
              <a
                onClick={() => {
                  AuthAction(
                    isAuthenticated,
                    ViewProfile,
                    setViewProfile,
                    loginWithRedirect,
                    DEV,
                  );
                  setViewSideMenu(false);
                }}
              >
                {isAuthenticated && (user?.given_name || user?.nickname)
                  ? `${user.given_name || user.nickname}`
                  : DEV
                    ? userDev.given_name
                    : user?.nickname
                      ? user.nickname
                      : "LogIn"}
                <img
                  src={DEV ? userDev.picture : user?.picture || ProfileIcon}
                  className="profilePic"
                  style={
                    DEV || user?.picture ? undefined : { filter: "invert()" }
                  }
                />
              </a>
            )}

            <button
              onClick={() => setViewSideMenu(false)}
              className="cancelBtn sideCloseBtn"
            >
              <img src={backIcon} alt="" className="cancelIcon" />
              CLOSE
            </button>

            {isLoading ? (
              <div className="loading">
                <img src={loadingIcon} className="loading loadingAuth" />
              </div>
            ) : undefined}
          </nav>
        </div>
      </header>

      {ViewProfile ? (
        <div className="ProfileView">
          <div className="ProfilePicPair">
            <img
              src={DEV ? userDev.picture : user?.picture || ProfileIcon}
              className="profilePicView"
              style={DEV || user?.picture ? undefined : { filter: "invert()" }}
            />
            <p className="GreetUser">
              Hi{" "}
              {DEV
                ? userDev.given_name
                : user?.given_name
                  ? user.given_name
                  : user?.nickname
                    ? user.nickname
                    : ""}
            </p>
          </div>
          <div className="ProfileViewBody">
            <p className="userEmailProfile">
              {DEV
                ? userDev.email
                : user?.email
                  ? user.email
                  : "Email not found"}
            </p>
            <div className="verifiedEmail">
              <p className="verifiedText">
                {DEV || user?.email_verified ? "Email Verified" : ""}
              </p>
              <img
                src={
                  DEV || user?.email_verified
                    ? VerifiedIcon
                    : undefined /* AlertIcon */
                }
                alt=""
                className="verifiedIcon"
              />
            </div>
            <button
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
              className="logOutBtn"
            >
              <img src={LogoutIcon} alt="" className="logOutIcon" /> Logout
            </button>

            <button
              onClick={() => {
                setViewProfile(false);
                setViewSideMenu(false);
              }}
              className="cancelBtn"
            >
              <img src={backIcon} alt="" className="cancelIcon" />
              CLOSE
            </button>
          </div>
        </div>
      ) : undefined}
    </>
  );
}

function AuthAction(
  isAuthenticated: boolean,
  ViewProfile: boolean,
  setViewProfile: (x: boolean) => void,
  loginWithRedirect: any,
  DEV: boolean,
) {
  console.log();
  if (isAuthenticated || DEV) {
    setViewProfile(!ViewProfile);
  } else {
    
      loginWithRedirect()
      

  }
}
