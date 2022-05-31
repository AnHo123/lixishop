import React, { createContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Register from "./components/Register";
import ScrollToTop from "./components/ScrollToTop";

export const AppContext = createContext();

function App() {
  const [keyword, setKeyword] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [totalCart, setTotalCart] = useState(0);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    setTotalCart(cart.reduce((total, item) => total + item.qty, 0));
  }, []);

  let createRecommendList = (list = []) => {
    let totalSlide = 3,
      itemPerSlide = 4;

    let productsGroup = [],
      productsArr = [],
      startIndex,
      endIndex;

    for (let i = 1; i <= totalSlide; i++) {
      startIndex = (i - 1) * itemPerSlide;
      endIndex = startIndex + itemPerSlide;
      productsArr = list.slice(startIndex, endIndex);
      productsGroup.push(productsArr);
    }

    return productsGroup;
  };

  return (
    <AppContext.Provider
      value={{
        keyword,
        setKeyword,
        isSearch,
        setIsSearch,
        totalCart,
        setTotalCart,
        createRecommendList,
        isLogged,
        setIsLogged,
      }}
    >
      <div className="App">
        <Header />
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/shop" element={<ProductList />} />
            <Route path="/shop/:id" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </ScrollToTop>
        <Footer />
      </div>
    </AppContext.Provider>
  );
}

export default App;
