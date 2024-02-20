import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState: any = [{
    id: 0,
    price: 0,
    weight: 0,
    multiplier: 0
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
                multiplier: action.payload.multiplier || 0
            }

            const existsInState = state.some((item: any) => (item.id as unknown as number) === newState.id)

            if (!existsInState) {
                state.push(newState)
            } else {
                const findExistIndexInState = state.findIndex((arr: any) => arr.id === newState.id)
                const newStateArrays = [
                    ...state.slice(0, findExistIndexInState),
                    { ...state[findExistIndexInState], price: newState.price, weight: newState.weight, multiplier: newState.multiplier },
                    ...state.slice(findExistIndexInState + 1)
                ]
                // console.log(newStateArrays)
                return newStateArrays
            }
        },
        removePrice: (state, action: PayloadAction<any>) => {
            const id = action.payload
            return state.filter((arr: any) => arr.id !== id)
        }
    }
})

export const { storePrice, removePrice } = priceSlice.actions
export default priceSlice.reducer