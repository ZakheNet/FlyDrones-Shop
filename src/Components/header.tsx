import "../assets/Styles/Header.css";
import ProfileIcon from "../assets/Icons/Profile.png";
import SiteLogo from "../assets/Icons/DroneLogo.png";
import { useAuth0, User } from "@auth0/auth0-react";
import { DEV, useDevUser } from "../Api/STORE";
import { useState } from "react";

import LogoutIcon from "../assets/Icons/Leave.png";
import AlertIcon from "../assets/Icons/alert.png";
import VerifiedIcon from "../assets/Icons/Correct.png";
import backIcon from "../assets/Icons/cancel.png";
import loadingIcon from "../assets/Icons/Drone2.png";

export default function Header() {
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } =
    useAuth0();
  const { userDev } = useDevUser();
  const [ViewProfile, setViewProfile] = useState(false);
  console.log(user)

  return (
    <>
      <header className="Header">
        <div className="logos">
          <img src={SiteLogo} />
          <p className="storeTittle">DroneApex</p>
        </div>
        <div className="HeadMenu">
          <nav className="HeadNavLinks">
            <a href="#SearchSystem">Shop</a>
            {isLoading? undefined:<a href="#">Cart</a>}
            <a href="#">Sales</a>
            {isLoading? undefined:<a href="#">Favourites</a>}
            {isLoading? undefined:<a
              onClick={() =>
                AuthAction(
                  isAuthenticated,
                  ViewProfile,
                  setViewProfile,
                  loginWithRedirect,
                  DEV,
                )
              }
            >
              {isAuthenticated && user?.given_name
                ? `${user.given_name}`
                : DEV
                  ? userDev.given_name
                  : "LogIn"}
              <img
                src={DEV ? userDev.picture : user?.picture || ProfileIcon}
                className="profilePic"
                style={
                  DEV || user?.picture ? undefined : { filter: "invert()" }
                }
              />
            </a>}
            {isLoading? <div className="loading">
              <img src={loadingIcon} className="loading loadingAuth" />
            </div>:undefined}
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
                  : ":)"}
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
                {DEV || user?.email_verified
                  ? "Email Verified"
                  : "Email not verified"}
              </p>
              <img
                src={DEV || user?.email_verified ? VerifiedIcon : AlertIcon}
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

            <button onClick={() => setViewProfile(false)} className="cancelBtn">
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
  if (isAuthenticated || DEV) {
    setViewProfile(!ViewProfile);
  } else {
    loginWithRedirect();
  }
}
