import { useEffect, useState, createContext, useContext } from "react";
import { Link } from "react-router-dom";
import Category from "./Category";
import Pagination from "./Pagination";
import ProductItem from "./ProductItem";
import BreadCrumb from "./BreadCrumb";
import NavFilter from "./NavFilter";

import { useSelector, useDispatch } from "react-redux";
import { reset } from "../actions/index";
import { AppContext } from "../App";
//----------Context---------------
export const ProductListContext = createContext();

function ProductList() {
  const { keyword, isSearch } = useContext(AppContext);
  //----------Reducer---------------
  const brandListFilter = useSelector((state) => state.brandListReducer);
  const priceListFilter = useSelector((state) => state.priceListReducer);
  const dispatch = useDispatch();

  //----------State-----------------

  //data
  const [isLoaded, setIsLoaded] = useState(false);
  const [productList, setProductList] = useState([]);
  const [brandList, setBrandList] = useState([]);

  //sort
  const [isSort, setIsSort] = useState(false);

  //page
  let itemPerPage = 12;
  let pagiStart = 4;
  let totalPageFilter = 0;
  const [rerender, setRerender] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  //category
  const [category, setCatogory] = useState("All product");
  const [productType, setProductType] = useState("");

  //filter
  const [isFilter, setIsFilter] = useState(false);
  const [productListRender, setProductListRender] = useState([]);

  // call API, rerender page
  useEffect(() => {
    fetch(
      "https://makeup-api.herokuapp.com/api/v1/products.json"
    )
      .then((res) => res.json())
      .then((data) => {
        setProductList(
          data.filter((product) => product.price != null && product.price)
        );
        setTotalPage(Math.ceil(data.length / itemPerPage));
        setIsLoaded(true);
        //create brandList
        data.forEach((product) => {
          if (!brandList.includes(product.brand)) {
            brandList.push(product.brand);
          }
        });
        setBrandList(brandList.filter((brand) => brand != null && brand));
      });
  }, []);

  useEffect(() => {
    setTotalPage(totalPageFilter);
  }, [rerender, keyword, isLoaded]);

  // Get current page
  let getCurrentPage = (data) => {
    let result = [],
      startIndex = (currentPage - 1) * itemPerPage,
      endIndex = startIndex + itemPerPage;

    if (category && category != "All product") {
      result = data.filter(
        (item) => item.product_type == category.toLowerCase().replace(" ", "_")
      );
      if (productType) {
        result = result.filter(
          (item) => item.category == productType.toLowerCase().replace(" ", "_")
        );
      }
      totalPageFilter = Math.ceil(result.length / itemPerPage);
      return result.slice(startIndex, endIndex);
    }

    totalPageFilter = Math.ceil(data.length / itemPerPage);
    result = data.slice(startIndex, endIndex);

    return result;
  };

  //Render ProductList
  let renderProductList = () => {
    let result = [];

    if (isSearch) {
      let listSearch = productList.filter((item) =>
        item.name.toLowerCase().includes(keyword.toLowerCase())
      );
      getCurrentPage(listSearch).map((product) =>
        result.push(
          <Link to={`/shop/${product.id}`}>
            <ProductItem key={product.id} product={product} />
          </Link>
        )
      );
    } else if (isSort || isFilter) {
      getCurrentPage(productListRender).map((product) =>
        result.push(
          <Link to={`/shop/${product.id}`}>
            <ProductItem key={product.id} product={product} />
          </Link>
        )
      );
    } else {
      getCurrentPage(productList).map((product) =>
        result.push(
          <Link to={`/shop/${product.id}`}>
            <ProductItem key={product.id} product={product} />
          </Link>
        )
      );
    }

    return result;
  };

  //Sort ProductList
  let sortProductList = (value) => {
    let products = [];
    if (isFilter) {
      products = [...productListRender];
    } else products = [...productList];
    switch (value) {
      case "Giá tăng dần":
        setProductListRender(products.sort((a, b) => a.price - b.price));
        setCurrentPage(1);
        setRerender(!rerender);
        break;
      case "Giá giảm dần":
        setProductListRender(products.sort((a, b) => b.price - a.price));
        setCurrentPage(1);
        setRerender(!rerender);
        break;
      case "Mới nhất":
        setProductListRender(
          products.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          )
        );
        setCurrentPage(1);
        setRerender(!rerender);
        break;
      case "Giảm giá nhiều nhất":
        setProductListRender(
          products.sort((a, b) => 20 - b.price - (20 - a.price))
        );
        setCurrentPage(1);
        setRerender(!rerender);
        break;
      default:
        setProductListRender(productList);
        setRerender(!rerender);
    }
  };

  //Filter ProductList
  let filterBrand = (filterList) => {
    let result = [];
    brandListFilter.forEach((brand) => {
      result = [...result, ...filterList.filter((item) => item.brand == brand)];
    });
    return result;
  };

  let filterPrice = (filterList) => {
    let result = [];
    priceListFilter.forEach((price) => {
      result = [
        ...result,
        ...filterList.filter((item) => {
          return (
            parseInt(item.price) >= price.start &&
            parseInt(item.price) <= price.end
          );
        }),
      ];
    });
    return result;
  };

  let filterProductList = () => {
    if (brandListFilter.length > 0) {
      setProductListRender(filterBrand(productList));
    }

    if (priceListFilter.length > 0) {
      setProductListRender(filterPrice(productList));
    }

    if (brandListFilter.length > 0 && priceListFilter.length > 0) {
      let result = filterPrice(filterBrand(productList));
      setProductListRender(result);
    }

    setIsFilter(true);
    setCurrentPage(1);
    setRerender(!rerender);
  };

  let unCheckAll = (name) => {
    let inputs = document.getElementsByName(name);
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].type == "checkbox") inputs[i].checked = false;
    }

    dispatch(reset());

    if (brandListFilter.length > 0) {
      setProductListRender(filterBrand(productList));
    }

    if (priceListFilter.length > 0) {
      setProductListRender(filterPrice(productList));
    }

    if (brandListFilter.length == 0 && priceListFilter.length == 0) {
      setProductListRender(productList);
      setIsFilter(false);
    }

    setRerender(!rerender);
  };

  // Pagination
  let renderPagination = () => {
    let result = [];
    for (let i = 1; i < totalPage; i++) {
      if (i <= pagiStart || currentPage >= pagiStart) {
        if (i <= pagiStart || i <= currentPage + 2) {
          let pagiItem = (
            <li
              key={i}
              style={{ cursor: "pointer" }}
              className={i == currentPage ? "active page-item" : "page-item"}
              aria-current="page"
              onClick={() => setCurrentPage(i)}
            >
              <span className="page-link">{i}</span>
            </li>
          );
          result.push(pagiItem);
        }
      }
    }
    if (currentPage >= pagiStart + 4 ) {
      result.splice(
        3,
        currentPage - pagiStart,
        <li
          key={101}
          style={{ pointerEvents: "none" }}
          aria-current="page"
        >
          <span className="page-link">...</span>
        </li>
      );
    }
    if (currentPage < totalPage - pagiStart) {
      let pagiItem = (
        <li key={100} style={{ pointerEvents: "none" }} aria-current="page">
          <span className="page-link">...</span>
        </li>
      );
      result.push(pagiItem);
    }
    result.push(
      <li
        key={99}
        style={{ cursor: "pointer" }}
        onClick={() => setCurrentPage(totalPage)}
        className={totalPage == currentPage ? "active page-item" : "page-item"}
        aria-current="page"
      >
        <span className="page-link">{totalPage}</span>
      </li>
    );
    return result;
  };

  let movePage = (step) => {
    let page = currentPage + step;
    if (page >= 1 && page <= totalPage) setCurrentPage(page);
  };

  const contextValue = {
    category,
    setCatogory,
    currentPage,
    setCurrentPage,
    rerender,
    setRerender,
    brandList,
    setBrandList,
    productList,
    totalPage,
    setIsSort,
    sortProductList,
    setProductType,
    filterProductList,
    renderPagination,
    unCheckAll,
    movePage,
  };

  return (
    <ProductListContext.Provider value={{ ...contextValue }}>
      <BreadCrumb item={category} />
      <div className="container py-2">
        <div className="row">
          <Category />
          <div className="col-lg-9">
            <span className="fs-4 py-3 d-block d-none d-lg-block">
              {category.toUpperCase()}
            </span>
            <NavFilter />
            <div className="row row-cols-lg-4 row-cols-md-3 row-cols-2 my-2">
              {isLoaded ? (
                renderProductList()
              ) : (
                <div className="loading-img w-100 text-center">
                  <img src="assets/img/Loading_icon.gif" alt="loading" />
                </div>
              )}
              {renderProductList().length == 0 && isLoaded && (
                <>
                  <div className="emty-img w-100 text-center">
                    <img src="assets/img/empty-page.jpg" alt="empty" />
                    <div>Rất tiếc, không tìm thấy sản phẩm.</div>
                  </div>
                </>
              )}
            </div>
            <Pagination />
          </div>
        </div>
      </div>
    </ProductListContext.Provider>
  );
}

export default ProductList;
