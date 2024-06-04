import React, { useState } from "react";
import classes from "./CategoriesPanal.module.css";
import { Link } from "react-router-dom";
import { ReactComponent as Applesvg } from "../../../images/headersvgs/Applesvg.svg";
import CategorylistSkull from "../../Skeletons/CategorylistSkull";

const CategoriesPanal = (props) => {
  const { loading, Categories } = props;
  const [subCategories, setsubCategories] = useState([]);
  const [showPanal, setshowPanal] = useState("none");

  const htmlToRender = (htmlString) => {
    return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
  };

  const handleHover = (category) => {
    setsubCategories(category.children);
    setshowPanal("flex");
  };
  const handleave = () => {
    setshowPanal("none");
  };

  return (
    <>
      <div className="categorynavcont homepagecatenav">
        <ul className="categorylist_ul">
          {loading ? (
            <CategorylistSkull></CategorylistSkull>
          ) : (
            Categories &&
            Categories.map((category) => {
              return (
                <li
                  onMouseEnter={() => handleHover(category)}
                  key={category._id}
                  onMouseLeave={handleave}
                >
                  <Link
                    to={`/categories/${category._id}`}
                    className="categorylist"
                  >
                    <div className="catesvg">
                      {category.svg ? htmlToRender(category.svg) : "-"}
                    </div>
                    <p> {category.name} </p>
                  </Link>
                </li>
              );
            })
          )}
        </ul>
        <div
          onMouseEnter={() => setshowPanal("flex")}
          onMouseLeave={handleave}
          className={classes.subCatrgoriesmain}
          style={{ display: `${showPanal}` }}
        >
          {subCategories &&
            subCategories.map((category) => {
              return (
                <div className={classes.subcategory} key={category._id}>
                  <span>
                    {" "}
                    <Link to={`/categories/${category._id}`}>
                      {category.name}
                    </Link>
                  </span>
                  {category.children.length > 0 && (
                    <ul className="sub_sub_ul">
                      {category.children.map((child) => (
                        <li key={child._id}>
                          <Link to={`/categories/${child._id}`}>
                            {" "}
                            {child.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default React.memo(CategoriesPanal);
