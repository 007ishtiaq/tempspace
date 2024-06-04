import React, { useState } from "react";
import { ReactComponent as Deletesvg } from "../../images/cart/delete.svg";
import { useDispatch } from "react-redux";
import ModalImage from "react-modal-image";
import laptop from "../../images/laptop.png";

export default function ProductCardOnCart({ product, calctotalweight }) {
  const {
    title,
    slug,
    images,
    description,
    disprice,
    price,
    brand,
    color,
    shipping,
    category,
    subs,
    subs2,
    quantity,
    sold,
    count,
  } = product;

  const [qty, setQty] = useState(count);

  let dispatch = useDispatch();

  const handleQuantityChangedec = async (e) => {
    setQty(qty < 2 ? 1 : qty - 1);
    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      await cart.map((prod, i) => {
        if (prod._id == product._id) {
          cart[i].count = qty < 2 ? 1 : qty - 1;
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });

      // recalculate shipping
      await calctotalweight();
    }
  };
  const handleQuantityChangeinc = async (e) => {
    setQty(qty > quantity - 1 ? quantity : qty + 1);
    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      await cart.map((prod, i) => {
        if (prod._id == product._id) {
          cart[i].count = qty > quantity - 1 ? quantity : qty + 1;
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });

      // recalculate shipping
      await calctotalweight();
    }
  };

  const handleRemove = () => {
    const userConfirmed = window.confirm(
      "Are you sure you want to remove Item?"
    );

    if (userConfirmed) {
      // console.log(p._id, "to remove");
      let cart = [];

      if (typeof window !== "undefined") {
        if (localStorage.getItem("cart")) {
          cart = JSON.parse(localStorage.getItem("cart"));
        }
        // [1,2,3,4,5]
        cart.map((prod, i) => {
          if (prod._id === product._id) {
            cart.splice(i, 1);
          }
        });

        localStorage.setItem("cart", JSON.stringify(cart));
        dispatch({
          type: "ADD_TO_CART",
          payload: cart,
        });

        // recalculate shipping
        calctotalweight();
      }
    }
  };

  return (
    <div class="cartprocont">
      <div class="cartproimg">
        {images.length ? (
          <ModalImage small={images[0].url} large={images[0].url} />
        ) : (
          <ModalImage small={laptop} large={laptop} />
        )}
      </div>
      <div class="cartprodetailscont">
        <div class="cartproname">{`${title}`}</div>
        <div class="cartprostockstatus">{quantity > 0 && "In Stock"}</div>
        <div class="cartprovariants">
          <div class="subvariant">
            <span class="varianthead">Color: </span>
            <span class="variantsub">{color}</span>
          </div>
          <div class="subvariant">
            <span class="varianthead">brand: </span>
            <span class="variantsub">{brand}</span>
          </div>
        </div>
        {/* {shipping === "Yes" && (
          <div class="subvariant">
            <span class="varianthead">Shipping: </span>
            <span class="variantsub">Free Shipping</span>
          </div>
        )} */}
      </div>
      <div class="cartpropricedetails">
        {disprice ? (
          <div className="cartpricebinder">
            <div class="cartproprice">Rs {disprice}.00</div>
            <div class="cartprocutcont">
              <div class="cartpropricelist">Rs {price}.00</div>
              <div class="dis-persontage">
                {" "}
                -{(100 - (disprice / price) * 100).toFixed(0)}%{" "}
              </div>
            </div>
          </div>
        ) : (
          <div class="cartproprice">Rs {price}.00</div>
        )}

        <div class="cartprobtns">
          <div onClick={handleRemove} class="cartprodel">
            <Deletesvg />
          </div>
          <div class="cartproqtycont">
            {quantity > 0 ? (
              <div className="mybtn qtybtnsize cartqtybtncont">
                <a
                  disabled={qty === 1}
                  className={qty === 1 && "qtymin"}
                  onClick={handleQuantityChangedec}
                >
                  -
                </a>
                <span>{qty}</span>
                <a
                  disabled={qty === quantity}
                  className={qty === quantity && "qtymax"}
                  onClick={handleQuantityChangeinc}
                >
                  +
                </a>
              </div>
            ) : (
              <div className="qtybtnsize">
                <a disabled className="qtymin">
                  -
                </a>
                <span>{0}</span>
                <a disabled className="qtymax">
                  +
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
