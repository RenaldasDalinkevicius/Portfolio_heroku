import { configureStore } from "@reduxjs/toolkit"
import registerReducer from "./Components/stateSlices/registerSlice"

export default configureStore({
    reducer: {
        register: registerReducer
    }
})