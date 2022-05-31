import { Link } from "react-router-dom";

function BreadCrumb(props) {

  return (
    <div className="breadrumb-wrap d-none d-lg-block">
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item py-2 position-relative">
              <Link to="/" className="breadcrumb-link">
                Trang chủ
              </Link>
            </li>
            <li className="breadcrumb-item py-2 position-relative">
              <Link to="/shop" className="breadcrumb-link">
                Sản phẩm
              </Link>
            </li>
            <li
              className="breadcrumb-item py-2 position-relative active"
              aria-current="page"
            >
              {props.item}
            </li>
          </ol>
        </nav>
      </div>
    </div>
  );
}

export default BreadCrumb;
