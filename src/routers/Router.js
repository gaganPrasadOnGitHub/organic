import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Login from "../components/Login";

const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
};

export default Router;
