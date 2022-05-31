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
    alert("Thêm sản phẩm thành công!");
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
                <span className="fs-7">Màu sắc: </span>
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
                Giảm Thêm 5% cho khách hàng mới với đơn hàng đầu tiên tại App
                Lixibox (số điện thoại chưa từng mua hàng)
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
                      Nhận ngay{" "}
                      <span className="fw-500">
                        {dataProduct.price * 100} Lixicoin
                      </span>{" "}
                      khi mua sản phẩm này
                    </span>
                  </a>
                </div>
                <div className="col text-center py-1">
                  <i className="bi bi-truck d-block fs-4"></i>
                  <span className="fs-8">
                    Miễn phí giao hàng cho sản phẩm này
                  </span>
                </div>
                <div className="col text-center py-1">
                  <i className="bi bi-arrow-repeat d-block fs-4"></i>
                  <span className="fs-8">
                    Đổi trả trong vòng<span className="fw-500"> 7 ngày</span>
                  </span>
                  <a href="" className="d-block fs-8 text-primary">
                    Xem chi tiết
                  </a>
                </div>
              </div>
              <div className="info-ship w-100 d-flex justify-content-between align-items-center p-2">
                <span className="fs-8">
                  <i className="bi bi-geo-alt pe-2 fs-5 align-middle"></i>Xem
                  phí giao hàng
                </span>
                <i className="bi bi-chevron-right"></i>
              </div>
            </div>
            {/* button */}
            <div className="d-flex py-3 d-none d-lg-flex">
              <button className="btn btn-pink w-50 me-3" type="submit" onClick={() => addToCart()}>
                <i className="bi bi-bag pe-2 fs-6"></i>Thêm vào giỏ
              </button>
              <button onClick={() => setLike(!like)} className={`btn btn-add-like w-50 fs-7 ${like && 'active'}`} type="submit" >
                <i className="bi bi-heart pe-2 fs-6 align-middle"></i>
                {like ? "Đã thích" : "Yêu thích"}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* info detail */}
      <div className="container">
        <div className="info-item pb-2 mb-2">
          <span className="fs-4 d-block my-4">THÔNG TIN</span>
          <div className="info-text-wrap info-text">
            <p>
              {dataProduct.description
                ? dataProduct.description
                : "Description"}
            </p>
            {readMore ? (
              <span id="more" style={{ display: "block" }}>
                <p>
                  1/ Đầu gai siêu mảnh chỉ 0.6mm Halio Sensitive vẫn được ứng
                  dụng công nghệ làm sạch tiên tiến Sonic Wave Cleansing giúp
                  làm sạch sâu và loại bỏ tới 99,5% bụi bẩn và dầu thừa cũng như
                  lớp trang điểm còn sót lại - nguyên nhân chính gây mụn và dị
                  ứng da. Đầu gai silicon cao cấp kháng khuẩn siêu mảnh 0.6mm
                  giúp Halio Sensitive nhẹ nhàng với cả những làn da nhạy cảm
                  nhất.
                </p>
                <p>
                  2/ Đạt tiêu chuẩn IPX7 chống nước hiệu quả Halio Sensitive
                  được chứng nhận có độ chống nước IPX7 với khả năng bảo vệ sản
                  phẩm khỏi tác động của việc ngâm trong nước lên tới 1 mét,
                  trong thời gian đến 30 phút.
                </p>
                <p>
                  3/ Chu trình làm sạch da tiêu chuẩn tự động ngắt sau 2 phút
                  Halio Sensitive được thiết kế với chu trình làm sạch da tiêu
                  chuẩn và khoa học, máy sẽ được ngắt tự động sau 2 phút để đảm
                  bảo thời gian chạy máy của bạn vừa đủ để làm sạch da mà không
                  quá lâu khiến da đau rát.
                </p>
                <p>
                  4/ Hộp treo nam châm tiện lợi Halio Sensitive sở hữu hộp tròn
                  gồm nam châm và dây sạc tiện dụng. Với thiết kế hộp thông minh
                  mới này, bạn dễ dàng bảo quản máy bằng cách treo ở bất kì đâu
                  và đính máy vào phần nam châm có sẵn sau mỗi lần sử dụng.
                </p>
                <p>
                  5/ Chế độ bảo hành 1 năm 1 đổi 1 Halio Sensitive có chế độ bảo
                  hành dễ dàng, nhanh chóng trong vòng 1 năm. Bạn sẽ được đổi
                  máy mới hoàn toàn trong vòng 1 năm đầu sau khi mua máy nếu máy
                  gặp bất kì vấn đề gì do lỗi của nhà sản xuất. Chi tiết như
                  sau:
                </p>
                <p>
                  - 1 đổi 1 trong vòng 1 năm chỉ áp dụng cho sản phẩm bị lỗi kỹ
                  thuật do nhà sản xuất và không thể sửa được
                </p>
                <p>
                  - Thời hạn bảo hành trong vòng 1 năm tính từ ngày khách hàng
                  đặt đơn hàng
                </p>
                <p>
                  - Lixibox chỉ nhận bảo hành khi sản phẩm đưa về có đầy đủ phụ
                  kiện hộp nhựa và cáp sạc.&nbsp;
                </p>
                <p>
                  *Chế độ bảo hành của sản phẩm đi kèm với mã đơn hàng*. Không
                  có phiếu bảo hành bằng giấy.
                </p>
                <p>
                  + Đối với sản phẩm mua online tại lixibox.com, khách hàng gọi
                  điện hotline 1800 2040 hoặc inbox fanpage Lixibox để được
                  hướng dẫn bảo hành. Phí vận chuyển do người gửi chi trả, tức
                  là khách hàng chi trả lượt đi và Lixibox chi trả lượt gửi về.
                  Cửa hàng Lixibox không nhận bảo hành sản phẩm khách đã mua ở
                  online lixibox.com. + Đối với sản phẩm mua tại cửa hàng: khách
                  hàng vui lòng đến cửa hàng đã mua sản phẩm, kèm mã đơn hàng
                  hoặc số điện thoại&nbsp;để gửi trả sản phẩm muốn bảo hành.
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
              {readMore ? "Thu gọn" : "Xem thêm"}
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
                <span className="info-item-title d-inline-block">Hãng:</span>
                <span className="text-primary">{dataProduct.brand}</span>
              </div>
              <div className="d-block">
                <span className="info-item-title d-inline-block">
                  Thương hiệu:
                </span>
                <span className="info-text">United States</span>
              </div>
              <div className="d-block">
                <span className="info-item-title d-inline-block">
                  Sản xuất tại:
                </span>
                <span className="info-text">China</span>
              </div>
              <div className="d-block">
                <span className="info-item-title d-inline-block">
                  Dung tích:
                </span>
                <span className="info-text">108.2 g</span>
              </div>
            </div>
          </div>
          <span className="info-text d-block">
            Halio là thương hiệu thiết chăm sóc da và nha khoa đến từ nước Mỹ.
            Dòng sản phẩm của hãng tích hợp thiết kế sáng tạo, công nghệ hiện
            đại, đem đến hiệu quả tối ưu, giúp bạn luôn tươi sáng, rạng ngời
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
                  Cách sử dụng
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
                    - Dùng sau bước sữa rửa mặt và nước cân bằng da.
                    <br />
                    - Cho một lượng sản phẩm vừa đủ ra đầu ngón tay và thoa đều
                    lên mặt.
                    <br />- Có thể dùng hàng ngày và dùng dưới lớp trang điểm.
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
                  Thành phần
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
          SẢN PHẨM LIÊN QUAN
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
