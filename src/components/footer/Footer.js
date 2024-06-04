import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./Footer.css";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { createOptinEmail } from "../../functions/optinEmail";
import { getRelatedStaticText } from "../../functions/staticText";
import { useFormik } from "formik";
import { optinSchema } from "../../schemas";

export default function Footer() {
  const [footertag, setFootertag] = useState([]);
  const [sociallinks, setSociallinks] = useState([]);
  const [trustBadges, setTrustBadges] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    getRelatedStaticText("footertag").then((t) => setFootertag(t.data));
    getRelatedStaticText("footerSocialLink").then((res) =>
      setSociallinks(res.data)
    );
    getRelatedStaticText("footertrustBadges").then((res) =>
      setTrustBadges(res.data)
    );
  }, []);

  const htmlToRender = (htmlString) => {
    return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
  };

  // ---------formik usage--------

  const initialValues = {
    email: "",
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: optinSchema,
    onSubmit: async (values, action) => {
      if (navigator.onLine) {
        toast.promise(createOptinEmail(values.email), {
          loading: "Subscribing to newsletter...",
          success: (res) => {
            action.resetForm();
            return "Successfully Subscribed Newsletter";
          },
          error: (err) => {
            console.log(err);
            return err.response.data.err;
          },
        });
      } else {
        dispatch({
          type: "SET_NETMODAL_VISIBLE",
          payload: true,
        });
      }
    },
  });

  return (
    <footer>
      <div class="optinouter">
        <div class="newsletter">
          <form class="optin-form" onSubmit={handleSubmit}>
            <h3>
              Subscribe to our newsletter to get updates on{" "}
              <br class="brshow" /> our latest offers!
            </h3>
            <div className="optinformcont">
              <div class="footerrow">
                <input
                  name="email"
                  id="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="off"
                  class="optin-input"
                />
                <button type="submit" class="optinbtn">
                  Submit
                </button>
              </div>
              <div className="emptycont">
                {errors.email && touched.email ? (
                  <p className="error-message">{errors.email}</p>
                ) : null}
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="footerouter">
        <div class="footercol">
          <div class="center-footer footerrow">
            <div class="footer-logo-side">
              <div class="footer-logo">
                <div class="logo-svgsize">
                  <svg
                    version="1.0"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 116.000000 161.000000"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <g
                      transform="translate(0.000000,161.000000) scale(0.050000,-0.050000)"
                      stroke="none"
                    >
                      <path d="M1120 3052 c0 -5 31 -54 69 -111 117 -173 111 -263 -32 -481 l-46 -70 74 56 c177 132 280 143 444 44 129 -78 150 -80 94 -8 -135 174 -135 322 0 496 56 72 35 70 -94 -8 -157 -94 -227 -93 -386 10 -68 43 -123 76 -123 72z" />
                      <path d="M691 2547 c-31 -201 -176 -345 -351 -347 -102 -1 -107 -34 -7 -49 214 -32 310 -118 350 -311 28 -134 46 -138 65 -17 31 192 121 279 336 324 114 25 120 29 66 41 -283 64 -350 117 -393 313 -32 148 -49 160 -66 46z" />
                      <path d="M1383 2110 c-144 -36 -143 -39 7 -76 848 -210 889 -1400 58 -1696 -800 -285 -1519 683 -1008 1357 93 123 93 123 38 193 -53 67 -82 47 -201 -137 -455 -697 47 -1615 883 -1615 1053 0 1454 1354 572 1927 -129 84 -172 90 -349 47z" />
                      <path d="M1810 1395 c0 -679 -797 -1026 -1286 -561 -103 98 -107 77 -12 -66 333 -501 1093 -451 1344 87 91 196 81 573 -20 710 -22 30 -26 3 -26 -170z" />
                    </g>
                  </svg>
                </div>
                <svg
                  version="1.0"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 900.000000 183.000000"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <g
                    transform="translate(0.000000,183.000000) scale(0.100000,-0.100000)"
                    stroke="none"
                  >
                    <path d="M3420 1026 c0 -457 2 -515 16 -520 24 -9 172 -7 178 3 3 5 6 237 6 517 l1 509 -101 3 -100 3 0 -515z" />
                    <path d="M8062 1023 l3 -518 95 0 95 0 5 220 c4 160 9 227 19 247 21 41 80 75 142 82 73 8 116 -9 156 -62 l33 -44 0 -224 0 -224 89 0 c49 0 96 3 105 6 14 5 16 30 16 175 0 283 -25 375 -128 470 -70 65 -131 89 -226 89 -57 0 -78 -5 -126 -31 -32 -17 -63 -28 -69 -24 -7 4 -11 68 -11 181 l0 174 -100 0 -100 0 2 -517z" />
                    <path d="M210 953 l0 -453 95 0 c69 0 95 3 96 13 0 6 0 70 -1 140 -1 87 2 133 11 143 9 10 37 14 116 14 161 0 259 29 331 99 140 136 113 348 -58 456 -50 32 -92 36 -363 38 l-227 2 0 -452z m469 261 c49 -19 71 -51 71 -101 0 -48 -22 -81 -66 -99 -39 -16 -240 -19 -264 -4 -12 7 -15 31 -15 105 0 74 3 98 15 105 26 16 215 12 259 -6z" />
                    <path d="M4710 1396 c-6 -6 -10 -45 -10 -87 l0 -77 129 -4 c71 -2 133 -7 138 -11 4 -5 9 -165 10 -355 2 -191 3 -350 3 -354 0 -5 43 -8 95 -8 l95 0 0 349 c0 304 2 352 16 365 12 13 40 16 140 16 l124 0 0 79 c0 44 -5 83 -10 86 -17 11 -720 11 -730 1z" />
                    <path d="M1300 1222 c-79 -25 -112 -45 -163 -102 -76 -84 -91 -126 -91 -255 -1 -103 1 -114 29 -168 78 -156 222 -216 471 -196 60 4 112 8 116 8 4 1 14 8 22 17 16 15 23 114 11 146 -4 11 -36 13 -163 10 -148 -3 -159 -2 -202 20 -52 27 -91 84 -64 95 9 3 31 1 48 -5 18 -7 75 -12 127 -12 158 1 250 47 296 147 20 42 24 64 19 95 -15 95 -85 170 -187 201 -71 22 -196 21 -269 -1z m239 -196 c28 -26 26 -52 -5 -81 -24 -22 -36 -25 -111 -25 -88 0 -153 18 -153 43 0 16 34 49 75 71 43 23 165 18 194 -8z" />
                    <path d="M2125 1223 c-68 -21 -148 -76 -184 -126 -17 -23 -34 -46 -38 -52 -15 -19 -35 -100 -40 -159 -5 -60 11 -131 46 -205 24 -51 98 -118 166 -152 53 -26 73 -30 146 -30 92 -1 143 16 184 61 44 48 85 46 85 -6 0 -43 24 -54 120 -54 49 0 91 4 94 9 4 5 0 22 -8 38 -26 52 -39 127 -43 253 -6 200 -54 310 -168 386 -76 50 -255 69 -360 37z m253 -196 c99 -66 104 -244 9 -321 -33 -26 -48 -31 -107 -34 -85 -5 -142 19 -180 75 -22 31 -25 48 -25 117 0 61 5 88 18 111 23 37 61 66 101 76 52 14 146 1 184 -24z" />
                    <path d="M3110 1222 c-83 -25 -145 -67 -189 -125 -67 -90 -75 -132 -76 -377 l0 -215 98 -3 97 -3 0 205 c0 113 4 216 9 229 25 66 111 117 196 117 l56 0 -3 93 -3 92 -65 2 c-38 1 -88 -5 -120 -15z" />
                    <path d="M3803 1233 c-16 -6 -18 -351 -2 -439 13 -77 51 -152 103 -204 64 -66 107 -83 213 -88 88 -4 95 -3 152 27 71 37 87 28 79 -44 -7 -55 -43 -105 -95 -131 -50 -25 -218 -25 -277 0 -21 9 -40 16 -42 16 -2 0 -4 -42 -4 -94 0 -74 3 -96 16 -107 27 -22 277 -25 349 -4 91 26 160 78 198 150 54 103 52 80 52 515 l0 405 -75 3 c-131 5 -120 25 -120 -219 0 -190 -2 -214 -20 -249 -31 -60 -81 -93 -150 -98 -71 -5 -121 16 -156 67 -24 35 -24 39 -24 256 0 159 -3 224 -12 233 -12 12 -159 16 -185 5z" />
                    <path d="M5695 1221 c-71 -24 -105 -44 -146 -88 -56 -58 -84 -111 -103 -193 -18 -71 -18 -77 0 -150 30 -124 88 -200 198 -258 48 -25 59 -27 186 -27 124 0 139 2 190 26 73 35 137 100 171 177 26 56 29 75 29 163 0 55 -4 107 -10 117 -5 9 -16 34 -25 54 -20 44 -98 129 -140 151 -88 48 -253 61 -350 28z m258 -197 c101 -66 101 -244 1 -320 -34 -26 -45 -29 -119 -29 -74 0 -85 3 -118 28 -54 41 -67 73 -67 167 0 89 13 120 67 155 63 42 171 41 236 -1z" />
                    <path d="M6360 1029 c0 -182 3 -221 20 -278 37 -127 97 -190 216 -232 77 -27 245 -23 309 7 104 50 164 117 198 224 15 47 18 86 15 270 l-3 215 -89 3 c-65 2 -92 -1 -98 -10 -4 -7 -8 -93 -8 -190 0 -243 -20 -315 -98 -352 -42 -21 -125 -20 -168 0 -18 9 -47 37 -64 62 l-30 45 0 208 c0 114 -3 214 -6 223 -5 13 -24 16 -100 16 l-94 0 0 -211z" />
                    <path d="M7520 1223 c-71 -25 -102 -43 -148 -87 -72 -68 -104 -151 -105 -267 -1 -169 69 -285 208 -344 22 -9 76 -22 120 -30 78 -12 97 -11 240 13 l40 7 3 94 3 93 -28 -7 c-63 -16 -192 -27 -235 -21 -52 8 -138 74 -138 106 0 10 -4 22 -10 25 -14 9 -12 83 3 127 16 46 48 82 92 102 45 21 212 22 262 1 19 -8 40 -15 45 -15 5 0 7 43 6 97 l-3 97 -40 12 c-59 18 -260 16 -315 -3z" />
                  </g>
                </svg>
              </div>
              <div class="footer-site-desc">
                <p>{footertag && footertag.length > 0 && footertag[0].info1}</p>
              </div>
              <div class="footer-social-icon">
                {sociallinks &&
                  sociallinks.length > 0 &&
                  sociallinks.map((l, i) => (
                    <Link to={l.info3}>
                      <div key={i} class="socialhover">
                        {htmlToRender(l.info1)}
                        <span> {l.info2} </span>
                      </div>
                    </Link>
                  ))}
              </div>

              {trustBadges && trustBadges.length > 0 && (
                <div class="footer-trust-badges">
                  <img
                    src={trustBadges[0].image.url}
                    alt={trustBadges[0].info1}
                  />
                  <img
                    src={trustBadges[1].image.url}
                    alt={trustBadges[1].info1}
                  />
                  <img
                    class="ss"
                    src={trustBadges[2].image.url}
                    alt={trustBadges[2].info1}
                  />
                  <img
                    src={trustBadges[3].image.url}
                    alt={trustBadges[3].info1}
                  />
                </div>
              )}
            </div>

            <div class="footer-colum">
              <div class="col-heading">Let Us Help You</div>
              <div class="col-ul">
                <ul>
                  <li>
                    <Link to="/ManageMyAc?page=Manageac" class="col-li">
                      Manage Account
                    </Link>
                  </li>
                  <li>
                    <Link to="/ManageMyAc?page=userOrders" class="col-li">
                      My Orders
                    </Link>
                  </li>
                  <li>
                    <Link to="/ManageMyAc?page=userReviews" class="col-li">
                      My Reviews
                    </Link>
                  </li>
                  <li>
                    <Link to="/ManageMyAc?page=userReturns" class="col-li">
                      My Returns
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div class="footer-colum">
              <div class="col-heading">Help & Support</div>
              <div class="col-ul">
                <ul>
                  <li>
                    <Link to="/HelpCenter?page=Payments" class="col-li">
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link to="/HelpCenter?page=Place" class="col-li">
                      Place an Order
                    </Link>
                  </li>
                  <li>
                    <Link to="/HelpCenter?page=Pay" class="col-li">
                      Pay for Order
                    </Link>
                  </li>
                  <li>
                    <Link to="/ReturnandRefundPolicy" class="col-li">
                      Returns & Refunds
                    </Link>
                  </li>

                  <li>
                    <Link to="/ContactUs" class="col-li">
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div class="footer-colum">
              <div class="col-heading">PearlyTouch</div>
              <div class="col-ul">
                <ul>
                  <li>
                    <Link to="/aboutus" class="col-li">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/TermsAndConditions" class="col-li">
                      Terms & Conditions
                    </Link>
                  </li>
                  <li>
                    <Link to="/PrivacyPolicy" class="col-li">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link to="/CookiePolicy" class="col-li">
                      Cookie Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="below-footer">
            <div class="copyright">
              {footertag && footertag.length > 0 && footertag[1].info1}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
