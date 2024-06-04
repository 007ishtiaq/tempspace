import React from "react";
import Skeleton from "react-loading-skeleton";
import "./MainSliderSkull.css";
import { ReactComponent as Pearlytouchtxt } from "../../images/headersvgs/pearlytouch.svg";

export default function MainSliderSkull() {
  return (
    <div className="slider-container">
      <div className="slider-skeleton">
        <Skeleton count={1} className="slider-skeleton" />
        <div className="logo-container">
          <Pearlytouchtxt />
        </div>
      </div>
    </div>
  );
}
