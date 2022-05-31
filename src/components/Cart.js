import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";
import ProductItem from "./ProductItem";

function Cart() {
  const [rerender, setRerender] = useState(false);
  const [recommendList, setRecommendList] = useState({
    isLoaded: false,
    products: [],
  });
  const { setTotalCart, createRecommendList } = useContext(AppContext);

  useEffect(() => {
    fetch(
      "https://makeup-api.herokuapp.com/api/v1/products.json?product_type=bronzer"
    )
      .then((res) => res.json())
      .then((data) => {
        setRecommendList({ isLoaded: true, products: data });
      });
  }, []);

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let totalPrice = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  let changeQty = (index, num) => {
    if (cart[index].qty + num > 0) cart[index].qty += num;
    localStorage.setItem("cart", JSON.stringify(cart));
    setTotalCart(cart.reduce((total, item) => total + item.qty, 0));
    setRerender(!rerender);
  };

  let deleteFromCart = (index) => {
    if (window.confirm("Bạn muốn xóa sản phẩm này?")) {
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      setTotalCart(cart.reduce((total, item) => total + item.qty, 0));
      setRerender(!rerender);
    }
  };

  return (
    <div className="body-cart pb-4">
      <div className="container">
        <span className="fs-3 py-4 d-block d-none d-sm-block">
          Giỏ Hàng Của Bạn{" "}
          <span className="fs-6 text-secondary">(3 sản phẩm)</span>
        </span>
        <div className="row">
          <div className="col-lg-8">
            {/* caution moblie */}
            <div className="my-2 bg-white card-item-wrap d-block d-sm-none">
              <span className="d-block fs-7 py-2 px-3 cart-caution">
                Thông báo: Lixibox đã bắt đầu xử lý lại đơn hàng và bàn giao đến
                đơn vị vận chuyển. Tuy nhiên, trong thời gian giãn cách xã hội,
                đơn hàng của quý khách sẽ giao chậm trễ hơn bình thường, một số
                khu vực phong toả có thể tạm ngưng đến khi có thông tin mới
                nhất. Lixibox rất mong quý khách thông cảm.
              </span>
            </div>
            {/* cart list */}
            <div className="cart-item-wrap bg-white">
              <ul className="list-group list-group-flush mx-1">
                {cart.map((item, index) => (
                  <li className="list-group-item-cart cursor-pointer mx-3 py-2">
                    <div className="row w-100 align-items-center d-flex">
                      <Link
                        to={`/shop/${item.id}`}
                        className="col-md-2 col-4 text-center"
                      >
                        <img
                          src={item.imgURL}
                          alt=""
                          className="cart-item-img"
                        />
                      </Link>
                      <Link to={`/shop/${item.id}`} className="col-md-4 col-2">
                        <span className="card-text-wrap cart-item-name">
                          {item.name}
                        </span>
                        <span className="card-text-wrap cart-item-name-brand">
                          {item.color ? `color: ${item.color}` : ""}
                        </span>
                      </Link>
                      <div className="d-block col-md-2 col-2">
                        <span className="fs-6">${item.price} </span>
                      </div>
                      <div className="d-flex align-items-center col-md-2 col-3">
                        <i
                          className="bi bi-dash fs-4 text-secondary icon-quality"
                          onClick={() => changeQty(index, -1)}
                        ></i>
                        <span className="px-2">{item.qty}</span>
                        <i
                          className="bi bi-plus fs-4 text-secondary icon-quality"
                          onClick={() => changeQty(index, 1)}
                        ></i>
                      </div>
                      {/* button delete */}
                      <div className="col-md-2 text-center d-lg-block d-none">
                        <button
                          type="button"
                          className="btn btn-light text-secondary"
                          onClick={() => deleteFromCart(index)}
                        >
                          <i className="bi bi-trash pe-2"></i>Xóa
                        </button>
                      </div>
                      <div className="col-1 col-md-2 text-center text-secondary d-block d-lg-none">
                        <i className="bi bi-x-lg"></i>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            {/* promo code mobile*/}
            <div className="bg-white mt-3 py-2 px-3 cart-item-wrap d-block d-sm-none">
              <label htmlFor="inputState" className="form-label fs-6 fw-500">
                <i className="bi bi-tag pe-2"></i>Mã giảm giá
              </label>
              <select
                id="inputState"
                className="form-select fs-7 cursor-pointer"
              >
                <option selected>Mã giảm giá</option>
                <option>...</option>
              </select>
              <div className="promo-code d-flex justify-content-between align-items-center position-relative my-3">
                <span className="d-block fw-500 fs-7 py-4 px-3 text-primary">
                  APPLXB
                </span>
                <span className="d-block fs-8 pe-1">
                  Giảm Thêm 5% cho khách hàng mới với đơn hàng đầu tiên tại App
                  Lixibox (số điện thoại chưa từng mua hàng)
                </span>
                <div className="promo-code-border position-absolute"></div>
              </div>
            </div>
            {/* cart promo */}
            <div className="mt-3 cart-item-wrap bg-white">
              <span className="fs-3 d-block py-1 text-center product-title text-dark">
                ƯU ĐÃI CHO BẠN
              </span>
              <div className="product-promo">
                <div className="row">
                  <div className="col-md-12">
                    {/* Carousel indicators */}
                    <div
                      id="carousel-product-promo"
                      className="carousel slide"
                      data-bs-ride="carousel"
                    >
                      <div className="carousel-indicators carousel-indicators-product">
                        <button
                          type="button"
                          data-bs-target="#carousel-product-promo"
                          data-bs-slide-to="0"
                          className="active"
                          aria-current="true"
                          aria-label="Slide 1"
                        ></button>
                        <button
                          type="button"
                          data-bs-target="#carousel-product-promo"
                          data-bs-slide-to="1"
                          aria-label="Slide 2"
                        ></button>
                        <button
                          type="button"
                          data-bs-target="#carousel-product-promo"
                          data-bs-slide-to="2"
                          aria-label="Slide 3"
                        ></button>
                      </div>
                      <div className="carousel-inner px-5-md py-4-md">
                        {recommendList.isLoaded ? (
                          createRecommendList(recommendList.products).map(
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
                            <img
                              src="assets/img/Loading_icon.gif"
                              alt="loading"
                            />
                          </div>
                        )}
                      </div>
                      <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#carousel-product-promo"
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
                        data-bs-target="#carousel-product-promo"
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
          </div>
          <div className="col-lg-4">
            {/* button pc*/}
            <div className="d-lg-flex d-none">
              <Link to="/shop" className="btn btn-add-like w-50 fs-6 me-3">
                MUA THÊM
              </Link>
              <button className="btn btn-pink w-50 fs-6" type="submit">
                ĐẶT HÀNG
              </button>
            </div>
            {/* caution pc */}
            <div className="my-3 bg-white card-item-wrap d-sm-block d-none">
              <span className="d-block fs-7 py-2 px-3 cart-caution">
                Thông báo: Lixibox đã bắt đầu xử lý lại đơn hàng và bàn giao đến
                đơn vị vận chuyển. Tuy nhiên, trong thời gian giãn cách xã hội,
                đơn hàng của quý khách sẽ giao chậm trễ hơn bình thường, một số
                khu vực phong toả có thể tạm ngưng đến khi có thông tin mới
                nhất. Lixibox rất mong quý khách thông cảm.
              </span>
            </div>
            {/* promo code pc*/}
            <div className="bg-white py-2 px-3 cart-item-wrap d-sm-block d-none">
              <label htmlFor="inputState" className="form-label fs-6 fw-500">
                <i className="bi bi-tag pe-2"></i>Mã giảm giá
              </label>
              <select
                id="inputState"
                className="form-select fs-7 w-100 cursor-pointer"
              >
                <option selected>Mã giảm giá</option>
                <option>...</option>
              </select>
              <div className="promo-code d-flex justify-content-between align-items-center position-relative my-3">
                <span className="d-block fw-500 fs-7 py-4 px-3 text-primary">
                  APPLXB
                </span>
                <span className="d-block fs-8 pe-1">
                  Giảm Thêm 5% cho khách hàng mới với đơn hàng đầu tiên tại App
                  Lixibox (số điện thoại chưa từng mua hàng)
                </span>
                <div className="promo-code-border position-absolute"></div>
              </div>
            </div>
            {/* cart price */}
            <div className="bg-white my-3 py-3 px-4 cart-item-wrap">
              <div className="d-flex justify-content-between">
                <span className="text-secondary d-inline-block py-1">
                  Tiền hàng:
                </span>
                <span>${totalPrice}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="text-secondary d-inline-block py-1">
                  Giảm giá:
                </span>
                <span>$0</span>
              </div>
              {/* Totol price pc */}
              <div className="d-flex justify-content-between mt-2 pt-2 border-top d-none d-lg-flex">
                <span className="text-secondary d-inline-block">Tạm tính:</span>
                <span className="text-pink-primary">${totalPrice}</span>
              </div>
            </div>
            {/* Lixicoin */}
            <div className="bg-white my-3 py-3 px-4 cart-item-wrap d-none d-sm-block">
              <span className="d-block text-center fs-7">Bạn sẽ nhận được</span>
              <span className="d-block text-center fs-2">
                {totalPrice} Lixicoin
              </span>
            </div>
          </div>
        </div>

        {/* button total price mobile */}
        <div className="container d-block d-lg-none fixed-bottom">
          <div className="bg-white cart-item-wrap p-3">
            <div className="d-flex justify-content-between mb-2">
              <span className="text-secondary d-inline-block">Tạm tính:</span>
              <span className="text-pink-primary">2.458.000 ₫</span>
            </div>
            <button className="btn btn-pink w-100 fs-6" type="submit">
              ĐẶT HÀNG
            </button>
          </div>
        </div>
        <div className="container d-block d-lg-none">
          <div style={{ height: "82px" }}></div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
