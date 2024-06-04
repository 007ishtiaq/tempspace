import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { getProductAdmin, updateProduct } from "../../../functions/product";
import { getCategories, getCategorySubs } from "../../../functions/category";
import { getSubsSub2 } from "../../../functions/sub";
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";
import AdminsideNavcopy from "../../../components/nav/AdminsideNavcopy";
import { getBrands } from "../../../functions/brands";
import { getColors } from "../../../functions/color";

const initialState = {
  title: "",
  description: "",
  price: "",
  disprice: "",
  category: "",
  subs: "",
  subs2: [],
  shipping: "",
  quantity: "",
  weight: "",
  images: [],
  color: "",
  brand: "",
  onSale: "",
};

const ProductUpdate = ({ match, history }) => {
  // state
  const [values, setValues] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [subOptions, setSubOptions] = useState([]);
  const [sub2Options, setSub2Options] = useState([]);
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [arrayOfSubs2, setArrayOfSubs2] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  // const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));
  // router
  const { slug } = match.params;

  useEffect(() => {
    loadProduct();
    getBrands().then((b) => {
      setBrands(b.data.map((item) => item.name));
    });
    getColors().then((c) => {
      setColors(c.data.map((item) => item.name));
    });
    loadCategories();
  }, []);

  const loadProduct = () => {
    getProductAdmin(slug, user.token).then((p) => {
      // 1 load single proudct
      setValues({ ...values, ...p.data });
      // 2 load single product category subs
      getCategorySubs(p.data.category._id).then((res) => {
        setSubOptions(res.data); // on first load, show default subs
      });
      getSubsSub2(p.data.subs._id).then((res) => {
        setSub2Options(res.data); // on first load, show default subs
      });

      // 3 prepare array of sub ids to show as default sub values in antd Select
      let arr = [];
      p.data.subs2.map((s2) => {
        arr.push(s2._id);
      });
      console.log("ERR", arr);
      setArrayOfSubs2((prev) => arr); // required for ant design select to work
    });
  };

  const loadCategories = () =>
    getCategories().then((c) => {
      // console.log("GET CATEGORIES IN UPDATE PRODUCT", c.data);
      setCategories(c.data);
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    values.category = selectedCategory ? selectedCategory : values.category;
    // values.subs = selectedSubCategory ? selectedSubCategory : values.subs;
    values.subs2 = arrayOfSubs2;

    updateProduct(slug, values, user.token)
      .then((res) => {
        setLoading(false);
        toast.success(`"${res.data.title}" is updated`);
        history.push("/AdminPanel?page=AllProducts");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error(err.response.data.err);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    if (e.target.name === "onSale" && e.target.value === "No")
      setValues({ ...values, onSale: "No", saleTime: "" });
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    // console.log("CLICKED CATEGORY", e.target.value);
    setValues({ ...values, subs: "", subs2: [] });

    setSelectedCategory(e.target.value);

    getCategorySubs(e.target.value).then((res) => {
      setSubOptions(res.data);
    });

    // console.log("EXISTING CATEGORY values.category", values.category);

    // if user clicks back to the original category

    // clear old sub category ids
    setArrayOfSubs2([]);
  };
  const handleSubChange = (e) => {
    e.preventDefault();
    // console.log("CLICKED Sub category", e.target.value);
    setValues({ ...values, subs2: [], subs: e.target.value });
    getSubsSub2(e.target.value).then((res) => {
      // console.log("SUB2 OPTIONS ON Sub CLICK", res);
      setSub2Options(res.data);
    });
  };

  return (
    <div class="manageacmaincont">
      <div class="manageaccont">
        <AdminsideNavcopy currentActive="AllProducts" />
        <div class="navrightside">
          <div className="col-md-10">
            {loading ? (
              <LoadingOutlined className="text-danger h1" />
            ) : (
              <h4>Product update</h4>
            )}

            {/* {JSON.stringify(values)} */}

            <div className="p-3">
              <FileUpload
                values={values}
                setValues={setValues}
                setLoading={setLoading}
              />
            </div>

            <ProductUpdateForm
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              setValues={setValues}
              values={values}
              brands={brands}
              colors={colors}
              handleCategoryChange={handleCategoryChange}
              handleSubChange={handleSubChange}
              categories={categories}
              subOptions={subOptions}
              sub2Options={sub2Options}
              arrayOfSubs2={arrayOfSubs2}
              setArrayOfSubs2={setArrayOfSubs2}
              selectedCategory={selectedCategory}
            />
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
