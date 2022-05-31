import { useDispatch } from "react-redux";
import { addBrand, addPrice, reset } from "../actions/index";
import { useState, useContext } from "react";
import { ProductListContext } from "./ProductList";
import { AppContext } from "../App";

function NavFilter() {
  const {
    productList,
    filterProductList,
    unCheckAll,
    setIsSort,
    sortProductList,
    setRerender,
    rerender,
    brandList,
    setBrandList,
  } = useContext(ProductListContext);
  const { setIsSearch } = useContext(AppContext);

  const [currentSortType, setCurrentSortType] = useState("Mặc định");
  const dispatch = useDispatch();

  let createBrandSearch = (keyword) => {
    let listSearch = [];
    productList.forEach((product) => {
      if (!listSearch.includes(product.brand)) {
        listSearch.push(product.brand);
      }
    });
    listSearch = listSearch.filter(
      (brand) => brand != null && brand && brand.includes(keyword.toLowerCase())
    );
    setBrandList(listSearch);
  };

  return (
    <>
      {/* desktop */}
      <div className="d-flex justify-content-between nav-product px-4 d-none d-lg-flex">
        <div className="nav-product-left d-flex">
          {/* filter brand */}
          <div className="dropdown">
            <div
              className="nav-product-item nav-product-item-brand  py-2"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="fs-8 fw-500">
                THƯƠNG HIỆU<i className="bi bi-chevron-down ps-2"></i>
                <span className="d-block fs-8 fw-normal">Tất cả</span>
              </span>
            </div>
            <ul
              className="dropdown-menu dropdown-menu-brand mt-1"
              aria-labelledby="dropdownMenuButton1"
            >
              <div className="form-search-filter-wrap">
                <form className="form-search-filter">
                  <i className="bi bi-search"></i>
                  <input
                    className="form-control"
                    type="search"
                    placeholder="Tìm kiếm"
                    aria-label="Search"
                    onChange={(e) => createBrandSearch(e.target.value)}
                  />
                </form>
              </div>

              <div className="dropdown-menu-brand-list">
                {brandList.map((item) => (
                  <li
                    className="ps-2 fs-7 text-secondary dropdown-item"
                    data-value={item}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="form-check">
                      <label className="form-check-label w-100" htmlFor={item}>
                        <input
                          className="form-check-input"
                          name="brand-form-check"
                          type="checkbox"
                          value={item}
                          id={item}
                          onClick={(e) => dispatch(addBrand(e.target))}
                        />
                        {item.toUpperCase()}
                      </label>
                    </div>
                  </li>
                ))}
                <div className="d-flex w-100 justify-content-evenly ul-button-bottom">
                  <button
                    type="submit"
                    className="btn btn-secondary me-2"
                    onClick={() => {
                      filterProductList();
                      setIsSearch(false);
                      setCurrentSortType("Mặc định");
                    }}
                  >
                    Áp dụng
                  </button>
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={(e) => {
                      dispatch(reset());
                      e.stopPropagation();
                      unCheckAll("brand-form-check");
                    }}
                  >
                    Bỏ chọn
                  </button>
                </div>
              </div>
            </ul>
          </div>
          {/* filter price */}
          <div className="dropdown">
            <div
              className="nav-product-item py-2"
              id="dropdownMenuButton2"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="fs-8 fw-500">
                GIÁ<i className="bi bi-chevron-down ps-2"></i>
                <span className="d-block fs-8 fw-normal">Tất cả</span>
              </span>
            </div>
            <ul
              className="dropdown-menu dropdown-menu-price mt-1"
              aria-labelledby="dropdownMenuButton2"
            >
              {["0-$5", "$5-$10", "$10-$20", "Trên $20"].map((item) => (
                <li
                  className="ps-2 fs-7 text-secondary dropdown-item"
                  data-value={item}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <div className="form-check">
                    <label className="form-check-label" htmlFor={item}>
                      <input
                        name="price-form-check"
                        className="form-check-input"
                        type="checkbox"
                        value={item}
                        id={item}
                        onClick={(e) => dispatch(addPrice(e.target))}
                      />
                      {item}
                    </label>
                  </div>
                </li>
              ))}
              <div className="d-flex w-100 justify-content-evenly mt-3">
                <button
                  type="button"
                  className="btn btn-secondary me-2"
                  onClick={() => {
                    filterProductList();
                    setIsSearch(false);
                    setCurrentSortType("Mặc định");
                  }}
                >
                  Áp dụng
                </button>
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={(e) => {
                    e.stopPropagation();
                    unCheckAll("price-form-check");
                  }}
                >
                  Bỏ chọn
                </button>
              </div>
            </ul>
          </div>
        </div>
        {/* sort */}
        <div className="dropdown">
          <div
            className="nav-product-item py-2"
            id="dropdownMenuButton3"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span className="fs-8 fw-500">
              SẮP XẾP<i className="bi bi-chevron-down ps-2"></i>
              <span className="d-block fs-8 fw-normal">{currentSortType}</span>
            </span>
          </div>
          <ul
            className="dropdown-menu dropdown-menu-filter mt-1 p-0 list-group-filter "
            aria-labelledby="dropdownMenuButton3"
          >
            {[
              "Mặc định",
              "Mới nhất",
              "Giảm giá nhiều nhất",
              "Giá tăng dần",
              "Giá giảm dần",
            ].map((type) => (
              <a
                href="#"
                aria-current="true"
                onClick={() => {
                  setIsSort(true);
                  setCurrentSortType(type);
                  sortProductList(type);
                  setRerender(!rerender);
                }}
                className={`list-group-item fs-7 text-secondary list-group-item-action ${
                  currentSortType == type ? "active" : ""
                }`}
              >
                {type}
              </a>
            ))}
          </ul>
        </div>
      </div>
      {/* mobile */}
      <div className="dropdown d-lg-none w-100">
        <div
          className="nav-product-item py-2"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <div className="d-flex p-3 border-radius border align-items-center justify-content-between">
            <span className="fs-7">
              Chuyên mục:{" "}
              <span className="fs-6 fw-500 fw-normal">Hàng hot nhất</span>
            </span>
            <i className="bi bi-chevron-down"></i>
          </div>
        </div>
        <div
          className="dropdown-menu dropdown-menu-brand mt-1 ps-3 list-group-filter w-100 "
          aria-labelledby="dropdownMenuButton1"
        >
          <ul className="list-group list-group-main">
            <li className="list-group-item no-list-mini list-group-item-active">
              Hàng hot nhất
              <span className="text-secondary text-eng fs-7">Best Sellers</span>
            </li>
            <li className="list-group-item no-list-mini">
              Chăm sóc răng
              <span className="text-secondary text-eng fs-7">Oral care</span>
            </li>
            <li
              className="list-group-item has-list-mini"
              data-bs-toggle="collapse"
              data-bs-target="#collapse-1"
              aria-expanded="false"
              aria-controls="collapse-1"
            >
              Thực phẩm chức năng
              <span className="text-secondary text-eng fs-7">Supplement</span>
            </li>
            <div className="collapse" id="collapse-1">
              <div className="card card-body py-0">
                <div className="list-group list-group-mini ps-5">
                  <a
                    href="#"
                    className="list-group-item list-group-item-action"
                    aria-current="true"
                  >
                    Làm đẹp
                    <span className="text-secondary text-eng fs-7">Beauty</span>
                  </a>
                  <a
                    href="#"
                    className="list-group-item list-group-item-action"
                  >
                    Sức khỏe
                    <span className="text-secondary text-eng fs-7">Health</span>
                  </a>
                </div>
              </div>
            </div>
            <li
              className="list-group-item has-list-mini"
              data-bs-toggle="collapse"
              data-bs-target="#collapse-2"
              aria-expanded="false"
              aria-controls="collapse-2"
            >
              Trang điểm
              <span className="text-secondary text-eng fs-7">Makeup</span>
            </li>
            <div className="collapse" id="collapse-2">
              <div className="card card-body py-0">
                <div className="list-group list-group-mini ps-5">
                  <a
                    href="#"
                    className="list-group-item list-group-item-action"
                    aria-current="true"
                  >
                    Mắt
                    <span className="text-secondary text-eng fs-7">
                      Eye Makeup
                    </span>
                  </a>
                  <a
                    href="#"
                    className="list-group-item list-group-item-action"
                  >
                    Mặt
                    <span className="text-secondary text-eng fs-7">
                      Face Makeup
                    </span>
                  </a>
                  <a
                    href="#"
                    className="list-group-item list-group-item-action"
                  >
                    Môi
                    <span className="text-secondary text-eng fs-7">Lip</span>
                  </a>
                </div>
              </div>
            </div>
            <li
              className="list-group-item has-list-mini"
              data-bs-toggle="collapse"
              data-bs-target="#collapse-3"
              aria-expanded="false"
              aria-controls="collapse-3"
            >
              Dưỡng da
              <span className="text-secondary text-eng fs-7">Skincare</span>
            </li>
            <div className="collapse" id="collapse-3">
              <div className="card card-body py-0">
                <div className="list-group list-group-mini ps-5">
                  <a
                    href="#"
                    className="list-group-item list-group-item-action"
                    aria-current="true"
                  >
                    Rửa mặt
                    <span className="text-secondary text-eng fs-7">
                      Cleanes
                    </span>
                  </a>
                  <a
                    href="#"
                    className="list-group-item list-group-item-action"
                  >
                    Mặt nạ
                    <span className="text-secondary text-eng fs-7">Mask</span>
                  </a>
                  <a
                    href="#"
                    className="list-group-item list-group-item-action"
                  >
                    Dưỡng ẩm
                    <span className="text-secondary text-eng fs-7">
                      Mosturize
                    </span>
                  </a>
                  <a
                    href="#"
                    className="list-group-item list-group-item-action"
                  >
                    Dưỡng môi/Vùng mắt
                    <span className="text-secondary text-eng fs-7">
                      Lip Treatment
                    </span>
                  </a>
                  <a
                    href="#"
                    className="list-group-item list-group-item-action"
                  >
                    Chống năng
                    <span className="text-secondary text-eng fs-7">
                      Sun protection
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </ul>
        </div>
      </div>
      <div className="p-2 border-radius border d-flex justify-content-between d-lg-none">
        {/* icon filter*/}
        <div className="dropdown">
          <div
            className=" nav-product-item py-2"
            id="dropdownMenuButton2"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <div className="fs-7 fw-500 d-flex">
              <i className="bi bi-arrow-down-up pe-2"></i>
              <span className="d-block fw-normal">Tất cả</span>
              <i className="bi bi-chevron-down ps-2"></i>
            </div>
          </div>
          <ul
            className="dropdown-menu dropdown-menu-brand mt-1 p-0 list-group-filter "
            aria-labelledby="dropdownMenuButton2"
          >
            <a
              href="#"
              className="list-group-item fs-7 text-secondary list-group-item-action active"
              aria-current="true"
            >
              Mặc định
            </a>
            <a
              href="#"
              className="list-group-item fs-7 text-secondary list-group-item-action"
            >
              Mới nhất
            </a>
            <a
              href="#"
              className="list-group-item fs-7 text-secondary list-group-item-action"
            >
              Giảm giá nhiều nhất
            </a>
            <a
              href="#"
              className="list-group-item fs-7 text-secondary list-group-item-action"
            >
              Giá tăng dần
            </a>
            <a
              href="#"
              className="list-group-item fs-7 text-secondary list-group-item-action"
            >
              Giá giảm dần
            </a>
          </ul>
        </div>
        {/* icon classify */}
        <div className="dropdown">
          <div
            className="nav-product-item py-2"
            id="dropdownMenuButton3"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <div className="fs-7 fw-500 d-flex">
              <i className="bi bi-filter-circle-fill pe-2"></i>
              <span className="d-block fw-normal">Lọc</span>
              <i className="bi bi-chevron-down ps-2"></i>
            </div>
          </div>
          <ul
            className="dropdown-menu dropdown-menu-brand mt-1 pt-0"
            aria-labelledby="dropdownMenuButton3"
          >
            <span className="d-block pb-1 text-center border-bottom">
              THƯƠNG HIỆU
            </span>
            <li
              className="ps-2 fs-7 text-secondary  dropdown-item"
              data-value="flexCheckLaro"
            >
              <div className="form-check">
                <label className="form-check-label" htmlFor="flexCheckLaro">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckLaro"
                  />
                  La Roche Posay (13)
                </label>
              </div>
            </li>
            <li
              className="ps-2 fs-7 text-secondary dropdown-item"
              data-value="flexCheckNaruko"
            >
              <div className="form-check">
                <label className="form-check-label" htmlFor="flexCheckNaruko">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckNaruko"
                  />
                  Naruko (11)
                </label>
              </div>
            </li>
            <li
              className="ps-2 fs-7 text-secondary dropdown-item"
              data-value="flexCheckVichy"
            >
              <div className="form-check">
                <label className="form-check-label" htmlFor="flexCheckVichy">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckVichy"
                  />
                  Vichy (11)
                </label>
              </div>
            </li>
            <li
              className="ps-2 fs-7 text-secondary dropdown-item"
              data-value="flexCheckHuxley"
            >
              <div className="form-check">
                <label className="form-check-label" htmlFor="flexCheckHuxley">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckHuxley"
                  />
                  Huxley (10)
                </label>
              </div>
            </li>
            {/* price */}
            <span className="d-block pb-1 text-center border-bottom border-top">
              GIÁ
            </span>
            <li
              className="ps-2 fs-7 text-secondary  dropdown-item"
              data-value="flexCheck100"
            >
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheck100"
                />
                <label className="form-check-label" htmlFor="flexCheck100">
                  0-100k
                </label>
              </div>
            </li>
            <li
              className="ps-2 fs-7 text-secondary dropdown-item"
              data-value="flexCheck500"
            >
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheck500"
                />
                <label className="form-check-label" htmlFor="flexCheck500">
                  100k-500k
                </label>
              </div>
            </li>
            <li
              className="ps-2 fs-7 text-secondary dropdown-item"
              data-value="flexCheck1tr"
            >
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheck1tr"
                />
                <label className="form-check-label" htmlFor="flexCheck1tr">
                  500k-1tr
                </label>
              </div>
            </li>
            <li
              className="ps-2 fs-7 text-secondary dropdown-item"
              data-value="flexCheck2tr"
            >
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheck2tr"
                />
                <label className="form-check-label" htmlFor="flexCheck2tr">
                  Trên 2tr
                </label>
              </div>
            </li>
            <div className="d-flex w-100 justify-content-evenly mt-3">
              <button type="button" className="btn btn-secondary me-2">
                Áp dụng
              </button>
              <button type="button" className="btn btn-light">
                Bỏ chọn
              </button>
            </div>
          </ul>
        </div>
      </div>
    </>
  );
}

export default NavFilter;
