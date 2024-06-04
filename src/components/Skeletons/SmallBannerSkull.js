import React from "react";
import "./SmallBannerSkull.css";
import Skeleton from "react-loading-skeleton";
import { ReactComponent as Pearlytouchtxt } from "../../images/headersvgs/pearlytouch.svg";

export default function SmallBannerSkull() {
  return (
    <div className="slider-container">
      <div className="slider-skeleton smallbanner">
        <Skeleton count={1} className="slider-skeleton" />
        <div className="logo-container">
          <Pearlytouchtxt />
        </div>
      </div>
    </div>
  );
}
