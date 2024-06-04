import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import Spinner from "../../components/Spinner/Spinner";
import Smallspinner from "../../components/Spinner/Smallspinner";
import { ReactComponent as Logosvg } from "../../images/headersvgs/pearllogo.svg";
import { ReactComponent as Pearlytouchtxt } from "../../images/headersvgs/pearlytouch.svg";
import "./Login.css";
import { useFormik } from "formik";
import { registerSchema } from "../../schemas";
import NoNetModal from "../../components/NoNetModal/NoNetModal";

const Register = ({ history }) => {
  const [loading, setLoading] = useState(false);
  const [noNetModal, setNoNetModal] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    const handleOnlineStatus = () => {
      if (navigator.onLine) {
        setNoNetModal(false);
      }
    };
    window.addEventListener("online", handleOnlineStatus);
    return () => {
      window.removeEventListener("online", handleOnlineStatus);
    };
  }, []);

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user, history]);

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
    validationSchema: registerSchema,
    onSubmit: async (values, action) => {
      if (navigator.onLine) {
        setLoading(true);
        try {
          const config = {
            url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
            handleCodeInApp: true,
          };
          await auth.sendSignInLinkToEmail(values.email, config);

          toast.success(
            `Email is sent to "${values.email}". Click the link to complete your registration.`
          );
          // save user email in local storage
          window.localStorage.setItem("emailForRegistration", values.email);
          // clear state
          action.resetForm();
          setLoading(false);
        } catch (error) {
          // console.error("Error sending sign-in link:", error);
          setLoading(false);
          toast.error("No Internet Connection");
          setNoNetModal(true);
        }
      } else {
        setNoNetModal(true);
      }
    },
  });

  return (
    <div className="container">
      <div className="row">
        <div class="loginmain">
          <div class="logincont">
            <div class="loginheadside">
              {loading ? (
                <div className="spinnerwraper">
                  <div className="bigspinner">
                    <Spinner />
                  </div>
                  <div className="smallspinner loginside">
                    <Smallspinner />
                  </div>
                </div>
              ) : (
                <div class="loginlogo">
                  <Logosvg />
                </div>
              )}
              <div class="welcometxt">Welcome to Pearly</div>
              <div class="guidetxt">Type your Email for Registration</div>
              <form onSubmit={handleSubmit} className="submitionform">
                <div class="logininputcont">
                  <div class="logininput registerinputcont">
                    <label for="email">Email</label>
                    <input
                      name="email"
                      id="email"
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Your email"
                      autoComplete="off"
                      autoFocus
                    />
                    {errors.email && touched.email ? (
                      <p className="errorstate">{errors.email}</p>
                    ) : null}
                  </div>
                  <div className="navigatelink registernavlink">
                    Already have an account? <Link to={`/login`}>Login</Link>
                  </div>
                </div>
                <div class="submitbtncont">
                  <button
                    type="submit"
                    class="submitbtn"
                    disabled={!values.email || isSubmitting}
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>

            <NoNetModal
              classDisplay={`${noNetModal && "open-popup"}`}
              setNoNetModal={setNoNetModal}
              handleRetry={handleSubmit}
            ></NoNetModal>

            <div class="loginfooter">
              <div class="loginfootertxt">
                For further support, you may visit the Help Center or contact{" "}
                our customer service team.
              </div>
              <div class="loginfooterlogocont">
                <div class="loginfooterlogosvg">
                  <Logosvg />
                </div>
                <div class="loginfooterlogotxt">
                  <Pearlytouchtxt />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
