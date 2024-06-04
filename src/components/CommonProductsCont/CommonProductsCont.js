import React, { useState, useEffect } from "react";
import "../ProductCards/ProductCardsAll.css";
import watchimg from "../../images/productdiv_sample_images/watch.webp";
import img2 from "../../images/productdiv_sample_images/3.jpg";
import { getProductsByCount } from "../../functions/product";
import FlashsaleProductCard from "../ProductCards/FlashsaleProductCard";
import ProductCardSkull from "../Skeletons/ProductCardSkull";

export default function CommonProductsCont({ WidthIdea }) {
  const [products, setProducts] = useState([]);
  const [contwidth, setContwidth] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const proarea = document.querySelector(".productsarea");
    const contwidth = proarea.clientWidth;
    setContwidth(contwidth);

    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    getProductsByCount(6).then((p) => {
      setLoading(false);
      setProducts(p.data);
    });
  };

  return (
    <div class="cardcontainer">
      <div class="insidecont">
        <div class="mainhead colorhead">
          <div class="colorheading">Featured Products</div>
          <div class="colormoredark">SEE MORE</div>
        </div>
        <div class="contentcont">
          <div class="productsarea">
            {loading ? (
              <ProductCardSkull clone={6} contWidth={contwidth} />
            ) : (
              products &&
              products.map((prod) => (
                <FlashsaleProductCard
                  key={prod._id}
                  product={prod}
                  contWidth={contwidth}
                  WidthIdea={WidthIdea}
                />
              ))
            )}
            {/* <div class="itemcolum">
              <a class="productanker" href="#">
                <img class="imagepart" src={img2} alt="" />

                <div class="textpart">
                  <div class="Pricediv">
                    <div class="dis p-side">
                      PKR <span>279</span>.06
                    </div>
                    <div class="d-persontage">-79%</div>
                  </div>
                  <div class="dis-side">PKR 456.64</div>
                  <div class="n-side">
                    {" "}
                    <span>
                      {" "}
                      Silicone Strap For Apple Watch Band 44mm 40mm 45mm 41mm
                      49mm 42mm 38mm 44 45 mm bracelet iwatch series 7 se 3 4 5
                      6 8 Ultra band{" "}
                    </span>
                  </div>
                  <div class="Shipippingdiv">
                    <div class="shipping-side"> Free shipping</div>
                    <button class="addtocartbtn">Add to cart</button>
                  </div>
                  <div class="stock-count">
                    22 items left<div class="meter"></div>
                  </div>
                </div>
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
