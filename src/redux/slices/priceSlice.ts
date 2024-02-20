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

            const newState = {
                id: action.payload.id,
                price: action.payload.price,
                weight: action.payload.weight,
            }

            const existsInState = state.some((item: any) => (item.id as unknown as number) === newState.id)

            if (!existsInState) {
                state.push(newState)
            } else {
                const findExistIndexInState = state.findIndex((arr: any) => arr.id === newState.id)
                const newStateArrays = [
                    ...state.slice(0, findExistIndexInState),
                    { ...state[findExistIndexInState], price: newState.price, weight: newState.weight },
                    ...state.slice(findExistIndexInState + 1)
                ]
                // console.log(newStateArrays)
                return newStateArrays
            }
        }
    }
})

export const { storePrice } = priceSlice.actions
export default priceSlice.reducer