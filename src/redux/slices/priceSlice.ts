import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState: any = [{
    id: 0,
    price: 0,
    weight: 0
}]

const priceSlice = createSlice({
    name: "price",
    initialState,
    reducers: {
        storePrice: (state, action: PayloadAction<any>) => {
            const thisPrice = action.payload
            console.log(state)
        }
    }
})

export const { storePrice } = priceSlice.actions
export default priceSlice.reducer