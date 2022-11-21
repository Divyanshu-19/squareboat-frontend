import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import Login from "../features/auth/Login";
import Singup from "../features/auth/Signup";
// import Home from "../features/home/Home";
import ProductCatalog from "../features/product/ProductCatalog";
import ProductDescription from "../features/product/ProductDescription";
import OrderSummary from "../features/order/OrderSummary";
import { useAuth } from "../context/AuthContext";
import config from "../config/config";
import Navbar from "../features/common/Navbar";

const BaseRoutes = () => {
  const { setAuthState } = useAuth();

  const getUserDetails = async () => {
    try {
      const result = await axios.get(`${config.URL}/api/v1/user/data`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAuthState({ type: "LOGIN", payload: result.data.result });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUserDetails();
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Singup />} />
        <Route path="products" element={<ProductCatalog />} />
        <Route path="products/:id" element={<ProductDescription />} />
        <Route path="pastorders" element={<OrderSummary />} />
      </Route>
      <Route path="*" element={<Navigate to="/products" replace />} />
    </Routes>
  );
};

export default BaseRoutes;
