import React from "react";
import Img from "../productsSlidable/img/Image";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import _ from "lodash";
import Laptop from "../../images/laptop.png";
import { Card } from "antd";
import { showAverage } from "../../functions/rating";
import { toast } from "react-hot-toast";

const FlashsaleProductCard = ({
  product,
  contWidth,
  FlashSalesCont,
  WidthIdea,
}) => {
  const {
    title,
    slug,
    price,
    shipping,
    quantity,
    sold,
    images,
    disprice,
    onSale,
  } = product;

  const dispatch = useDispatch();

  const widthadjust = () => {
    const rootwidth = document.getElementById("root").clientWidth;

    if (rootwidth >= 1113) {
      return { width: `${(contWidth * 16.32) / 100 - 4}px` };
    }
    if (rootwidth >= 975) {
      return { width: `${(contWidth * 16.29) / 100 - 4}px` };
    }
    if (rootwidth >= 750) {
      return { width: `${(contWidth * 19.5) / 100 - 4}px` };
    }
    if (rootwidth >= 701) {
      return { width: `${(contWidth * 24.5) / 100 - 4}px` };
    }
    if (rootwidth >= 530) {
      return { width: `${(contWidth * 28.0) / 100 - 4}px` };
    }
    if (rootwidth >= 320) {
      return { width: `${(contWidth * 38.8) / 100 - 4}px` };
    }

    // Default case if none of the conditions are met
    return {};
  };

  const handleAddToCart = () => {
    if (product.quantity < 1) {
      toast.error("Out of Stock");
      return;
    }
    // create cart array
    let cart = [];
    if (typeof window !== "undefined") {
      // if cart is in local storage GET it
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      if (cart.length) {
        let foundItem = cart.find((item) => {
          return item._id === product._id;
        });
        if (foundItem) {
          toast.success("Item Already in Cart");
        } else {
          cart.push({
            ...product,
            count: 1,
          });
          toast.success("Added to Cart");
        }
      } else {
        cart.push({
          ...product,
          count: 1,
        });
        toast.success("Added to Cart");
      }

      // remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);
      // save to local storage
      // console.log('unique', unique)
      localStorage.setItem("cart", JSON.stringify(unique));

      // add to reeux state
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });
    }
  };

  return (
    <div
      style={FlashSalesCont ? widthadjust() : {}}
      class={`itemcolum ${WidthIdea === "Seachpagewidth" && "searchitemcol"}`}
    >
      <Link class="productanker" to={`/product/${slug}`}>
        {images && images.length ? (
          <Img
            src={images[0].url}
            alt={title}
            className="imagepart"
            stockstatus={product.quantity < 1 && "imgstockout"}
          />
        ) : (
          <span className={product.quantity < 1 && "imgstockout"}>
            <Card cover={<img src={Laptop} />}></Card>
          </span>
        )}
      </Link>
      <div class="textpart">
        {disprice ? (
          <>
            <div class="Pricediv">
              <div class="dis p-side">
                PKR <span>{disprice}</span>.00
              </div>
              <div class="d-persontage">
                -{(100 - (disprice / price) * 100).toFixed(0)}%
              </div>
            </div>
            <div class="dis-side">PKR {price.toFixed(2)}</div>
          </>
        ) : (
          <div class="p-side common-p-side">
            PKR <span>{price}</span>.00
          </div>
        )}
        <div
          className={`n-side ${onSale !== "Yes" && "n-more"} ${
            disprice && "n-withdis"
          }`}
        >
          <span>{title}</span>
        </div>
        <div class="remaincount">
          {onSale === "Yes" ? (
            <div class="remaincount-side">{quantity} items left</div>
          ) : (
            <div className="ratingstarsp">
              {product && product.ratings && product.ratings.length > 0 ? (
                showAverage(product)
              ) : (
                <div className="">No rating yet</div>
              )}
            </div>
          )}

          <button
            onClick={handleAddToCart}
            disabled={product.quantity < 1}
            className={`addtocartbtn ${product.quantity < 1 && "stockout"}`}
          >
            Add to cart
          </button>
        </div>
        {onSale === "Yes" && quantity > 0 && (
          <div class="stock-count">
            <div
              style={{
                backgroundImage: `linear-gradient(to right, #b81a0a ${
                  100 - (sold / (sold + quantity)) * 100
                }%, #c7c7cd ${100 - (sold / (sold + quantity)) * 100}%)`,
              }}
              class="meter"
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlashsaleProductCard;
