import { configureStore } from "@reduxjs/toolkit"
import registerReducer from "./Components/stateSlices/registerSlice"
import loginReducer from "./Components/stateSlices/loginSlice"
import newprojectReducer from "./Components/stateSlices/newprojectSlice"

const loggedInUserFromStorage = localStorage.getItem("loggedInUser")?JSON.parse(localStorage.getItem("loggedInUser")):null

const preloadedState = {
    login: {
        loggedInUser: loggedInUserFromStorage,
        status: "Login",
        error: null
    }
}

export default configureStore({
    reducer: {
        register: registerReducer,
        login: loginReducer,
        newProject: newprojectReducer
    },
    preloadedState,
})