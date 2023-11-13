import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import Store from "./utils/Store";
import Router from "./routers/Router";

function App() {
  return (
    <Provider store={Store}>
      <Router />
    </Provider>
  );
}

export default App;
