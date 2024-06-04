import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import { getCategories, getCategorySubs } from "../../../functions/category";
import { getSubsSub2 } from "../../../functions/sub";
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";
import { getBrands } from "../../../functions/brands";
import { getColors } from "../../../functions/color";

const initialState = {
  title: "Macbook Pro",
  description: "This is the best Apple product",
  price: "45000",
  disprice: "",
  categories: [],
  category: "",
  subs: "",
  subs2: [],
  shipping: "Yes",
  quantity: "50",
  weight: "500",
  images: [],
  colors: [],
  brands: [],
  color: "White",
  brand: "Apple",
  onSale: "No",
  saleTime: "",
};

const ProductCreate = () => {
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [sub2Options, setSub2Options] = useState([]);
  const [showSub, setShowSub] = useState(false);
  const [showSub2, setShowSub2] = useState(false);
  const [loading, setLoading] = useState(false);

  // redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    const fetchData = async () => {
      await loadCategories();

      const colorsData = await getColors();
      setValues((prevValues) => ({
        ...prevValues,
        colors: colorsData.data.map((item) => item.name),
      }));

      const brandsData = await getBrands();
      setValues((prevValues) => ({
        ...prevValues,
        brands: brandsData.data.map((item) => item.name),
      }));
    };

    fetchData();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setValues({ ...values, categories: c.data }));

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(values, user.token)
      .then((res) => {
        console.log(res);
        window.alert(`"${res.data.title}" is created`);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        // if (err.response.status === 400) toast.error(err.response.data);
        toast.error(err.response.data.err);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    if (e.target.name === "onSale" && e.target.value === "No")
      setValues({ ...values, onSale: "No", saleTime: "" });
  };

  const handleCatagoryChange = (e) => {
    e.preventDefault();
    console.log("CLICKED CATEGORY", e.target.value);
    setValues({ ...values, subs: "", subs2: [], category: e.target.value });
    getCategorySubs(e.target.value).then((res) => {
      console.log("SUB OPTIONS ON CATGORY CLICK", res);
      setSubOptions(res.data);
    });
    setShowSub(true);
  };
  const handleSubChange = (e) => {
    e.preventDefault();
    console.log("CLICKED Sub category", e.target.value);
    setValues({ ...values, subs2: [], subs: e.target.value });
    getSubsSub2(e.target.value).then((res) => {
      console.log("SUB2 OPTIONS ON Sub CLICK", res);
      setSub2Options(res.data);
    });
    setShowSub2(true);
  };

  return (
    <div className="col-md-10">
      {loading ? (
        <LoadingOutlined className="text-danger h1" />
      ) : (
        <h4>Product create</h4>
      )}
      <hr />

      {/* {JSON.stringify(values)} */}

      <div className="p-3">
        <FileUpload
          values={values}
          setValues={setValues}
          setLoading={setLoading}
        />
      </div>

      <ProductCreateForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        setValues={setValues}
        values={values}
        handleCatagoryChange={handleCatagoryChange}
        handleSubChange={handleSubChange}
        subOptions={subOptions}
        sub2Options={sub2Options}
        showSub={showSub}
        showSub2={showSub2}
      />
      {/* {JSON.stringify(initialState.brands)} */}
    </div>
  );
};

export default ProductCreate;
