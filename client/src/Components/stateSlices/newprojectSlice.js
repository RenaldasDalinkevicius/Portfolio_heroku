import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    status: "idle",
    posted: null,
    error: null
}

export const newProject = createAsyncThunk(
    "new/post",
    async (projectFormData, {rejectWithValue}) => {
        try {
            const {data} = await axios.post(
                "/record/projects/new",
                projectFormData
            )
            return data
        } catch(err) {
            return rejectWithValue(err.response.data)
        }
    }
)

export const newProjectSlice = createSlice({
    name: "newproject",
    initialState,
    reducers: {},
    extraReducers: {
        [newProject.pending]: (state, action) => {
            state.status = "loading"
        },
        [newProject.fulfilled]: (state, action) => {
            state.status = "succeeded"
            state.posted = true
        },
        [newProject.rejected]: (state, action) => {
            state.status = "failed"
            state.error = action.payload.message
        }
    }
})
export default newProjectSlice.reducer