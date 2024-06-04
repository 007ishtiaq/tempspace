import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Menu, Slider, Checkbox, Radio } from "antd";
import {
  getProductsByCount,
  fetchProductsByFilter,
  getHighestPrice,
} from "../../functions/product";
import { getCategories } from "../../functions/category";
import { getSubs } from "../../functions/sub";
import { getBrands } from "../../functions/brands";
import { getColors } from "../../functions/color";
import { ReactComponent as StarFull } from "../../images/searchpage/starfull.svg";
import { ReactComponent as StarHalf } from "../../images/searchpage/starhalf.svg";
import { ReactComponent as StarEmpty } from "../../images/searchpage/starempty.svg";
import { ReactComponent as Clearsvg } from "../../images/clear.svg";

const { SubMenu, ItemGroup } = Menu;

export default function SearchFilter({ products, setProducts }) {
  const [price, setPrice] = useState([0, 0]); // price range search
  const [categories, setCategories] = useState([]); // to show the available list of categories
  const [categoryIds, setCategoryIds] = useState([]); // selected categories to search
  const [star, setStar] = useState("");
  const [subs, setSubs] = useState([]);
  const [sub, setSub] = useState("");
  const [brands, setBrands] = useState([]); // to show the available list of brands
  const [brand, setBrand] = useState("");
  const [colors, setColors] = useState([]); // to show the available list of colors
  const [color, setColor] = useState("");
  const [shipping, setShipping] = useState("");
  const [highestPrice, setHighestPrice] = useState(0); // Highest Price for price filter

  let dispatch = useDispatch();
  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  useEffect(() => {
    // loadAllProducts();
    // fetch categories
    getCategories().then((res) => setCategories(res.data));
    // fetch subcategories
    getSubs().then((res) => setSubs(res.data));
    // fetch brands (as set state is saprate for each value so no need to use async)
    getBrands().then((b) => {
      setBrands(b.data.map((item) => item.name));
    });
    // fetch colors (as set state is saprate for each value so no need to use async)
    getColors().then((c) => {
      setColors(c.data.map((item) => item.name));
    });
    // fetch Highest available price
    getHighestPrice().then((res) => {
      setHighestPrice(res.data);
    });
  }, []);

  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data);
    });
  };

  // 1. load products by default on page load
  const loadAllProducts = () => {
    getProductsByCount(12).then((p) => {
      setProducts(p.data);
      // setLoading(false);
    });
  };

  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });

      if (!text) {
        loadAllProducts();
      }
    }, 300);
    return () => clearTimeout(delayed);
  }, []);

  // 2. load products on user search input
  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });

      if (
        !text &&
        categoryIds.length < 1 &&
        !brand &&
        price[0] === 0 &&
        price[1] === 0 &&
        !star &&
        !sub &&
        !color &&
        !shipping
      ) {
        loadAllProducts();
      }

      if (text) {
        // reset
        setCategoryIds([]);
        setPrice([0, 0]);
        setStar("");
        setSub("");
        setBrand("");
        setColor("");
        setShipping("");
      }
    }, 500);
    return () => clearTimeout(delayed);
  }, [text]);

  // 3. load products based on price range
  useEffect(() => {
    if (price[0] > 1 || price[1] > 1) {
      fetchProducts({ price });
    }
  }, [price]);

  const handleSlider = (value) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });

    // reset
    setCategoryIds([]);
    setPrice(value);
    setStar("");
    setSub("");
    setBrand("");
    setColor("");
    setShipping("");
    // setTimeout(() => {
    //   setOk(!ok);
    // }, 300);
  };

  // 4. load products based on category
  // show categories in a list of checkbox
  const showCategories = () =>
    categories.map((c) => (
      <div key={c._id}>
        <Checkbox
          onChange={handleCheck}
          className="pb-2 pl-4 pr-4 pt-2"
          value={c._id}
          name="category"
          checked={categoryIds.includes(c._id)}
        >
          {c.name}
        </Checkbox>
        <br />
      </div>
    ));

  // handle check for categories
  const handleCheck = (e) => {
    // reset
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setStar("");
    setSub("");
    setBrand("");
    setColor("");
    setShipping("");
    // console.log(e.target.value);
    let inTheState = [...categoryIds];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked); // index or -1

    // indexOf method ?? if not found returns -1 else return index [1,2,3,4,5]
    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      // if found pull out one item from index
      inTheState.splice(foundInTheState, 1);
    }

    setCategoryIds(inTheState);
    // console.log(inTheState);
    fetchProducts({ category: inTheState });

    if (inTheState.length < 1) {
      loadAllProducts();
    }
  };

  // 7. show products based on brand name
  const showBrands = () =>
    brands.map((b) => (
      <Radio
        key={b}
        value={b}
        name={b}
        checked={b === brand}
        onChange={handleBrand}
        className="pb-1 pl-4 pr-4"
      >
        {b}
      </Radio>
    ));

  const handleBrand = (e) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setColor("");
    setBrand(e.target.value);
    setShipping("");
    fetchProducts({ brand: e.target.value });
  };

  // 5. show products by star rating
  const showStars = () => (
    <div class="filtersub">
      <ul class="cateul">
        <li onClick={() => handleStarClick(5)}>
          <label htmlFor="star5">
            <Radio id="star5" type="radio" checked={star === 5} />
            <div class="filterstars">
              <StarFull></StarFull>
              <StarFull></StarFull>
              <StarFull></StarFull>
              <StarFull></StarFull>
              <StarFull></StarFull>
            </div>
            <span>& Above</span>
          </label>
        </li>
        <li onClick={() => handleStarClick(4)}>
          <label htmlFor="star4">
            <Radio id="star4" type="radio" checked={star === 4} />
            <div class="filterstars">
              <StarFull></StarFull>
              <StarFull></StarFull>
              <StarFull></StarFull>
              <StarFull></StarFull>
              <StarEmpty></StarEmpty>
            </div>
            <span>& Above</span>
          </label>
        </li>
        <li onClick={() => handleStarClick(3)}>
          <label htmlFor="star3">
            <Radio id="star3" type="radio" checked={star === 3} />
            <div class="filterstars">
              <StarFull></StarFull>
              <StarFull></StarFull>
              <StarFull></StarFull>
              <StarEmpty></StarEmpty>
              <StarEmpty></StarEmpty>
            </div>
            <span>& Above</span>
          </label>
        </li>
        <li onClick={() => handleStarClick(2)}>
          <label htmlFor="star2">
            <Radio id="star2" type="radio" checked={star === 2} />
            <div class="filterstars">
              <StarFull></StarFull>
              <StarFull></StarFull>
              <StarEmpty></StarEmpty>
              <StarEmpty></StarEmpty>
              <StarEmpty></StarEmpty>
            </div>
            <span>& Above</span>
          </label>
        </li>
        <li onClick={() => handleStarClick(1)}>
          <label htmlFor="star1">
            <Radio id="star1" type="radio" checked={star === 1} />
            <div class="filterstars">
              <StarFull></StarFull>
              <StarEmpty></StarEmpty>
              <StarEmpty></StarEmpty>
              <StarEmpty></StarEmpty>
              <StarEmpty></StarEmpty>
            </div>
            <span>& Above</span>
          </label>
        </li>
      </ul>
    </div>
  );

  const handleStarClick = (num) => {
    // console.log(num);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar(num);
    setSub("");
    setBrand("");
    setColor("");
    setShipping("");
    fetchProducts({ stars: num });
  };

  // 6. show products by sub category
  const showSubs = () =>
    subs.map((s) => (
      <div
        key={s._id}
        onClick={() => handleSub(s)}
        className="p-1 m-1 badge badge-secondary"
        style={{ cursor: "pointer" }}
      >
        {s.name}
      </div>
    ));

  const handleSub = (sub) => {
    // console.log("SUB", sub);
    setSub(sub);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setBrand("");
    setColor("");
    setShipping("");
    fetchProducts({ sub });
  };

  // 8. show products based on color
  const showColors = () =>
    colors.map((c) => (
      <Radio
        key={c}
        value={c}
        name={c}
        checked={c === color}
        onChange={handleColor}
        className="pb-1 pl-4 pr-4"
      >
        {c}
      </Radio>
    ));

  const handleColor = (e) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setBrand("");
    setColor(e.target.value);
    setShipping("");
    fetchProducts({ color: e.target.value });
  };

  // 9. show products based on shipping yes/no
  const showShipping = () => (
    <>
      <Checkbox
        className="pb-2 pl-4 pr-4"
        onChange={handleShippingchange}
        value="Yes"
        checked={shipping === "Yes"}
      >
        Yes
      </Checkbox>

      <Checkbox
        className="pb-2 pl-4 pr-4"
        onChange={handleShippingchange}
        value="No"
        checked={shipping === "No"}
      >
        No
      </Checkbox>
    </>
  );

  const Clearfilter = () => {
    loadAllProducts();

    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });

    // reset
    setCategoryIds([]);
    setPrice([0, 0]);
    setStar("");
    setSub("");
    setBrand("");
    setColor("");
    setShipping("");
    // setTimeout(() => {
    //   setOk(!ok);
    // }, 300);
  };

  const handleShippingchange = (e) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setBrand("");
    setColor("");
    setShipping(e.target.value);
    fetchProducts({ shipping: e.target.value });
  };

  return (
    <div class="filtercont">
      <div onClick={Clearfilter} className="clearfilter btn btnsecond">
        <div className="clearsvgcont">
          <Clearsvg></Clearsvg>
        </div>
        <p>Clear All Filters</p>
      </div>
      <Menu
        defaultOpenKeys={["11", "12", "13", "14", "15", "16", "17"]}
        mode="inline"
      >
        <SubMenu
          class="filtercont"
          key="11"
          title={<div class="filterheading">CATEGORY</div>}
        >
          <div style={{ maringTop: "-10px" }}>{showCategories()}</div>
        </SubMenu>
        <SubMenu
          class="filtercont"
          key="12"
          title={<div class="filterheading">BRAND</div>}
        >
          <div style={{ maringTop: "-10px" }}>{showBrands()}</div>
        </SubMenu>
        <SubMenu
          class="filtercont"
          key="13"
          title={<div class="filterheading">PRICE</div>}
        >
          <div>
            <Slider
              className="ml-4 mr-4"
              tipFormatter={(v) => `$${v}`}
              range
              value={price}
              onChange={handleSlider}
              max={highestPrice}
            />
          </div>
        </SubMenu>
        <SubMenu
          class="filtercont"
          key="14"
          title={<div class="filterheading">PRODUCT RATING</div>}
        >
          <div style={{ maringTop: "-10px" }}>{showStars()}</div>
        </SubMenu>
        <SubMenu
          class="filtercont"
          key="15"
          title={<div class="filterheading">TAGS</div>}
        >
          <div style={{ maringTop: "-10px" }} className="pl-4 pr-4">
            {showSubs()}
          </div>
        </SubMenu>
        <SubMenu
          class="filtercont"
          key="16"
          title={<div class="filterheading">COLOR FAMILY</div>}
        >
          <div style={{ maringTop: "-10px" }} className="pr-5">
            {showColors()}
          </div>
        </SubMenu>
        <SubMenu
          class="filtercont"
          key="17"
          title={<div class="filterheading">FREE SHIPPING</div>}
        >
          <div style={{ maringTop: "-10px" }} className="pr-5">
            {showShipping()}
          </div>
        </SubMenu>
      </Menu>
    </div>
  );
}
