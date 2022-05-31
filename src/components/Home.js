import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";
import ProductItem from "./ProductItem";

function Home() {
  const [productList, setProductList] = useState({
    isLoaded: false,
    products: [],
    dior: []
  });

  const {createRecommendList} = useContext(AppContext);

  useEffect(() => {
    fetch("https://makeup-api.herokuapp.com/api/v1/products.json?product_type=lipstick")
      .then((res) => res.json())
      .then((data) => {
        let lipsticksDior = data.filter(item => item.brand == "dior")
        setProductList({ isLoaded: true, products: data, dior: lipsticksDior});
      });
  }, []);

  return (
    <>
      {/* sliders  */}
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="assets/img/banner/banner1.jpg"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="assets/img/banner/banner2.jpg"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="assets/img/banner/banner3.jpg"
              className="d-block w-100"
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon bg-dark"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon bg-dark"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* secondary nav mobile */}
      <div className="container py-3 d-sm-block d-md-none">
        <div className="d-flex justify-content-between">
          <a href="/shop" className=" d-block text-center">
            <img
              src="assets/img/navbar/nav-mobile-1.png"
              style={{ width: "60px" }}
              alt=""
            />
            <span className="d-block fs-8 text-center">Mẹ và Bé</span>
          </a>
          <a href="/shop" className=" d-block text-center">
            <img
              src="assets/img/navbar/nav-mobile-2.png"
              style={{ width: "60px" }}
              alt=""
            />
            <span className="d-block fs-8 text-center">Dưỡng da</span>
          </a>
          <a href="/shop" className=" d-block text-center">
            <img
              src="assets/img/navbar/nav-mobile-3.png"
              style={{ width: "60px" }}
              alt=""
            />
            <span className="d-block fs-8 text-center">Trang điểm</span>
          </a>
          <a href="/shop" className=" d-block text-center">
            <img
              src="assets/img/navbar/nav-mobile-4.png"
              style={{ width: "60px" }}
              alt=""
            />
            <span className="d-block fs-8 text-center">Hộp làm đẹp</span>
          </a>
        </div>
      </div>

      {/* hot product */}
      <div className="container">
        <span className="fs-3 d-block py-4 text-center product-title">
          HOT DEAL
        </span>
        <div className="product-hot">
          <div className="row">
            <div className="col-lg-12">
              <img
                src="assets/img/banner/banner-product-hot.jpg"
                className="w-100"
                alt=""
              />
              {/* Carousel indicators */}
              <div
                id="carousel-product-hot"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-indicators carousel-indicators-product">
                  <button
                    type="button"
                    data-bs-target="#carousel-product-hot"
                    data-bs-slide-to="0"
                    className="active"
                    aria-current="true"
                    aria-label="Slide 1"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carousel-product-hot"
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carousel-product-hot"
                    data-bs-slide-to="2"
                    aria-label="Slide 3"
                  ></button>
                </div>
                <div class="carousel-inner px-3 py-4">
                  {productList.isLoaded ? (
                    createRecommendList(productList.products).map(
                      (item, index) => (
                        <div
                          className={
                            index === 0
                              ? "active carousel-item px-3 py-4"
                              : "carousel-item px-3 py-4"
                          }
                        >
                          <div className="row">
                            {item.map((product) => (
                              <div className="col-lg-3 col-md-4 col-6">
                                <Link to={`/shop/${product.id}`}>
                                  <ProductItem
                                    key={product.id}
                                    product={product}
                                  />
                                </Link>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    )
                  ) : (
                    <div className="loading-img w-100 text-center">
                      <img src="assets/img/Loading_icon.gif" alt="loading" />
                    </div>
                  )}
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carousel-product-hot"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon bg-dark"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carousel-product-hot"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon bg-dark"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* banner mini */}
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 pt-1">
            <img
              src="assets/img/banner/banner-promo1.jpg"
              className="w-100 banner-promo"
              alt=""
            />
          </div>
          <div className="col-md-6 pt-1">
            <img
              src="assets/img/banner/banner-promo2.jpg"
              className="w-100 banner-promo"
              alt=""
            />
          </div>
        </div>
      </div>
      {/* best seller */}
      <div className="container">
        <span className="fs-3 d-block py-4 text-center product-title">
          TOP BÁN CHẠY
        </span>
        <div className="product-top">
          <div className="row">
            <div className="col-md-12">
              <img
                src="assets/img/banner/banner-product-top.jpg"
                className="w-100"
                alt=""
              />
              {/* Carousel indicators */}
              <div
                id="carousel-product-top"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-indicators carousel-indicators-product">
                  <button
                    type="button"
                    data-bs-target="#carousel-product-top"
                    data-bs-slide-to="0"
                    className="active"
                    aria-current="true"
                    aria-label="Slide 1"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carousel-product-top"
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carousel-product-top"
                    data-bs-slide-to="2"
                    aria-label="Slide 3"
                  ></button>
                </div>
                <div className="carousel-inner px-3 py-4">
                  {productList.isLoaded ? (
                    createRecommendList(productList.dior).map(
                      (item, index) => (
                        <div
                          className={
                            index === 0
                              ? "active carousel-item px-3 py-4"
                              : "carousel-item px-3 py-4"
                          }
                        >
                          <div className="row">
                            {item.map((product) => (
                              <div className="col-lg-3 col-md-4 col-6">
                                <Link to={`/shop/${product.id}`}>
                                  <ProductItem
                                    key={product.id}
                                    product={product}
                                  />
                                </Link>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    )
                  ) : (
                    <div className="loading-img w-100 text-center">
                      <img src="assets/img/Loading_icon.gif" alt="loading" />
                    </div>
                  )}
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carousel-product-top"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon bg-dark"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carousel-product-top"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon bg-dark"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*banner promotion */}
      <div className="container mb-4 d-none d-md-block">
        <span className="fs-3 d-block py-4 text-center product-title">
          CHƯƠNG TRÌNH NỔI BẬT
        </span>
        <div className="row">
          <div className="col-md-3 ps-0">
            <a href="">
              <img
                src="assets/img/banner/banner-pro-1.jpg"
                className="w-100 rounded-3"
                style={{ maxHeight: "400px" }}
                alt=""
              />
            </a>
          </div>
          <div className="col-md-3">
            <a href="">
              <img
                src="assets/img/banner/banner-pro-2.jpg"
                className="w-100 rounded-3"
                style={{ maxHeight: "400px" }}
                alt=""
              />
            </a>
          </div>
          <div className="col-md-3">
            <a href="">
              <img
                src="assets/img/banner/banner-pro-3.jpg"
                className="w-100 rounded-3"
                style={{ maxHeight: "400px" }}
                alt=""
              />
            </a>
          </div>
          <div className="col-md-3 pe-0">
            <a href="">
              <img
                src="assets/img/banner/banner-pro-4.jpg"
                className="w-100 rounded-3"
                style={{ maxHeight: "400px" }}
                alt=""
              />
            </a>
          </div>
        </div>
      </div>
      {/* banner promo mobile */}
      <span className="fs-3 d-block py-4 text-center product-title d-sm-block d-md-none">
        CHƯƠNG TRÌNH NỔI BẬT
      </span>
      <div
        id="carouselbanner"
        className="container carousel slide mb-5 d-sm-block d-md-none"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselbanner"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselbanner"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active mb-5">
            <div className="row">
              <img
                src="assets/img/banner/banner-pro-1.jpg"
                className="col-6"
                alt="..."
              />
              <img
                src="assets/img/banner/banner-pro-2.jpg"
                className="col-6"
                alt="..."
              />
            </div>
          </div>
          <div className="carousel-item mb-5">
            <div className="row">
              <img
                src="assets/img/banner/banner-pro-3.jpg"
                className="col-6"
                alt="..."
              />
              <img
                src="assets/img/banner/banner-pro-4.jpg"
                className="col-6"
                alt="..."
              />
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselbanner"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon bg-dark"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselbanner"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon bg-dark"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
}

export default Home;
