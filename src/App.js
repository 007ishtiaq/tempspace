import React, { useEffect, lazy, Suspense, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { getWishlist } from "./functions/user";
// import axiosInstance from "./functions/axiosInstance";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "./functions/auth";
import { LoadingOutlined } from "@ant-design/icons";
import Footer from "./components/footer/Footer";
import NoNetModal from "./components/NoNetModal/NoNetModal";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ScrollToTop from "./components/Scroll/ScrollToTop";
import GoToTop from "./components/Scroll/GoToTop";

// my imoprts for home 2 jumia
// import Home2 from "./PearlyTouch/Home2";
// import "./App.css";
// import "./Layout.css";
{
  /* <div className="App">
          <div className="Content">
            <Route exact path="/home2" component={Home2} />
          </div>
</div> */
}

// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";
// import Home from "./pages/Home";
// import Header from "./components/nav/Header";

// import RegisterComplete from "./pages/auth/RegisterComplete";
// import ForgotPassword from "./pages/auth/ForgotPassword";
// import UserRoute from "./components/routes/UserRoute";
// import AdminRoute from "./components/routes/AdminRoute";
// import Password from "./pages/user/Password";
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import CategoryCreate from "./pages/admin/category/CategoryCreate";
// import CategoryUpdate from "./pages/admin/category/CategoryUpdate";
// import SubCreate from "./pages/admin/sub/SubCreate";
// import SubUpdate from "./pages/admin/sub/SubUpdate";
// import ProductCreate from "./pages/admin/product/ProductCreate";
// import AllProducts from "./pages/admin/product/AllProducts";
// import ProductUpdate from "./pages/admin/product/ProductUpdate";
// import Product from "./pages/Product";
// import CategoryHome from "./pages/category/CategoryHome";
// import SubHome from "./pages/sub/SubHome";
// import Shop from "./pages/shop/Shop";
// import Cart from "./pages/Cart";
// import Checkout from "./pages/Checkout";
// import CreateCouponPage from "./pages/admin/coupon/CreateCouponPage";
// import Payment from "./pages/Payment";

// using lazy
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Home = lazy(() => import("./pages/Home"));
const Header = lazy(() => import("./components/nav/Header"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));

const RegisterComplete = lazy(() => import("./pages/auth/RegisterComplete"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const ManageMyAccount = lazy(() => import("./pages/user/ManageMyAccount"));
const AdminPanel = lazy(() => import("./pages/admin/AdminPanel"));
const OrderDetails = lazy(() =>
  import("./pages/user/OrderDetails/OrderDetails")
);
const ItemCancel = lazy(() => import("./pages/user/ItemAction/ItemCancel"));
const ItemReturn = lazy(() => import("./pages/user/ItemAction/ItemReturn"));
const RequestSubmitted = lazy(() =>
  import("./pages/user/ItemAction/RequestSubmitted")
);
const UserReviews = lazy(() => import("./pages/user/UserReviews/MyReviews"));
const UserWishlist = lazy(() => import("./pages/user/UserWishlist/MyWishlist"));
const UserRoute = lazy(() => import("./components/routes/UserRoute"));
const AdminRoute = lazy(() => import("./components/routes/AdminRoute"));
const Password = lazy(() => import("./pages/user/Password"));
// const AdminDashboard = lazy(() =>
//   import("./pages/admin/AdminDashboard/AdminDashboard")
// );
const OrderDetail = lazy(() =>
  import("./pages/admin/AdminDashboard/OrderDetail")
);
// const CategoryCreate = lazy(() =>
//   import("./pages/admin/category/CategoryCreate")
// );
const CategoryUpdate = lazy(() =>
  import("./pages/admin/category/CategoryUpdate")
);
const BrandUpdate = lazy(() => import("./pages/admin/brand/BrandUpdate"));
// const BannerCreate = lazy(() =>
//   import("./pages/admin/Slider&Banners/BannerCreate")
// );
const BannerUpdate = lazy(() =>
  import("./pages/admin/Slider&Banners/BannerUpdate")
);
const StaticTextupdate = lazy(() =>
  import("./pages/admin/statictext/StaticTextupdate")
);
// const SubCreate = lazy(() => import("./pages/admin/sub/SubCreate"));
const SubUpdate = lazy(() => import("./pages/admin/sub/SubUpdate"));
// const Sub2Create = lazy(() => import("./pages/admin/sub2/Sub2Create"));
const Sub2Update = lazy(() => import("./pages/admin/sub2/Sub2Update"));
// const ProductCreate = lazy(() => import("./pages/admin/product/ProductCreate"));
// const AllProducts = lazy(() => import("./pages/admin/product/AllProducts"));
const ProductUpdate = lazy(() => import("./pages/admin/product/ProductUpdate"));
const Product = lazy(() => import("./pages/Product"));
const CategoryHome = lazy(() => import("./pages/category/CategoryHome"));
const BrandsHome = lazy(() => import("./pages/brands/BrandsHome"));
const FlashHome = lazy(() => import("./pages/flashsale/FlashHome"));
const SubHome = lazy(() => import("./pages/sub/SubHome"));
const Shop = lazy(() => import("./pages/shop/Shop"));
const Cart = lazy(() => import("./pages/cart/Cart"));
const AboutUs = lazy(() => import("./pages/AboutUs/AboutUs"));
const ContactUs = lazy(() => import("./pages/contactUs/ContactUs"));
const ContactFormSingle = lazy(() =>
  import("./pages/admin/activities/ContactFormSingle")
);
const HelpCenter = lazy(() => import("./pages/helpCenter/HelpCenter"));
const PrivacyPolicy = lazy(() => import("./pages/policies/PrivacyPolicy"));
const CookiePolicy = lazy(() => import("./pages/policies/CookiePolicy"));
const ReturnandRefundPolicy = lazy(() =>
  import("./pages/policies/ReturnandRefundPolicy")
);
const TermsAndConditions = lazy(() =>
  import("./pages/policies/TermsAndConditions")
);
const Checkout = lazy(() => import("./pages/checkout/Checkout"));
const Thankyou = lazy(() => import("./pages/Thankyou/Thankyou"));
const CreateCouponPage = lazy(() =>
  import("./pages/admin/coupon/CreateCouponPage")
);
const CreateShippingPage = lazy(() =>
  import("./pages/admin/shipping/CreateShippingPage")
);
const Payment = lazy(() => import("./pages/Payment"));

const App = () => {
  const [noNetModalshow, setNoNetModalshow] = useState(false);

  const { noNetModal } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();

  useEffect(() => {
    noNetModal && setNoNetModalshow(true);
  }, [noNetModal]);

  useEffect(() => {
    const handleOnlineStatus = () => {
      if (navigator.onLine) {
        setNoNetModalshow(false);
        dispatch({
          type: "SET_NETMODAL_VISIBLE",
          payload: false,
        });
      }
    };
    window.addEventListener("online", handleOnlineStatus);
    return () => {
      window.removeEventListener("online", handleOnlineStatus);
    };
  }, []);

  const handleRetry = async (e) => {
    // e.preventDefault();
  };

  // to check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        // console.log("user", user);

        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));

        getWishlist(idTokenResult.token).then((res) => {
          dispatch({
            type: "USER_WISHLIST",
            payload: res.data.wishlist,
          });
        });
      }
    });
    // cleanup
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Suspense
      fallback={
        <div className="col text-center p-5">
          EC
          <LoadingOutlined /> M
        </div>
      }
    >
      <SkeletonTheme baseColor="#d9d9d9" highlightColor="#bfbfbf">
        <Router>
          <NoNetModal
            classDisplay={`${noNetModalshow && "open-popup"}`}
            setNoNetModal={setNoNetModalshow}
            handleRetry={handleRetry}
          />
          <ScrollToTop />
          <Header />
          <Toaster />
          <GoToTop />
          <Switch>
            {/* common unprotected Routes */}

            <Route exact path="/" component={Home} />
            <Route exact path="/product/:slug" component={Product} />
            <Route exact path="/shop" component={Shop} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/category" component={CategoryHome} />
            <Route
              exact
              path="/category?category=:slug"
              component={CategoryHome}
            />
            <Route exact path="/Flashsale" component={FlashHome} />
            <Route exact path="/brand/" component={BrandsHome} />
            <Route exact path="/brand/?brand=:slug" component={BrandsHome} />
            <Route exact path="/sub/:slug" component={SubHome} />

            <Route exact path="/HelpCenter" component={HelpCenter} />
            <Route exact path="/HelpCenter?page=:page" component={HelpCenter} />
            <Route exact path="/aboutus" component={AboutUs} />
            <Route exact path="/ContactUs" component={ContactUs} />
            <Route exact path="/PrivacyPolicy" component={PrivacyPolicy} />
            <Route
              exact
              path="/ReturnandRefundPolicy"
              component={ReturnandRefundPolicy}
            />
            <Route
              exact
              path="/TermsAndConditions"
              component={TermsAndConditions}
            />
            <Route exact path="/CookiePolicy" component={CookiePolicy} />

            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route
              exact
              path="/register/complete"
              component={RegisterComplete}
            />
            <Route exact path="/forgot/password" component={ForgotPassword} />

            {/* User protected Routes */}

            <UserRoute exact path="/payment" component={Payment} />
            <UserRoute exact path="/checkout" component={Checkout} />
            <UserRoute
              exact
              path="/OrderPlaced/:orderId"
              component={Thankyou}
            />
            <UserRoute exact path="/ManageMyAc" component={ManageMyAccount} />
            <UserRoute
              exact
              path="/ManageMyAc?page=:page"
              component={ManageMyAccount}
            />
            {/* <UserRoute exact path="/user/password" component={Password} /> */}
            <UserRoute exact path="/order/:id" component={OrderDetails} />
            <UserRoute
              exact
              path="/order/:id/itemCancel/:itemid"
              component={ItemCancel}
            />
            <UserRoute
              exact
              path="/order/:id/itemReturn/:itemid"
              component={ItemReturn}
            />
            <UserRoute
              exact
              path="/Request/:requestType/RequestNum/:requestNum"
              component={RequestSubmitted}
            />
            {/* <UserRoute exact path="/user/userreviews" component={UserReviews} />
          <UserRoute exact path="/user/userwishlist" component={UserWishlist} /> */}

            {/* Admin protected Routes */}

            <AdminRoute exact path="/AdminPanel" component={AdminPanel} />
            <AdminRoute
              exact
              path="/AdminPanel?page=:page"
              component={AdminPanel}
            />
            <AdminRoute exact path="/admin/order/:id" component={OrderDetail} />
            <AdminRoute
              exact
              path="/admin/category/:slug"
              component={CategoryUpdate}
            />
            <AdminRoute
              exact
              path="/admin/brand/:slug"
              component={BrandUpdate}
            />
            <AdminRoute
              exact
              path="/admin/banner/:slug"
              component={BannerUpdate}
            />
            <AdminRoute
              exact
              path="/admin/statictext/:slug"
              component={StaticTextupdate}
            />
            <AdminRoute exact path="/admin/sub/:slug" component={SubUpdate} />
            <AdminRoute exact path="/admin/sub2/:slug" component={Sub2Update} />
            <AdminRoute
              exact
              path="/admin/product/:slug"
              component={ProductUpdate}
            />
            <AdminRoute
              exact
              path="/admin/coupon"
              component={CreateCouponPage}
            />
            <AdminRoute
              exact
              path="/admin/shipping"
              component={CreateShippingPage}
            />
            <AdminRoute
              exact
              path="/admin/contact/:id"
              component={ContactFormSingle}
            />
            <Route exact path="*" component={NotFound} />
            <Route component={NotFound} />
          </Switch>
          <Footer />
        </Router>
      </SkeletonTheme>
    </Suspense>
  );
};

export default App;
