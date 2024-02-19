import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import keranjangItem from "@/arrays/keranjangItem"

const initialState: any = [...keranjangItem]

const bucketsSlice = createSlice({
    name: "buckets",
    initialState,
    reducers: {
        getItem: (state, action: PayloadAction<any>) => {
            const recieved = action.payload
            return recieved
        }
    }
})

export const { getItem } = bucketsSlice.actions
export default bucketsSlice.reducer