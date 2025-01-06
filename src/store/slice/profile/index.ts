import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ServiceAccessAPI } from "../../../lib/services";
import URLs from "../../../lib/endpoints";
import { resetStore } from "../../actions";

interface UserProfileState {
    loading: boolean;
    error: string | null;
    data: any | null;
    status: boolean;
}

// Initial state
const initialState: UserProfileState = {
    loading: false,
    error: null,
    data: null,
    status: false
};

export const get_profile = createAsyncThunk<any, { token: string }, { rejectValue: string }>(
    "user_profile/getProfile",
    async ({ token = "" }, { rejectWithValue }) => {
        if (token) {
            try {
                const headers = {
                    ['Authorization']: `Bearer ${token}`
                }
                const { data } = await ServiceAccessAPI.get(URLs.PROFILE, { headers });
                return data;
            } catch (error: any) {
                const errorMessage = error?.response?.data?.message || "Failed to fetch profile data.";
                return rejectWithValue(errorMessage);
            }
        } else {
            try {
                const { data } = await ServiceAccessAPI.get(URLs.PROFILE,);
                return data;
            } catch (error: any) {
                const errorMessage = error?.response?.data?.message || "Failed to fetch profile data.";
                return rejectWithValue(errorMessage);
            }
        }
    }
);

// Slice
const userProfileSlice = createSlice({
    name: "user_profile",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(get_profile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(get_profile.fulfilled, (state, action: PayloadAction<any>) => {
                state.data = action.payload;
                state.status = true;
                state.loading = false;
                state.error = null;
            })
            .addCase(get_profile.rejected, (state, action) => {
                state.error = action.payload || "Unknown error occurred.";
                state.loading = false;
                state.data = null;
            })
            .addCase(resetStore(), () => initialState)
    },
});

export default userProfileSlice.reducer;
