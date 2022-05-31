import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductListContext } from "./ProductList";

function Pagination(props) {
  const { renderPagination, movePage, currentPage, totalPage } =
    useContext(ProductListContext);

  return (
    <nav aria-label="...">
      <Link to="#">
        <ul className="pagination my-4 justify-content-center">
          <li
            className="page-item"
            onClick={() => movePage(-1)}
            style={
              currentPage == 1
                ? { pointerEvents: "none" }
                : { cursor: "pointer" }
            }
          >
            <span className="page-link">
              <i className="bi bi-arrow-left"></i>
            </span>
          </li>
          {renderPagination().map((li) => li)}
          <li
            className="page-item"
            onClick={() => movePage(1)}
            style={
              currentPage == totalPage
                ? { pointerEvents: "none" }
                : { cursor: "pointer" }
            }
          >
            <span className="page-link">
              <i className="bi bi-arrow-right"></i>
            </span>
          </li>
        </ul>
      </Link>
    </nav>
  );
}

export default Pagination;
