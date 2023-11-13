import { configureStore } from "@reduxjs/toolkit";
import fruitsSlice from "./storeSlices/fruitsSlice";
import authSlice from "./storeSlices/authSlice";
import languageSlice from "./storeSlices/languageSlice";

const Store = configureStore({
  reducer: {
    auth: authSlice,
    fruits: fruitsSlice,
    language: languageSlice,
  },
});

export default Store;
