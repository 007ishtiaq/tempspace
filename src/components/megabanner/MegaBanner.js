import React, { useState } from "react";
import "./MegaBanner.css";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

export default function MegaBanner({ banner, loading }) {
  return (
    <div class="cardcontainer">
      <div class="insidecont">
        <div class="contentcont">
          <div class="productsarea">
            {loading ? (
              <div className="Skeletonsize">
                <Skeleton className="Skeletonsize" count={1} />
              </div>
            ) : (
              <Link to={banner && banner.link}>
                <img
                  className="bigbannerimg"
                  src={banner && banner.image.url}
                  alt={banner && banner.image.public_id}
                />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
