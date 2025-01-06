import { combineReducers, configureStore } from '@reduxjs/toolkit';
import profileSlice from './slice/profile';
import eventsSlice from './slice/event';
import commonSlice from './slice/common';

// Combine all reducers
const rootReducer = combineReducers({
    profile: profileSlice,
    events: eventsSlice,
    common: commonSlice
});

// Configure the store
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredPaths: ['profile.data', 'payload'],
                ignoredActions: [
                    'profile/setProfileData',
                ],
            },
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export the store
export default store;
