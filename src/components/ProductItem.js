import React from "react"; 
function ProductItem(props) {
  return (
    <div className="col" key={props.product.id}>
      <div href="product-detail.html" className="d-block w-100">
        <div className="card w-100 mb-2">
          <img
            src={props.product.api_featured_image}
            className="card-img-top"
            style={{
              height: "220px",
              width: "100%",
              objectFit: "contain",
            }}
            alt="..."
          />
          <a className="card-body">
            <h5 className="card-title">{props.product.name}</h5>
            <p className="card-text card-text-wrap">
              {props.product.brand}{" "}
              <span style={{ fontSize: "12px" }}>(ID: {props.product.id})</span>
            </p>

            <div className="card-rate">
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-half"></i>
              <span className="total-rate">(12)</span>
            </div>
            <div className="d-flex flex-wrap justify-content-start align-items-center">
              <span className="pe-3 card-price-new fw-bold pe-2">
                $ {props.product.price}
              </span>
              {props.product.price < 20 && props.product.price > 0 && (
                <span className="pe-3 card-price-old d-block text-decoration-line-through">
                  $20
                </span>
              )}
              {props.product.price < 20 && props.product.price > 0 && (
                <span className="badge">
                  {Math.trunc(((20 - props.product.price) / 20) * 100)}%
                </span>
              )}
              {props.product.price == 0 && (
                <span className="badge badge-free">Gift</span>
              )}
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
