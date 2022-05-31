import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { AppContext } from "../App";

function Login() {
  const [errorMessage, setErrorMessage] = useState("")
  const { setIsLogged } = useContext(AppContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let onSubmit = (data) => {
    fetch("https://reqres.in/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json.token) {
          localStorage.setItem("token", json.token);
          localStorage.setItem("email", data.email);
          setIsLogged(true);
        } else {
          setErrorMessage("Email hoặc mật khẩu không chính xác.");
        }
      });
  };  

  return (
    <div className="login-body">
      {localStorage.getItem("token") && <Navigate to="/" replace={true} />}
      <div className="container">
        <a
          href="index.html"
          className="d-lg-none position-absolute top-0 start-0 login-link-text fs-3"
        >
          <i className="bi bi-chevron-left ps-2"></i>
        </a>
        <div className="row mx-auto my-lg-5 login-wrap login-text">
          <div className="col-lg-6 order-1 order-lg-0 login-social d-flex flex-column justify-content-around py-lg-4 px-lg-5">
            <h3 className=" d-none d-lg-block">Đăng nhập</h3>
            <span className=" d-none d-lg-block">
              Đăng nhập để mua hàng và sử dụng những tiện ích mới nhất từ
              www.lixibox.com
            </span>
            <div className="d-grid gap-2 mt-lg-5 mb-2">
              <span className="d-lg-none text-center">Hoặc đăng nhập với:</span>
              <button className="btn btn-login-social">
                <i className="bi bi-facebook fs-4 ps-3 pe-2"></i>
                <span className="d-block">Đăng nhập bằng Facebook</span>
              </button>
              <button className="btn btn-login-social">
                <i className="bi bi-google fs-5 ps-3 pe-2"></i>
                <span className="d-block">Đăng nhập bằng Google</span>
              </button>
              <button className="btn btn-login-social">
                <i className="bi bi-apple fs-4 ps-3 pe-2"></i>
                <span className="d-block">Đăng nhập bằng Apple</span>
              </button>
              <span className="py-2 text-center">
                Bạn chưa có tài khoản?{" "}
                <Link to="/register" className="login-link-text">
                  Đăng ký
                </Link>
              </span>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="col-lg-6 order-0 order-lg-1 px-lg-5 pt-lg-5 py-3 form-login"
          >
            <div className="d-lg-none d-flex flex-column align-items-center">
              <a href="index.html" className="d-block w-50">
                <svg
                  className="d-block mx-auto"
                  viewBox="0 0 240 240"
                  style={{ height: "40px", fill: "white" }}
                  xmlns="http://www.w3.org/2000/svg"
                  xlink="http://www.w3.org/1999/xlink"
                >
                  <g>
                    <path d="M119.900005,1.50008728e-05 C53.6586638,0.0276423263 -0.0202356353,53.7453388 5.72260959e-06,119.986683 C0.0202585322,186.228027 53.7319862,239.912899 119.973332,239.90002 C186.214679,239.887135 239.905522,186.181377 239.900005,119.94003 C239.900005,88.1195658 227.255274,57.6032612 204.749182,35.1084224 C182.24309,12.6135837 151.720466,-0.0158881611 119.900005,1.50008728e-05 M82.9000054,190.79003 L82.9000054,68.84003 C82.9000054,60.51003 77.6800054,53.35003 65.9000054,50.06003 L65.9000054,49.0598589 L130.500005,49.0598589 C133.929924,49.0524535 137.35578,49.2964412 140.750005,49.79003 C143.982126,50.2816158 147.137864,51.1856556 150.140005,52.48003 C154.892899,54.5080129 158.998502,57.8007964 162.010005,62.00003 C165.123339,66.22003 166.676672,71.5866967 166.670005,78.10003 C166.670005,85.26003 165.430005,91.70003 161.430005,96.10003 C157.430005,100.50003 152.280005,104.62003 145.050005,105.86003 L145.050005,106.51003 C145.050005,106.51003 164.290005,105.16003 170.890005,121.63003 C170.980005,121.81003 171.050005,121.99003 171.120005,122.17003 C172.58826,125.738896 173.306485,129.571698 173.230005,133.43003 C173.230005,139.93003 171.676672,145.296697 168.570005,149.53003 C165.550647,153.672015 161.46127,156.914479 156.740005,158.91003 C153.741136,160.213545 150.58419,161.117931 147.350005,161.60003 C144.100005,162.08003 134.120005,163.19003 130.550005,163.19003 L114.830005,163.19003 L114.830005,157.53003 L121.610005,157.53003 C128.196672,157.53003 133.613339,156.446697 137.860005,154.28003 C141.69699,152.202996 144.829735,149.031963 146.860005,145.17003 C149.317396,140.749075 150.562776,135.757204 150.470005,130.70003 C150.470005,123.32003 148.280005,120.70003 143.900005,115.70003 C139.520005,110.70003 133.090005,107.94003 124.610005,107.39003 C123.290005,107.30003 121.560005,107.24003 119.390005,107.24003 L114.860005,107.24003 L114.860005,105.00003 L119.380005,105.00003 C121.550005,105.00003 123.290005,104.95003 124.610005,104.85003 C133.090005,104.296697 139.516672,101.526697 143.890005,96.54003 C148.270005,91.54003 150.460005,88.92003 150.460005,81.54003 C150.551096,76.4842983 149.309481,71.4936927 146.860005,67.07003 C144.82679,63.2102526 141.6948,60.0399819 137.860005,57.96003 C133.620005,55.7933634 128.203339,54.71003 121.610005,54.71003 L108.280005,54.71003 L108.280005,168.44003 L168.980005,168.44003 L173.910005,190.78003 L82.9000054,190.79003 Z"></path>
                  </g>
                </svg>
                <svg
                  className="d-block my-3 mx-auto"
                  viewBox="0 0 462 63"
                  data-radium="true"
                  style={{ width: "118px", height: "16px" }}
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
              <h4 className="text-center py-4">Đăng nhập</h4>
            </div>
            <div className="mb-3">
              <input
                type="email"
                name="email"
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Email"
                aria-describedby="emailHelp"
                {...register("email", {
                  required: true,
                  pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                })}
                onFocus={() => setErrorMessage('')}
              />
              {errors.email?.type == "required" && (
                <span className="error-message">Vui lòng nhập email.</span>
              )}
              {errors.email?.type == "pattern" && (
                <span className="error-message">Email sai cú pháp.</span>
              )}
            </div>
            <div className="mb-3">
              <input
                type="password"
                name="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Mật khẩu"
                {...register("password", { required: true, minLength: 6 })}
                onFocus={() => setErrorMessage('')}
              />
              {errors.password?.type == "required" && (
                <span className="error-message">Vui lòng nhập mật khẩu.</span>
              )}
              {errors.password?.type == "minLength" && (
                <span className="error-message">Mật khẩu phải có ít nhất 6 kí tự.</span>
              )}
              {errorMessage ? <span className="error-message">{errorMessage}</span> : ''}
            </div>
            <button type="submit" className="btn btn-pink w-100 mt-3">
              Đăng nhập
            </button>
            <a href="" className="d-block mt-4 login-link-text">
              Quên mật khẩu?
            </a>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
