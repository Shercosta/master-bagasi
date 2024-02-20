import { configureStore } from "@reduxjs/toolkit";
import bucketsSlice from "./slices/bucketsSlice";
import priceSlice from "./slices/priceSlice";

export const store = configureStore({
    reducer: {
        buckets: bucketsSlice,
        price: priceSlice
    }
})