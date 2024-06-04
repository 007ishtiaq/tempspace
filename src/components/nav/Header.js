import React, { useState, useEffect } from "react";
import "./Header.css";
import { Menu, Badge } from "antd";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { Detector } from "react-detect-offline";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Search from "../forms/Search";
import { ReactComponent as Logosvg } from "../../images/headersvgs/pearllogo.svg";
import { ReactComponent as Pearlytouchtxt } from "../../images/headersvgs/pearlytouch.svg";
import { ReactComponent as Cartsvg } from "../../images/headersvgs/Cartsvg.svg";
import { ReactComponent as Personsvg } from "../../images/headersvgs/Personsvg.svg";
// import { ReactComponent as Applesvg } from "../../images/headersvgs/Applesvg.svg";
import { ReactComponent as Adminsvg } from "../../images/acnav/admin.svg";
import { ReactComponent as Managesvg } from "../../images/acnav/manage.svg";
import { ReactComponent as Orderssvg } from "../../images/acnav/orders.svg";
import { ReactComponent as Reviewssvg } from "../../images/acnav/reviews.svg";
import { ReactComponent as Wishlistsvg } from "../../images/acnav/wishlist.svg";
import { ReactComponent as Returnssvg } from "../../images/acnav/returns.svg";
// import { ReactComponent as Catecornersvg } from "../../images/headersvgs/catetopcorner.svg";
import { getRelatedStaticText } from "../../functions/staticText";
import BurdermenuSmall from "../SliderDiv/categoriesPanal/BurdermenuSmall";
import { getCategoriesslider } from "../../functions/category";
import "../SliderDiv/SliderDiv.css";
const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");
  const [staticTexts, setStaticTexts] = useState([]);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [categories, setCategories] = useState([]);
  const [netconnection, setNetconnection] = useState(true);
  const [hideOnlineText, setHideOnlineText] = useState(true);

  let dispatch = useDispatch();
  let { user, cart } = useSelector((state) => ({ ...state }));

  let history = useHistory();

  useEffect(() => {
    const handleClickOutside = (event) => {
      const accountDiv = document.getElementById("accounthoverdiv");

      if (accountDiv && !accountDiv.contains(event.target)) {
        // Clicked outside the account dropdown, hide it
        setShowAccountDropdown(false);
      }
    };
    // Add event listener when component mounts
    document.addEventListener("mousedown", handleClickOutside);
    // Clean up event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    getRelatedStaticText("topcouponbar").then((t) => setStaticTexts(t.data));
  }, []);

  const handleClick = (e) => {
    // console.log(e.key);
    setCurrent(e.key);
  };

  useEffect(() => {
    getCategoriesslider().then((res) => {
      setCategories(res.data);
      console.log(res.data);
    });
  }, []);

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    dispatch({
      type: "CLEAR_WISHLIST",
      payload: null,
    });
    history.push("/login");
  };

  function copyToClipboard() {
    var textToCopy = document.querySelector(".top_tag_Center strong").innerText;
    var tempInput = document.createElement("input");
    document.body.appendChild(tempInput);
    tempInput.setAttribute(
      "value",
      staticTexts && staticTexts.length > 0 && staticTexts[0].info2
    );
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    alert(
      "Copied to clipboard: " + staticTexts &&
        staticTexts.length > 0 &&
        staticTexts[0].info2
    );
  }

  const showaccountdiv = () => {
    setShowAccountDropdown((prev) => !prev);
  };

  const htmlToRender = (htmlString) => {
    return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
  };

  return (
    <>
      <div class="headermain">
        <div class="top-header">
          <div class="newsleft">
            <Link to="/HelpCenter">
              <p class="top_tag_Right"> Help Center</p>
            </Link>
          </div>
          <div class="newscenter">
            <p class="top_tag_Center" onClick={copyToClipboard}>
              {htmlToRender(
                staticTexts && staticTexts.length > 0 && staticTexts[0].info1
              )}
            </p>
          </div>
          <div class="newsright">
            <Link to="/ContactUs">
              <p class="top_tag_Right">Contact Now </p>
            </Link>
          </div>
        </div>

        <div id="Mainheader" className="middlemainheader">
          <div class="middle-header">
            <div class="binder">
              <BurdermenuSmall />
              <Link to="/">
                <div class="logodiv">
                  <div class="logo-svgsize">
                    <Logosvg />
                  </div>
                  <div class="logo-txtsize">
                    <Pearlytouchtxt />
                  </div>
                </div>
              </Link>
            </div>

            <Search />

            <div class={`middleheaderrightside ${user ? "authis" : "noauth"}`}>
              <div class="dynamictextdiv">
                {user ? (
                  <p className="namegreeting">Hi, {user.email && user.name}</p>
                ) : (
                  <>
                    <div className="noauthcont noauthbig">
                      <Link to="/login">
                        <button className="noauthbtn">
                          <div className="noauthsvg">
                            <Personsvg />
                          </div>
                          <p> Sign In </p>
                        </button>
                      </Link>
                      <Link to="/register">
                        <button className="noauthbtn regisbtn">
                          <div className="noauthsvg">
                            <Personsvg />
                          </div>
                          <p> Register </p>
                        </button>
                      </Link>
                    </div>
                    <div className="noauthmediam">
                      <div className="noauthcont">
                        <Link to="/login">
                          <button className="noauthbtn">
                            <div className="noauthsvg">
                              <Personsvg />
                            </div>
                            <p> Login </p>
                          </button>
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {user && (
                <div
                  id="accounthoverdiv"
                  className={showAccountDropdown && "active"}
                  onClick={showaccountdiv}
                >
                  <div className="cartsvg">
                    <Personsvg />
                  </div>
                  {showAccountDropdown && (
                    <div id="accountdiv" class="accountlistdiv">
                      <div class="accountlist">
                        <div class="accountlistbtndiv">
                          {user && (
                            <Link to="" class="accountlistbtn" onClick={logout}>
                              <span>Logout</span>{" "}
                            </Link>
                          )}
                        </div>

                        {user && (
                          <dv>
                            {user && user.role === "admin" && (
                              <>
                                <Link
                                  to="/AdminPanel?page=AdminDashboard"
                                  class="accountlistlinks"
                                >
                                  <div className="acsvg">
                                    <Adminsvg />
                                  </div>
                                  Admin Dashboard
                                </Link>
                              </>
                            )}
                            <Link
                              to="/ManageMyAc?page=Manageac"
                              class="accountlistlinks"
                            >
                              <div className="acsvg">
                                <Managesvg />
                              </div>
                              Manage My Acccount
                            </Link>
                            <Link
                              to="/ManageMyAc?page=userOrders"
                              class="accountlistlinks"
                            >
                              <div className="acsvg">
                                <Orderssvg />
                              </div>
                              My Orders
                            </Link>
                            <Link
                              to="/ManageMyAc?page=userReviews"
                              class="accountlistlinks"
                            >
                              <div className="acsvg">
                                <Reviewssvg />
                              </div>
                              My Reviews
                            </Link>
                            <Link
                              to="/ManageMyAc?page=userWishlist"
                              class="accountlistlinks"
                            >
                              <div className="acsvg">
                                <Wishlistsvg />
                              </div>
                              My Wishlist
                            </Link>
                            <Link
                              to="/ManageMyAc?page=userCancellations"
                              class="accountlistlinks"
                            >
                              <div className="acsvg">
                                <Returnssvg />
                              </div>
                              My Returns & Cancellations
                            </Link>
                          </dv>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
              <div id="cartbtn" class="cartbtndiv">
                <Link to="/cart">
                  <Badge count={cart.length} offset={[-3, 8]}>
                    <>
                      <div className="noauthbig">
                        <div id="carthoverdiv">
                          <div className="cartsvg">
                            <Cartsvg />
                          </div>
                        </div>
                      </div>
                      <div className="noauthmediam">
                        <div className="noauthcont">
                          <Link to="/cart">
                            <button className="noauthbtn">
                              <div className="noauthsvg">
                                <Cartsvg />
                              </div>
                              <p> Cart </p>
                            </button>
                          </Link>
                        </div>
                      </div>
                    </>
                  </Badge>
                </Link>
              </div>
            </div>
          </div>
          <div
            className={` netnotifier ${
              netconnection ? "connected" : "notconnected"
            } ${hideOnlineText ? "hideonline" : "showonline"}
             `}
          >
            <Detector
              render={({ online }) => {
                if (online) {
                  setNetconnection(true);
                  setTimeout(() => {
                    setHideOnlineText(true);
                  }, 1800);
                } else {
                  setNetconnection(false);
                  setHideOnlineText(false);
                }
                return online ? <p> Online Back </p> : <p> No Connection </p>;
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
