import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import keranjangItem from "@/arrays/keranjangItem"

const initialState: any = [...keranjangItem]
// const initialState = "darling"

const bucketsSlice = createSlice({
    name: "buckets",
    initialState,
    reducers: {
        getItem: (state, action: PayloadAction<any>) => {
            const recieved = action.payload
            return recieved
        },
        seeItem: (state) => {
            return state
        }
    }
})

export const { getItem, seeItem } = bucketsSlice.actions
export default bucketsSlice.reducer