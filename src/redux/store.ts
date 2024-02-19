import { configureStore } from "@reduxjs/toolkit";
import bucketsSlice from "./slices/bucketsSlice";

export const store = configureStore({
    reducer: {
        buckets: bucketsSlice
    }
})