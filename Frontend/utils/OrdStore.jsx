import { configureStore } from "@reduxjs/toolkit";
import OrdReducer from "./OrdSlice";

export const ordStore = configureStore({
    reducer:{
        val: OrdReducer
    }
})