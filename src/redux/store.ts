import { configureStore } from "@reduxjs/toolkit";
import bucketsSlice from "./slices/bucketsSlice";
import priceSlice from "./slices/priceSlice";

interface PriceItem {
    id: number;
    price: number;
    weight: number;
    multiplier: number;
}

export const store = configureStore({
    reducer: {
        buckets: bucketsSlice,
        price: priceSlice
    }
})