import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import BreadCrumb from "./BreadCrumb";
import ProductItem from "./ProductItem";
import { AppContext } from "../App";

function ProductDetail() {
  const { id } = useParams();
  const [recommendList, setRecommendList] = useState({
    isLoaded: false,
    products: [],
  });
  const [dataProduct, setDataProduct] = useState({});
  const [productType, setProductType] = useState("");
  const [srcImg, setSrcImg] = useState("");
  const [colorName, setColorName] = useState("");
  const [readMore, setReadMore] = useState(false);
  const [like, setLike] = useState(false);
  const {setTotalCart, createRecommendList} = useContext(AppContext)

  let totalSlide = 3;
  let itemPerSlide = 4;

  useEffect(() => {
    fetch(`https://makeup-api.herokuapp.com/api/v1/products/${id}.json`)
      .then((res) => res.json())
      .then((data) => {
        setDataProduct(data);
        setProductType(data.product_type);
        setSrcImg(data.api_featured_image);

        if (!data.product_colors || data.product_colors.length > 0)
          setColorName(data.product_colors[0].colour_name);
      });
  }, [id]);

  useEffect(() => {
    if (productType) {
      fetch(
        `https://makeup-api.herokuapp.com/api/v1/products.json?product_type=${productType}`
      )
        .then((res) => res.json())
        .then((data) => {
          data = data.filter((item) => item.id != id);
          setRecommendList({ isLoaded: true, products: data });
        });
    }
  }, [productType, id]);

  let renderCarouselButton = () => {
    let result = [];

    for (let i = 0; i < totalSlide; i++) {
      result.push(
        <button
          type="button"
          data-bs-target="#carousel-product-recommend"
          data-bs-slide-to={i}
          className="active"
          aria-current="true"
        ></button>
      )
    }
    return result;
  };

  let addToCart = () => {    
    let cart = JSON.parse(localStorage.getItem("cart")) || [] ;

    let cartItem = {
      id: dataProduct.id,
      name: dataProduct.name,
      imgURL:dataProduct.api_featured_image,
      price: dataProduct.price,
      brand: dataProduct.brand,
      color: colorName,
      qty: 1,
    }

    let cartItemFound = cart.find((item) => (item.id == cartItem.id));

    if (cartItemFound) {
      cartItemFound.qty++;
    } else cart.push(cartItem);

    setTotalCart(cart.reduce((total, item) => (total + item.qty), 0));
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Th??m s???n ph???m th??nh c??ng!");
  }

  return (
    <>
      <BreadCrumb item={dataProduct.name} />
      
      <div className="container my-4">
        <div className="row">
          {/* product img */}
          <div className="col-lg-7">
            <div className="d-flex flex-column justify-content-center">
              <div className="main_image">
                {" "}
                <img
                  src={srcImg}
                  id="main_product_image"
                  className="w-100"
                  style={{ height: "420px", objectFit: "contain" }}
                />{" "}
              </div>
              <div className="thumbnail-images">
                <ul id="thumbnail" className="row justify-content-between">
                  <li className="col-3">
                    <img
                      className="w-100"
                      onClick={(e) => setSrcImg(e.target.src)}
                      src={dataProduct.api_featured_image}
                      style={{ height: "94px", objectFit: "contain" }}
                    />
                  </li>
                  <li className="col-3">
                    <img
                      className="w-100"
                      onClick={(e) => setSrcImg(e.target.src)}
                      src={srcImg}
                      style={{ height: "94px", objectFit: "contain" }}
                    />
                  </li>
                  <li className="col-3">
                    <img
                      className="w-100"
                      onClick={(e) => setSrcImg(e.target.src)}
                      src={srcImg}
                      style={{ height: "94px", objectFit: "contain" }}
                    />
                  </li>
                  <li className="col-3">
                    <img
                      className="w-100"
                      onClick={(e) => setSrcImg(e.target.src)}
                      src={srcImg}
                      style={{ height: "94px", objectFit: "contain" }}
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <a href="" className="text-primary">
              {dataProduct.brand}
            </a>
            <span className="detail-text d-block py-2">{dataProduct.name}</span>
            {/* rate */}
            <div className="detail-rate">
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-half"></i>
              <span className="total-rate">(12)</span>
            </div>
            {/* price */}
            <div className="price py-2 d-flex align-items-center">
              <span className="detail-price-new fs-4 pe-2">
                $ {dataProduct.price}
              </span>
              {dataProduct.price < 20 && dataProduct.price > 0 && (
                <span className="detail-price-old text-secondary text-decoration-line-through pe-2">
                  $ 20
                </span>
              )}
              {dataProduct.price < 20 && dataProduct.price > 0 && (
                <span className="badge">
                  {Math.trunc(((20 - dataProduct.price) / 20) * 100)}%
                </span>
              )}
              {dataProduct.price == 0 && (
                <span className="badge badge-free">Gift</span>
              )}
            </div>
            {/* choose color */}
            {colorName && (
              <div className="">
                <span className="fs-7">M??u s???c: </span>
                <span className="fs-7 text-secondary">{colorName}</span>
                <div className="colors">
                  <ul
                    id="marker"
                    className="list-unstyled d-flex flex-wrap py-2"
                  >
                    {dataProduct.product_colors.map((color) => (
                      <li
                        key={color.colour_name}
                        id={color.colour_name}
                        style={{ backgroundColor: color.hex_value }}
                        className={
                          color.colour_name == colorName
                            ? "colors-active m-1"
                            : "m-1"
                        }
                        onClick={(e) => setColorName(e.target.id)}
                      ></li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* promo code */}
            <div className="promo-code d-flex justify-content-between align-items-center position-relative mb-3">
              <span className="d-block fw-500 fs-7 py-4 px-3 text-primary">
                APPLXB
              </span>
              <span className="d-block fs-8 pe-1">
                Gi???m Th??m 5% cho kh??ch h??ng m???i v???i ????n h??ng ?????u ti??n t???i App
                Lixibox (s??? ??i???n tho???i ch??a t???ng mua h??ng)
              </span>
              <div className="promo-code-border position-absolute"></div>
            </div>
            {/* info */}
            <div className="info-wrap">
              <div className="row">
                <div className="col text-center py-1">
                  <i className="bi bi-coin d-block fs-4"></i>
                  <a href="">
                    <span className="fs-8">
                      Nh???n ngay{" "}
                      <span className="fw-500">
                        {dataProduct.price * 100} Lixicoin
                      </span>{" "}
                      khi mua s???n ph???m n??y
                    </span>
                  </a>
                </div>
                <div className="col text-center py-1">
                  <i className="bi bi-truck d-block fs-4"></i>
                  <span className="fs-8">
                    Mi???n ph?? giao h??ng cho s???n ph???m n??y
                  </span>
                </div>
                <div className="col text-center py-1">
                  <i className="bi bi-arrow-repeat d-block fs-4"></i>
                  <span className="fs-8">
                    ?????i tr??? trong v??ng<span className="fw-500"> 7 ng??y</span>
                  </span>
                  <a href="" className="d-block fs-8 text-primary">
                    Xem chi ti???t
                  </a>
                </div>
              </div>
              <div className="info-ship w-100 d-flex justify-content-between align-items-center p-2">
                <span className="fs-8">
                  <i className="bi bi-geo-alt pe-2 fs-5 align-middle"></i>Xem
                  ph?? giao h??ng
                </span>
                <i className="bi bi-chevron-right"></i>
              </div>
            </div>
            {/* button */}
            <div className="d-flex py-3 d-none d-lg-flex">
              <button className="btn btn-pink w-50 me-3" type="submit" onClick={() => addToCart()}>
                <i className="bi bi-bag pe-2 fs-6"></i>Th??m v??o gi???
              </button>
              <button onClick={() => setLike(!like)} className={`btn btn-add-like w-50 fs-7 ${like && 'active'}`} type="submit" >
                <i className="bi bi-heart pe-2 fs-6 align-middle"></i>
                {like ? "???? th??ch" : "Y??u th??ch"}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* info detail */}
      <div className="container">
        <div className="info-item pb-2 mb-2">
          <span className="fs-4 d-block my-4">TH??NG TIN</span>
          <div className="info-text-wrap info-text">
            <p>
              {dataProduct.description
                ? dataProduct.description
                : "Description"}
            </p>
            {readMore ? (
              <span id="more" style={{ display: "block" }}>
                <p>
                  1/ ?????u gai si??u m???nh ch??? 0.6mm Halio Sensitive v???n ???????c ???ng
                  d???ng c??ng ngh??? l??m s???ch ti??n ti???n Sonic Wave Cleansing gi??p
                  l??m s???ch s??u v?? lo???i b??? t???i 99,5% b???i b???n v?? d???u th???a c??ng nh??
                  l???p trang ??i???m c??n s??t l???i - nguy??n nh??n ch??nh g??y m???n v?? d???
                  ???ng da. ?????u gai silicon cao c???p kh??ng khu???n si??u m???nh 0.6mm
                  gi??p Halio Sensitive nh??? nh??ng v???i c??? nh???ng l??n da nh???y c???m
                  nh???t.
                </p>
                <p>
                  2/ ?????t ti??u chu???n IPX7 ch???ng n?????c hi???u qu??? Halio Sensitive
                  ???????c ch???ng nh???n c?? ????? ch???ng n?????c IPX7 v???i kh??? n??ng b???o v??? s???n
                  ph???m kh???i t??c ?????ng c???a vi???c ng??m trong n?????c l??n t???i 1 m??t,
                  trong th???i gian ?????n 30 ph??t.
                </p>
                <p>
                  3/ Chu tr??nh l??m s???ch da ti??u chu???n t??? ?????ng ng???t sau 2 ph??t
                  Halio Sensitive ???????c thi???t k??? v???i chu tr??nh l??m s???ch da ti??u
                  chu???n v?? khoa h???c, m??y s??? ???????c ng???t t??? ?????ng sau 2 ph??t ????? ?????m
                  b???o th???i gian ch???y m??y c???a b???n v???a ????? ????? l??m s???ch da m?? kh??ng
                  qu?? l??u khi???n da ??au r??t.
                </p>
                <p>
                  4/ H???p treo nam ch??m ti???n l???i Halio Sensitive s??? h???u h???p tr??n
                  g???m nam ch??m v?? d??y s???c ti???n d???ng. V???i thi???t k??? h???p th??ng minh
                  m???i n??y, b???n d??? d??ng b???o qu???n m??y b???ng c??ch treo ??? b???t k?? ????u
                  v?? ????nh m??y v??o ph???n nam ch??m c?? s???n sau m???i l???n s??? d???ng.
                </p>
                <p>
                  5/ Ch??? ????? b???o h??nh 1 n??m 1 ?????i 1 Halio Sensitive c?? ch??? ????? b???o
                  h??nh d??? d??ng, nhanh ch??ng trong v??ng 1 n??m. B???n s??? ???????c ?????i
                  m??y m???i ho??n to??n trong v??ng 1 n??m ?????u sau khi mua m??y n???u m??y
                  g???p b???t k?? v???n ????? g?? do l???i c???a nh?? s???n xu???t. Chi ti???t nh??
                  sau:
                </p>
                <p>
                  - 1 ?????i 1 trong v??ng 1 n??m ch??? ??p d???ng cho s???n ph???m b??? l???i k???
                  thu???t do nh?? s???n xu???t v?? kh??ng th??? s???a ???????c
                </p>
                <p>
                  - Th???i h???n b???o h??nh trong v??ng 1 n??m t??nh t??? ng??y kh??ch h??ng
                  ?????t ????n h??ng
                </p>
                <p>
                  - Lixibox ch??? nh???n b???o h??nh khi s???n ph???m ????a v??? c?? ?????y ????? ph???
                  ki???n h???p nh???a v?? c??p s???c.&nbsp;
                </p>
                <p>
                  *Ch??? ????? b???o h??nh c???a s???n ph???m ??i k??m v???i m?? ????n h??ng*. Kh??ng
                  c?? phi???u b???o h??nh b???ng gi???y.
                </p>
                <p>
                  + ?????i v???i s???n ph???m mua online t???i lixibox.com, kh??ch h??ng g???i
                  ??i???n hotline 1800 2040 ho???c inbox fanpage Lixibox ????? ???????c
                  h?????ng d???n b???o h??nh. Ph?? v???n chuy???n do ng?????i g???i chi tr???, t???c
                  l?? kh??ch h??ng chi tr??? l?????t ??i v?? Lixibox chi tr??? l?????t g???i v???.
                  C???a h??ng Lixibox kh??ng nh???n b???o h??nh s???n ph???m kh??ch ???? mua ???
                  online lixibox.com. + ?????i v???i s???n ph???m mua t???i c???a h??ng: kh??ch
                  h??ng vui l??ng ?????n c???a h??ng ???? mua s???n ph???m, k??m m?? ????n h??ng
                  ho???c s??? ??i???n tho???i&nbsp;????? g???i tr??? s???n ph???m mu???n b???o h??nh.
                </p>
              </span>
            ) : (
              <span id="dots">...</span>
            )}

            <button
              onClick={() => setReadMore(!readMore)}
              id="myBtn"
              className="btn-readmore"
            >
              {readMore ? "Thu g???n" : "Xem th??m"}
            </button>
          </div>
          <div className="d-flex align-items-center">
            <img
              src="assets/img/halio.png"
              alt=""
              style={{ height: "auto", width: "120px" }}
            />
            <div className="fs-7 ps-3 mb-2">
              <div className="d-block">
                <span className="info-item-title d-inline-block">H??ng:</span>
                <span className="text-primary">{dataProduct.brand}</span>
              </div>
              <div className="d-block">
                <span className="info-item-title d-inline-block">
                  Th????ng hi???u:
                </span>
                <span className="info-text">United States</span>
              </div>
              <div className="d-block">
                <span className="info-item-title d-inline-block">
                  S???n xu???t t???i:
                </span>
                <span className="info-text">China</span>
              </div>
              <div className="d-block">
                <span className="info-item-title d-inline-block">
                  Dung t??ch:
                </span>
                <span className="info-text">108.2 g</span>
              </div>
            </div>
          </div>
          <span className="info-text d-block">
            Halio l?? th????ng hi???u thi???t ch??m s??c da v?? nha khoa ?????n t??? n?????c M???.
            D??ng s???n ph???m c???a h??ng t??ch h???p thi???t k??? s??ng t???o, c??ng ngh??? hi???n
            ?????i, ??em ?????n hi???u qu??? t???i ??u, gi??p b???n lu??n t????i s??ng, r???ng ng???i
          </span>
        </div>
        <div className="info-item info-text mb-3">
          <div className="accordion accordion-flush" id="accordionFlushExample">
            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingOne">
                <button
                  className="accordion-button px-0 collapsed fs-7 fw-500"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseOne"
                  aria-expanded="false"
                  aria-controls="flush-collapseOne"
                >
                  C??ch s??? d???ng
                </button>
              </h2>
              <div
                id="flush-collapseOne"
                className="accordion-collapse collapse"
                aria-labelledby="flush-headingOne"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body px-0">
                  <p>
                    - D??ng sau b?????c s???a r???a m???t v?? n?????c c??n b???ng da.
                    <br />
                    - Cho m???t l?????ng s???n ph???m v???a ????? ra ?????u ng??n tay v?? thoa ?????u
                    l??n m???t.
                    <br />- C?? th??? d??ng h??ng ng??y v?? d??ng d?????i l???p trang ??i???m.
                  </p>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingTwo">
                <button
                  className="accordion-button px-0 collapsed fs-7 fw-500"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseTwo"
                  aria-expanded="false"
                  aria-controls="flush-collapseTwo"
                >
                  Th??nh ph???n
                </button>
              </h2>
              <div
                id="flush-collapseTwo"
                className="accordion-collapse collapse"
                aria-labelledby="flush-headingTwo"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body px-0">
                  <p>
                    Organic Aloe, Witch Hazel, Botanical Hyaluronic Acid, Kosher
                    Vegetable Glycerin, Msm, Organic Jojoba Oil, Wildcrafted
                    Green Tea, Geranium Essential Oil, Sodium Ascorbyl Phosphate
                    (Vitamin C), Tocopheryl Acetate (Vitamin E), Organic Gotu
                    Kola, Organic Horsetail, Organic Geranium, Organic
                    Dandelion, Sodium Benozate, Potassium Sorbate, Ethyl Hexyl
                    Glycerin, Hydroxyethyl Cellulose, Carrageenan Gum
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* recommend product */}
      <div className="container">
        <span className="fs-3 d-block py-2 text-center product-title">
          S???N PH???M LI??N QUAN
        </span>
        <div className="product-recommend">
          <div className="row">
            <div className="col-md-12">
              {/* Carousel indicators */}
              <div
                id="carousel-product-recommend"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-indicators carousel-indicators-product">
                  {renderCarouselButton()}
                </div>
                <div class="carousel-inner px-3 py-4">
                  {recommendList.isLoaded ? (
                    createRecommendList(recommendList.products).map((item, index) => (
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
                    ))
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
                  data-bs-target="#carousel-product-recommend"
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
                  data-bs-target="#carousel-product-recommend"
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
    </>
  );
}

export default ProductDetail;
