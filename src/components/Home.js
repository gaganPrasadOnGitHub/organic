import React from "react";
import Header from "./Header";
import Search from "./Search";
import DisplayFruit from "./DisplayFruit";
import DisplayFruitList from "./DisplayFruitList";
import { Routes, Route, Navigate } from "react-router-dom";
import UpdateFruit from "./UpdateFruit";
import PrivateRoute from "../routers/PrivateRoute";
import Footer from "./Footer";
import Info from "./Info";

const Home = () => {
  return (
    <div className="container">
      <Header />
      <Search />
      <Routes>
        <Route path="/fruits" element={<DisplayFruitList />} />
        <Route path="/fruit/:name" element={<DisplayFruit />} />
        <Route exact path="/update" element={<PrivateRoute />}>
          <Route path="/update" element={<UpdateFruit />} />
        </Route>
        <Route path="/info" element={<Info />} />
        <Route path="*" element={<Navigate to="/fruit/Fig" />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default Home;
