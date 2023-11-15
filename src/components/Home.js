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
import { useModalHeight } from "../hooks/useModalHeight";

const Home = () => {
  const modalHeight = useModalHeight(0, 0);
  return (
    <div style={{ height: modalHeight }} className="container">
      <Header />
      <Search />
      <Routes>
        <Route path="/fruits" element={<DisplayFruitList />} />
        <Route path="/fruit/:name" element={<DisplayFruit />} />
        <Route exact path="/update" element={<PrivateRoute />}>
          <Route path="/update" element={<UpdateFruit />} />
        </Route>
        <Route path="/info" element={<Info />} />
        <Route path="*" element={<Navigate to="/fruit/Apple" />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default Home;
