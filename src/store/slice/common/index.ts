import { createSlice } from "@reduxjs/toolkit";
import { resetStore } from "../../actions";

interface CommonState {
    token: string | null;

}

// Initial state
const initialState: CommonState = {
    token: null,
};

// Slice
const commonSlice = createSlice({
    name: "events",
    initialState,
    reducers: {
        updateToken: (state: any, action: any) => {
            state.token = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(resetStore(), () => initialState)
    },
});

export default commonSlice.reducer;
export const { updateToken } = commonSlice.actions
