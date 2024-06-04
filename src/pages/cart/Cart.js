import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProductCardOnCart from "../../components/cards/ProductCardOnCart";
import { userCart, emptyUserCart } from "../../functions/user";
import { ReactComponent as Emptycartsvg } from "../../images/cart/emptycart.svg";
import { ReactComponent as Deletesvg } from "../../images/cart/delete.svg";
import { ReactComponent as Returnsvg } from "../../images/cart/return.svg";
import { ReactComponent as Verifiedsvg } from "../../images/cart/verified.svg";
import { ReactComponent as Banksvg } from "../../images/cart/payments/banktransfer.svg";
import { ReactComponent as CODsvg } from "../../images/cart/payments/cod.svg";
import { ReactComponent as Easypaisasvg } from "../../images/cart/payments/easypaisa.svg";
import { ReactComponent as Mastersvg } from "../../images/cart/payments/master.svg";
import { ReactComponent as Visasvg } from "../../images/cart/payments/visa.svg";
import { ReactComponent as Walletsvg } from "../../images/cart/payments/wallet.svg";
import "./cart.css";
import {
  applyCoupon,
  removeCoupon,
  validateCoupon,
  getUserCart,
} from "../../functions/user";
import { getShippings } from "../../functions/shipping";
import { toast } from "react-hot-toast";
import { Tooltip } from "antd";
import NoNetModal from "../../components/NoNetModal/NoNetModal";

const Cart = ({ history }) => {
  const [coupon, setCoupon] = useState("");
  const [discountError, setDiscountError] = useState("");
  const [discountPersent, setDiscountPersent] = useState(0);
  const [shippingfee, setShippingfee] = useState(0);
  const [totalWeight, setTotalWeight] = useState("");
  const [noNetModal, setNoNetModal] = useState(false);
  const [retryFunction, setRetryFunction] = useState("");

  const { cart, user } = useSelector((state) => ({ ...state }));
  const couponString = useSelector((state) => state.coupon);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const handleOnlineStatus = () => {
  //     if (navigator.onLine) {
  //       setNoNetModal(false);
  //     }
  //   };
  //   window.addEventListener("online", handleOnlineStatus);
  //   return () => {
  //     window.removeEventListener("online", handleOnlineStatus);
  //   };
  // }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCoupon(JSON.parse(localStorage.getItem("coupon")));
    }
  }, []);

  useEffect(() => {
    let LocalCouponString = "";
    if (typeof window !== "undefined") {
      LocalCouponString = JSON.parse(localStorage.getItem("coupon"));
    }

    if (user && user.token) {
      getUserCart(user.token).then((res) => {
        if (coupon === LocalCouponString) {
          if (coupon) {
            res.data.totalAfterDiscount && validateDiscountCoupon();
          }
        }
      });
    }
  }, [user, coupon]);

  useEffect(() => {
    CalcShipping();
  }, [totalWeight, cart]);

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      if (nextValue.disprice > 0) {
        return currentValue + nextValue.count * nextValue.disprice;
      } else {
        return currentValue + nextValue.count * nextValue.price;
      }
    }, 0);
  };

  const CalcShipping = () => {
    getShippings().then(async (res) => {
      let shippings = res.data;

      if (cart.length > 0) {
        const totalWeight = await cart.reduce((currentValue, nextValue) => {
          return currentValue + nextValue.weight * nextValue.count;
        }, 0);

        let shippingCharges = "";

        for (let i = 0; i < shippings.length; i++) {
          if (
            totalWeight <= shippings[i].weightend &&
            totalWeight >= shippings[i].weightstart
          ) {
            shippingCharges = shippings[i].charges;
          }
        }
        setShippingfee(shippingCharges);
      } else {
        setShippingfee(0);
      }
    });
  };

  const calctotalweight = () => {
    const totalWeight = cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.weight * nextValue.count;
    }, 0);
    setTotalWeight(totalWeight);
  };

  const emptyCart = () => {
    const userConfirmed = window.confirm(
      "Are you sure you want to empty the cart?"
    );

    if (userConfirmed) {
      if (typeof window !== "undefined") localStorage.removeItem("cart");

      CalcShipping();

      // empty redux cart
      dispatch({
        type: "ADD_TO_CART",
        payload: [],
      });

      // empty redux coupon
      dispatch({
        type: "COUPON_APPLIED",
        payload: { applied: false, coupon: {} },
      });

      // empty local storage coupon
      if (typeof window !== "undefined") {
        localStorage.setItem("coupon", JSON.stringify(""));
      }

      // empty cart from backend
      if (user && user.token) {
        emptyUserCart(user.token);
      }
    }
  };

  const saveOrderToDb = () => {
    // console.log("cart", JSON.stringify(cart, null, 4));
    if (navigator.onLine) {
      userCart(cart, user.token)
        .then((res) => {
          if (res.data.ok) history.push("/checkout");
        })
        .catch((err) => console.log("cart save err", err));
    } else {
      setNoNetModal(true);
      setRetryFunction("saveOrderToDb");
    }
  };

  const validateDiscountCoupon = async () => {
    if (!cart.length) {
      toast.error("Cart is empty");
      removeDiscountCoupon();
      return;
    }
    if (navigator.onLine) {
      console.log("im online");
      if (user && user.token) {
        validateCoupon(user.token, coupon)
          .then((res) => {
            if (res.data) {
              setDiscountPersent(res.data);

              if (typeof window !== "undefined") {
                localStorage.setItem("coupon", JSON.stringify(coupon));
              }

              // update redux coupon applied true/false
              dispatch({
                type: "COUPON_APPLIED",
                payload: { applied: true, coupon },
              });
            }
            // error
            if (res.data.err) {
              setDiscountError(res.data.err);
              // update redux coupon applied true/false
              dispatch({
                type: "COUPON_APPLIED",
                payload: { applied: false, coupon: {} },
              });
            }
          })
          .catch((err) => console.log("Coupon validation error", err));
      } else {
        history.push({
          pathname: "/login",
          state: { from: `cart` },
        });
      }
    } else {
      setNoNetModal(true);
      setRetryFunction("validateDiscountCoupon");
    }
  };

  const applyDiscountCoupon = async () => {
    if (!cart.length) {
      toast.error("Cart is empty");
      removeDiscountCoupon();
      return;
    }
    if (navigator.onLine) {
      if (user && user.token) {
        await userCart(cart, user.token)
          .then((res) => {})
          .catch((err) => console.log("cart save err", err));
        await applyCoupon(user.token, coupon).then((res) => {
          if (res.data) {
            if (res.data.ok) history.push("/checkout");
            // update redux coupon applied true/false
            dispatch({
              type: "COUPON_APPLIED",
              payload: { applied: true, coupon },
            });
          }
          // error
          if (res.data.err) {
            setDiscountError(res.data.err);
            // update redux coupon applied true/false

            dispatch({
              type: "COUPON_APPLIED",
              payload: { applied: false, coupon: {} },
            });
          }
        });
      } else {
        history.push({
          pathname: "/login",
          state: { from: `cart` },
        });
      }
    } else {
      setNoNetModal(true);
      setRetryFunction("applyDiscountCoupon");
    }
  };

  const removeDiscountCoupon = async () => {
    if (user && user.token) {
      await removeCoupon(user.token).then((res) => {
        setDiscountPersent(0);
        setCoupon("");
        setDiscountError("");
        if (typeof window !== "undefined") {
          localStorage.setItem("coupon", JSON.stringify(""));
        }
        dispatch({
          type: "COUPON_APPLIED",
          payload: { applied: false, coupon: {} },
        });
      });
    } else {
      setDiscountPersent(0);
      setCoupon("");
      setDiscountError("");
      if (typeof window !== "undefined") {
        localStorage.setItem("coupon", JSON.stringify(""));
      }
      dispatch({
        type: "COUPON_APPLIED",
        payload: { applied: false, coupon: {} },
      });
    }
  };

  const showApplyCoupon = () => (
    <>
      <input
        onChange={(e) => {
          setCoupon(e.target.value);
          setDiscountError("");
        }}
        value={coupon}
        type="text"
        placeholder="Have a Coupon?"
        className="couponinput"
      />
      <div className="couponbtns">
        <button
          onClick={validateDiscountCoupon}
          className="mybtn btnsecond couponbtn"
        >
          Apply
        </button>
        <button
          onClick={removeDiscountCoupon}
          className="mybtn btnsecond couponbtn"
        >
          Remove
        </button>
      </div>
    </>
  );

  const handleRetry = () => {
    if (retryFunction === "saveOrderToDb") return saveOrderToDb();
    if (retryFunction === "validateDiscountCoupon")
      return validateDiscountCoupon();
    if (retryFunction === "applyDiscountCoupon") return applyDiscountCoupon();
  };

  return (
    <>
      <div class="cartcont">
        <div class="cartleft">
          {cart.length > 0 ? (
            <>
              <div class="cartleftup">Shopping Cart ({cart.length})</div>
              <hr class="commonruller" />
              <div class="cartleftmiddle">
                {cart.map((p) => (
                  <ProductCardOnCart
                    key={p._id}
                    product={p}
                    calctotalweight={calctotalweight}
                  />
                ))}
              </div>
              <hr class="commonruller" />
              <div class="cartleftdown">
                <div class="subtotalcont">
                  Subtotal ({cart.length} items) :{" "}
                  <span> Rs {getTotal()}.00 </span>
                </div>
                <div class="cartbtnscont">
                  <Link to="/">
                    <button>
                      <div className="cartactionbtncont">
                        <Returnsvg />
                      </div>
                      <span>Continue Shopping</span>
                    </button>
                  </Link>
                  <button onClick={emptyCart}>
                    <div className="cartactionbtncont">
                      <Deletesvg />
                    </div>
                    <span> Empty Cart </span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="emptcont">
              <div className="emptsvg">
                <Emptycartsvg></Emptycartsvg>
              </div>
              <div className="empttxt">
                <p>Your Shopping Cart is Empty</p>
              </div>
              <div className="cartbtnscont">
                <Link to="/">
                  <button>
                    <div>
                      <Returnsvg />
                    </div>
                    <span>Continue Shopping</span>
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
        <div class="cartright">
          <div class="cartrightup">
            <div class="summarycont">Summary</div>

            <div class="summarysubcont">
              <div class="amtcont">
                <span> Subtotal </span>
                <span> Rs. {getTotal()}.00 </span>
              </div>

              <div class="amtcont">
                <span> Shipping fee </span>
                <span> Rs. {shippingfee ? shippingfee : 0}.00 </span>
              </div>

              {discountPersent >= 1 && (
                <div class="amtcont">
                  <span> Discount applied </span>
                  {discountPersent > 0 && (
                    <span>
                      Rs. -{(getTotal() * discountPersent) / 100}
                      .00{" "}
                    </span>
                  )}
                </div>
              )}

              {cart.length > 0 && (
                <div class="couponcont">
                  {showApplyCoupon()}
                  {discountError && (
                    <p className="bg-danger p-2">{discountError}</p>
                  )}
                </div>
              )}
              <div class="totalamt amtcont">
                <span> Total </span>
                {discountPersent > 0 ? (
                  <span>
                    Rs.{" "}
                    {getTotal() -
                      (getTotal() * discountPersent) / 100 +
                      shippingfee}
                    .00{" "}
                  </span>
                ) : (
                  <span> Rs. {getTotal() + shippingfee}.00 </span>
                )}
              </div>
              {user ? (
                <button
                  onClick={
                    couponString.applied ? applyDiscountCoupon : saveOrderToDb
                  }
                  className="checkoutbtn"
                  disabled={!cart.length}
                >
                  <Tooltip title={!cart.length ? "Cart is Empty" : ""}>
                    Checkout
                  </Tooltip>
                </button>
              ) : (
                <Link
                  to={{
                    pathname: "/login",
                    state: { from: "cart" },
                  }}
                >
                  <button className="checkoutbtn">Login to Checkout</button>
                </Link>
              )}
            </div>
          </div>

          <div class="cartrightdown">
            <div class="pmtmethods">
              <span class="pmtmethodshead"> Payment Methods</span>
              <span class="pmtmethodsopt">
                <Visasvg></Visasvg>
                <Mastersvg></Mastersvg>
                <Banksvg></Banksvg>
                <Walletsvg></Walletsvg>
                <Easypaisasvg></Easypaisasvg>
                <CODsvg></CODsvg>
              </span>
            </div>

            <hr />

            <div class="bprotection">
              <span class="pmtmethodshead"> Buyer Protection</span>
              <span class="bprotectionsub">
                <Verifiedsvg />
                <span class="pmtmethodssub">
                  Get full refund if the item is not as described or if is not
                  delivered
                </span>
              </span>
            </div>

            <NoNetModal
              classDisplay={`${noNetModal && "open-popup"}`}
              setNoNetModal={setNoNetModal}
              handleRetry={handleRetry}
            ></NoNetModal>

            <hr />
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
