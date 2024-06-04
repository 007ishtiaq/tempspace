import React, { useEffect, useState } from "react";
import "./productreviews.css";
import { ReactComponent as Personsvg } from "../../images/productpage/personsvg.svg";
import { ReactComponent as Verified } from "../../images/productpage/verified.svg";
import { ReactComponent as Downbtn } from "../../images/productpage/downbtn.svg";
import { ReactComponent as Nopublicreview } from "../../images/productpage/nopublicreview.svg";
import StarRating from "react-star-ratings";
import Mystars from "../ratingstars/Mystars";
import RatingModal from "../modal/RatingModal";
import { getReviews } from "../../functions/product";
import { Pagination } from "antd";

export default function ProductReviews({
  product,
  productslug,
  onStarClick,
  onModalok,
  star,
  setComment,
  comment,
  setModalVisible,
  modalVisible,
}) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reviewsCount, setReviewsCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadAllReviews();
  }, [page, product]);

  // useEffect(() => {
  //   getProductsCount().then((res) => setProductsCount(res.data));
  // }, []);

  const loadAllReviews = () => {
    setLoading(true);
    getReviews(productslug, page).then((res) => {
      setReviews(res.data.populatedReviews);
      setReviewsCount(res.data.totalReviews);
      setLoading(false);
    });
  };

  function showDate(postedOn) {
    const date = new Date(postedOn);
    const options = {
      // weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const formattedDate = date.toLocaleDateString("en-US", options);

    return formattedDate;
  }

  function CalcAvg() {
    if (product && product.ratings) {
      let ratingsArray = product.ratings;
      let total = [];
      let length = ratingsArray.length;

      ratingsArray.map((r) => total.push(r.star));
      let totalReduced = total.reduce((p, n) => p + n, 0);

      let highest = length * 5;

      let result = (totalReduced * 5) / highest;

      return result.toFixed(1);
    }
  }

  function accumulateStarsByRating(ratings) {
    // const ratings = [
    //   {
    //     star: 4,
    //     comment: "Good job!",
    //     postedBy: "user123",
    //     postedOn: 1632496800000,
    //   },
    //   {
    //     star: 3,
    //     comment: "Could be better",
    //     postedBy: "user456",
    //     postedOn: 1632583200000,
    //   },
    //   {
    //     star: 4,
    //     comment: "Well done",
    //     postedBy: "user789",
    //     postedOn: 1632669600000,
    //   },
    //   {
    //     star: 2,
    //     comment: "Needs improvement",
    //     postedBy: "user012",
    //     postedOn: 1632756000000,
    //   },
    //   {
    //     star: 5,
    //     comment: "Excellent!",
    //     postedBy: "user345",
    //     postedOn: 1632842400000,
    //   },
    // ];

    let starAccumulator = {};

    for (let i = 1; i <= 5; i++) {
      starAccumulator[i] = 0;
    }

    for (let i = 0; i < ratings.length; i++) {
      const rating = ratings[i].star;
      if (typeof rating === "number" && !isNaN(rating)) {
        starAccumulator[rating]++;
      }
    }

    return Object.entries(starAccumulator).map(([rating, count]) => ({
      rating: parseInt(rating),
      count,
    }));
  }

  // const commentExpand = (e) => {
  //   const reviewtxt = document.querySelector(".reviewtxt");
  //   reviewtxt.classList.toggle("active");
  //   e.currentTarget.classList.toggle("active");
  // };

  function commentExpand(e, review) {
    // Toggle class for reviewtxt
    const reviewtxt = e.currentTarget.previousElementSibling;

    // if (reviewtxt.classList.contains("active")) {
    //   reviewtxt.style.webkitLineClamp = "4";
    // } else {
    //   reviewtxt.style.webkitLineClamp = "initial";
    // }

    reviewtxt.classList.toggle("active");

    // Toggle class for readmorebtn
    const readmorebtn = e.currentTarget;
    readmorebtn.classList.toggle("active");
  }

  return (
    <div class="prodowncont">
      <div class="prodownsub">
        <div class="headingcont">Verified Customer Feedback</div>
        <hr />

        {product.ratings && product.ratings.length > 0 ? (
          <>
            <div class="creviewup">
              <div class="starstatus">
                <div class="reviewcount">
                  Customer Reviews ({product.ratings && product.ratings.length})
                </div>

                <div class="reviewbarcont">
                  {accumulateStarsByRating(product.ratings)
                    .reverse()
                    .map((rating, i) => {
                      return (
                        <div class="reviewbarsingle" key={i}>
                          <p class="starnum">{rating.rating} Stars</p>
                          <div
                            style={{
                              backgroundImage: `linear-gradient(to right, #ff6600 ${
                                (rating.count / product.ratings.length) * 100
                              }%, #c7c7cd ${
                                (rating.count / product.ratings.length) * 100
                              }%)`,
                            }}
                            class="staravgbar"
                          ></div>
                          <div class="starpersent">
                            <span>
                              {(
                                (rating.count / product.ratings.length) *
                                100
                              ).toFixed(0)}
                            </span>
                            %
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div class="staravgcont">
                <div class="staravg">
                  {" "}
                  <span class="totalavg">{CalcAvg()}</span>{" "}
                  <span class="outof">/5</span>{" "}
                </div>
                <Mystars
                  rating={CalcAvg()}
                  containerclass={"reviewstarscont"}
                  StarFullclass={"avgstars"}
                  StarHalfclass={"avgstars avgstar-half"}
                  StarEmptyclass={"avgstars avgstar-empty"}
                ></Mystars>
                <div class="ratingcount"> {product.ratings.length} Ratings</div>
              </div>
              <div class="postnewriew">
                <div class="postheading">Review this product</div>
                <div class="postsub">
                  Share your thoughts with other customers
                </div>
                <RatingModal
                  onModalok={onModalok}
                  setModalVisible={setModalVisible}
                  modalVisible={modalVisible}
                >
                  <StarRating
                    name={product._id}
                    numberOfStars={5}
                    rating={star}
                    changeRating={onStarClick}
                    isSelectable={true}
                    starRatedColor="#ff7800"
                  />
                  <textarea
                    id="comment"
                    className="commenttxtbox"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows="7"
                  />
                </RatingModal>
                ,
                {/* <button class="postbtn">Write a customer review </button> */}
              </div>
            </div>

            <hr />

            <div class="creviewdown">
              <div class="productreviewhead">
                <div class="productreviewleft">Product Reviews</div>
                <div></div>
              </div>
              {reviews &&
                reviews.map((review, i) => {
                  return (
                    <div class="productreviewself" key={i}>
                      <div class="cnamecont">
                        <div class="cimg">
                          <Personsvg class="customersvg"></Personsvg>
                        </div>
                        <div class="cname">
                          <p> {`${review.postedBy.name}`} </p>
                        </div>
                      </div>
                      <div class="creviewcont">
                        <div class="givenstars">
                          <div class="prostarscont">
                            <Mystars
                              rating={review.star}
                              containerclass={"prostarsspan"}
                              StarFullclass={"prostars"}
                              StarHalfclass={"prostars star-half"}
                              StarEmptyclass={"prostars star-empty"}
                            ></Mystars>
                            <span>{review.star.toFixed(1)}</span>
                          </div>
                        </div>
                        <div class="reviewposttime">
                          <span>Reviewed on {showDate(review.postedOn)}</span>
                        </div>

                        <div class="varifiedcont">
                          <Verified></Verified>
                          <div class="varifiedtxt">Verified Purchase </div>
                        </div>

                        <div class="reviewtxt">{review.comment}</div>

                        <button
                          class={`readmorebtn ${
                            review.comment.length <= 480 && "hidebtn"
                          }`}
                          onClick={(e) => commentExpand(e, review)}
                        >
                          <Downbtn className="downbtn"></Downbtn>
                          <span> Read more </span>
                        </button>
                      </div>
                    </div>
                  );
                })}

              <div class="productreviewbottom">
                <div class="previewpagination">
                  <Pagination
                    current={page}
                    total={(reviewsCount / 5) * 10}
                    onChange={(value) => setPage(value)}
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <div class="creviewempty">
            <Nopublicreview></Nopublicreview>
            <div class="emptyreviewtxt">
              Customers who have bought this product have not <br class="br" />{" "}
              yet posted comments
            </div>
            <div class="emptyreviewtxt">
              <RatingModal
                onModalok={onModalok}
                setModalVisible={setModalVisible}
                modalVisible={modalVisible}
              >
                <StarRating
                  name={product._id}
                  numberOfStars={5}
                  rating={star}
                  changeRating={onStarClick}
                  isSelectable={true}
                  starRatedColor="#ff7800"
                />
                <textarea
                  id="comment"
                  className="commenttxtbox"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  cols="63"
                  rows="7"
                />
              </RatingModal>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
