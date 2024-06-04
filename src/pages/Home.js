import React from "react";
import Sliderdiv from "../components/SliderDiv/Sliderdiv";
import ProductsGroup from "../components/productsSlidable/productGroup/ProductsGroup";
import CommonProductsCont from "../components/CommonProductsCont/CommonProductsCont";
import CategoriesCard from "../components/categoriesCard/CategoriesCard";
import BrandsCard from "../components/brandsCard/BrandsCard";

const Home = () => {
  return (
    <>
      <div className="centercont">
        <Sliderdiv />
        <CategoriesCard />
        <ProductsGroup />
        <CommonProductsCont WidthIdea={"Fullwidth"} />
        <BrandsCard />
      </div>
    </>
  );
};

export default Home;
