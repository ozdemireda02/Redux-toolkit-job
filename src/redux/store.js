import { configureStore } from "@reduxjs/toolkit";
import jobSlice from "./slices/jobSlice";

export default configureStore({
    //! reducerleri {} içine almayı unutmuyoruz.
    reducer:{jobSlice,} 
});