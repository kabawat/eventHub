import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { FetchEventsService } from "../../../lib/services/user";
import { resetStore } from "../../actions";

interface EventsState {
    loading: boolean;
    error: string | null;
    data: any | null;
    status: boolean;
    currentPage: number,
    totalEvents: number,
    totalPages: number

}

// Initial state
const initialState: EventsState = {
    loading: false,
    error: null,
    data: null,
    status: false,
    currentPage: 0,
    totalEvents: 0,
    totalPages: 0,
};

export const fetchAllEvents = createAsyncThunk<any, { page: number }, { rejectValue: string }>(
    "events/fetchEvents",
    async ({ page }, { rejectWithValue }) => {
        console.log("page : ", page)
        try {
            const res = await FetchEventsService({ page });
            return res;
        } catch (error: any){
            console.log("errorMessage" , error)
            const errorMessage = error?.response?.data?.message || "Failed to fetch events.";
            return rejectWithValue(errorMessage);
        }
    }
);

// Slice
const eventsSlice = createSlice({
    name: "events",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllEvents.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllEvents.fulfilled, (state, { payload }: PayloadAction<any>) => {
                const { events, currentPage, totalEvents, totalPages } = payload
                state.data = currentPage == 1 ? events : [...state.data, ...events];
                state.status = true;
                state.loading = false;
                state.error = null;
                state.currentPage = currentPage
                state.totalEvents = totalEvents
                state.totalPages = totalPages
            })
            .addCase(fetchAllEvents.rejected, (state, action) => {
                state.error = action.payload || "Unknown error occurred.";
                state.loading = false;
                state.data = null;
            })
            .addCase(resetStore(), () => initialState)
    },
});

export default eventsSlice.reducer;
