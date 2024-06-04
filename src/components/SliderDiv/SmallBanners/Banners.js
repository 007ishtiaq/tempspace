import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getRelatedBanners } from "../../../functions/banner";
import SmallBannerSkull from "../../Skeletons/SmallBannerSkull";

export default function Banners() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRelatedBanners("HomePageSmallBanner").then((b) => {
      setLoading(false);
      setBanners(b.data);
    });
  }, []);

  return (
    <div class="sliderrightdiv">
      <div class="banner1">
        {loading ? (
          <SmallBannerSkull />
        ) : (
          <Link to={banners && banners.length > 0 && banners[1].link}>
            <img
              src={banners && banners.length > 0 && banners[1].image.url}
              alt={banners && banners.length > 0 && banners[1].name}
            />
          </Link>
        )}
      </div>
      <div class="banner2">
        {loading ? (
          <SmallBannerSkull />
        ) : (
          <Link to={banners && banners.length > 0 && banners[0].link}>
            <img
              src={banners && banners.length > 0 && banners[0].image.url}
              alt={banners && banners.length > 0 && banners[0].name}
            />
          </Link>
        )}
      </div>
    </div>
  );
}
