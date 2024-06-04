import React, { useState, useEffect } from "react";
import "./SliderDiv.css";
import Slider from "./Slider/Slider";
import CategoriesPanal from "./categoriesPanal/CategoriesPanal";
import { getCategoriesslider } from "../../functions/category";
import Banners from "./SmallBanners/Banners";
// import categorydata from "./responses/categorydata";
// Categories={categorydata.Categories}

export default function () {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategoriesslider().then((res) => {
      setLoading(false);
      setCategories(res.data);
    });
  }, []);

  return (
    <>
      <div class="sliderdiv">
        <CategoriesPanal loading={loading} Categories={categories} />
        <div class="slidercenterdiv">
          <Slider />
        </div>
        <Banners />
      </div>
    </>
  );
}
