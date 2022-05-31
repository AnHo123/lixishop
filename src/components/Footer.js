import React from "react"; 
function Footer() {
  return (
    <>
      {/* <!-- footer mobile --> */}
      <footer className="d-sm-block d-md-none fixed-bottom">
        <div className="p-2 bg-white">
          <div className="d-flex justify-content-around">
            <div className="text-center text-secondary">
              <i className="bi bi-basket3 fs-4"></i>
              <span className="d-block fs-8">Mua sắm</span>
            </div>
            <div className="text-center text-secondary">
              <i className="bi bi-gift fs-4"></i>
              <span className="d-block fs-8">Ưu đãi</span>
            </div>
            <div className="text-center text-secondary">
              <i className="bi bi-youtube fs-4"></i>
              <span className="d-block fs-8">Feed</span>
            </div>
            <div className="text-center text-secondary">
              <i className="bi bi-book fs-4"></i>
              <span className="d-block fs-8">Magazine</span>
            </div>
            <div className="text-center text-secondary">
              <i className="bi bi-person fs-4"></i>
              <span className="d-block fs-8">Tài khoản</span>
            </div>
          </div>
        </div>
      </footer>
      
      {/* <!-- footer pc --> */}
      <footer className="footer bg-dark d-none d-lg-block">
        <div className="container py-4">
          <div className="row">
            <div className="col-md-3 ps-0">
              <a href="#" className="d-block mb-3">
                <svg
                  viewBox="0 0 462 63"
                  data-radium="true"
                  style={{width: "150px"}}
                >
                  <g
                    fill="rgba(255, 255, 255, .9)"
                    fill-rule="nonzero"
                    data-radium="true"
                  >
                    <path d="M87.18,1.91 L87.18,61.15 L79.09,61.15 L79.09,10.15 C79.09,6.68 76.9,3.68 71.88,2.31 L71.88,1.9 L87.18,1.91 Z"></path>
                    <path d="M173.61,60.74 L173.61,61.15 L164.79,61.15 C161.173452,61.1081105 157.808584,59.291082 155.79,56.29 L142.36,35.66 L122.36,61.15 L117.75,61.15 L140.25,32.42 L123.33,6.6 C122.703528,5.65784732 121.910569,4.8377778 120.99,4.18 C120.013371,3.47266848 118.915161,2.95067988 117.75,2.64 L116.29,2.32 L116.29,1.90993035 L125.11,1.91 C128.720827,1.89704795 132.09879,3.69112183 134.11,6.69 L146.11,25.05 L164.24,1.91 L168.85,1.91 L148.2,28.32 L166.48,56.32 C167.119891,57.3060734 167.945163,58.1585154 168.91,58.83 C169.909048,59.5491342 171.035723,60.0717486 172.23,60.37 L173.61,60.74 Z"></path>
                    <path d="M46,61.15 L43.94,57.5 L16.05,57.5 L16.05,1.91 L0.83,1.91 L0.83,2.32 C5.77,3.69 7.96,6.69 7.96,10.16 L7.96,61.16 L46,61.15 Z"></path>
                    <path d="M213.18,1.91 L213.18,61.15 L205.09,61.15 L205.09,10.15 C205.09,6.68 202.9,3.68 197.89,2.31 L197.89,1.9 L213.18,1.91 Z"></path>
                    <path d="M294.1,45.77 C294.1,49.09 291.68,61.15 271.2,61.15 L249.52,61.15 L249.52,10.25 C249.50416,6.14950428 246.390487,2.72489638 242.31,2.32 L242.31,1.91 L271.2,1.91 C289.33,1.67 291.51,14.78 291.51,17.37 C291.51,25.54 286.09,29.26 281.24,30.96 C287.06,32.32 294.1,35.98 294.1,45.77 Z M258.42,29.18 L271.61,29.18 C274.603203,29.1702515 277.466083,27.9542274 279.551328,25.8068768 C281.636573,23.6595262 282.768076,20.7622007 282.69,17.77 C282.69,9.44 277.27,4.77 269.91,4.77 L258.42,4.77 L258.42,29.18 Z M284.31,45.37 C284.31,33.15 271.45,32.01 269.02,32.01 L258.42,32.01 L258.42,58.01 L271.2,58.01 C271.2,58.01 284.31,57.67 284.31,45.37 Z"></path>
                    <path d="M382,31.37 C382,52.81 369.21,62.2 353.43,62.2 C337.65,62.2 324.87,52.81 324.87,31.37 C324.87,10.65 337.65,0.62 353.43,0.62 C369.21,0.62 382,10.49 382,31.37 Z M372.29,31.37 C372.29,12.37 363.87,3.29 353.43,3.29 C342.99,3.29 334.58,12.51 334.58,31.37 C334.58,50.95 343.07,59.45 353.43,59.45 C363.79,59.45 372.28,50.95 372.28,31.37 L372.29,31.37 Z"></path>
                    <path d="M461.94,60.74 L461.94,61.15 L453.12,61.15 C449.500767,61.118512 446.13136,59.2990322 444.12,56.29 L430.7,35.66 L410.7,61.15 L406.1,61.15 L428.6,32.42 L411.69,6.6 C411.057133,5.65974152 410.261283,4.84018478 409.34,4.18 C408.364427,3.47088969 407.265874,2.94873795 406.1,2.64 L404.65,2.32 L404.65,1.90986061 L413.47,1.91 C417.08216,1.89164564 420.462519,3.68699216 422.47,6.69 L434.47,25.05 L452.59,1.91 L457.21,1.91 L436.53,28.32 L454.82,56.32 C455.459891,57.3060734 456.285163,58.1585154 457.25,58.83 C458.245423,59.5490486 459.368814,60.0717138 460.56,60.37 L461.94,60.74 Z"></path>
                  </g>
                </svg>
              </a>
              <span className="footer-text">
                www.lixibox.com là kênh mua sắm mỹ phẩm, làm đẹp hàng đầu Việt
                Nam được các beauty blogger lựa chọn để giới thiệu sản phẩm họ
                yêu thích tới khách hàng, người hâm mộ.
              </span>
            </div>
            <div className="col-md-3">
              <span className="fs-5 mb-3 d-block footer-title">
                Danh mục Sản phẩm
              </span>
              <ul className="list-unstyled">
                <li className="pb-2">
                  {" "}
                  <a href="">Beauty Box</a>
                </li>
                <li className="pb-2">
                  <a href="">Trang điểm</a>
                </li>
                <li className="pb-2">
                  <a href="">Tóc</a>
                </li>
                <li className="pb-2">
                  <a href="">Dưỡng da</a>
                </li>
                <li className="pb-2">
                  <a href="">Cơ thể</a>
                </li>
                <li className="pb-2">
                  <a href="">Cọ và phụ kiện</a>
                </li>
                <li className="pb-2">
                  <a href="">Shop Mẹ và Bé</a>
                </li>
              </ul>
            </div>
            <div className="col-md-3">
              <span className="fs-5 mb-3 d-block footer-title">
                Thông tin & Hướng dẫn
              </span>
              <ul className="list-unstyled">
                <li className="pb-2">
                  {" "}
                  <a href="">Về Lixibox</a>
                </li>
                <li className="pb-2">
                  <a href="">Câu hỏi thường gặp</a>
                </li>
                <li className="pb-2">
                  <a href="">Hỗ trợ Đơn hàng</a>
                </li>
                <li className="pb-2">
                  <a href="">Cửa hàng Lixibox</a>
                </li>
                <li className="pb-2">
                  <a href="">Hướng dẫn cài đặt</a>
                </li>
                <li className="pb-2">
                  <a href="">Phương thức vận chuyển</a>
                </li>
                <li className="pb-2">
                  <a href="">Chính sách đổi trả</a>
                </li>
                <li className="pb-2">
                  <a href="">Điểu khoản sử dụng</a>
                </li>
              </ul>
            </div>
            <div className="col-md-3">
              <span className="fs-5 mb-3 d-block footer-title">
                Tải ứng dụng LIXIBOX
              </span>
              <div className="d-flex mb-3">
                <a href="">
                  <img
                    src="assets/img/ios-app.png"
                    alt=""
                    className="w-100"
                  />
                </a>
                <a href="">
                  <img
                    src="assets/img/android-app.png"
                    alt=""
                    className="w-100"
                  />
                </a>
              </div>
              <span className="text-white fs-6">Hotline: </span>
              <span className="text-white fs-5">1800 2040</span>
              <div className="d-flex mt-2 connect justify-content-between">
                <a href="">
                  <i className="bi bi-facebook fs-2"></i>
                </a>
                <a href="">
                  <i className="bi bi-instagram fs-2"></i>
                </a>
                <a href="">
                  <i className="bi bi-youtube fs-2"></i>
                </a>
                <a href="">
                  <i className="bi bi-messenger fs-2"></i>
                </a>
                <a href="">
                  <i className="bi bi-pinterest fs-2"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
