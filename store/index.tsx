import { configureStore } from "@reduxjs/toolkit";
import { playerReducer } from "./reducers/playerReducer";
import { userApi } from "./reducers/user";
import userReducer from "./slices/UserSlice";
import tracksReducer from './slices/TrackSlice'
export const store = configureStore({
  reducer: {
    user: userReducer,
    player: playerReducer,
    tracks: tracksReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
