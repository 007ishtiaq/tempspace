import React, { useState, useEffect } from "react";
import "./BurdermenuSmall.css";
import { Link, useLocation } from "react-router-dom";
import Burdermenu from "../../Burgermenu/Burdermeun";
import SideDrawer from "../../SideDrawer/SideDrawer";
import NavItemes from "../../navItems/NavItemes";

//small size left drawer - all components here
const BurdermenuSmall = () => {
  const [SideDrawervisible, setSideDrawervisible] = useState(false);

  // other page nav changing working
  // const location = useLocation();
  // useEffect(() => {
  //   const hamburger = document.querySelector(`.SmallDevices`);
  //   if (location.pathname !== "/") {
  //     hamburger.classList.add("otherpage");
  //   } else {
  //     hamburger.classList.remove("otherpage");
  //   }
  // }, [location]);

  const toggle = () => {
    setSideDrawervisible(!SideDrawervisible);
  };
  const close = () => {
    setSideDrawervisible(false);
  };

  return (
    <>
      <div className="SmallDevices">
        <Burdermenu click={toggle} />
        <SideDrawer Open={SideDrawervisible} close={close}>
          <NavItemes />
        </SideDrawer>
      </div>
    </>
  );
};

export default React.memo(BurdermenuSmall);
