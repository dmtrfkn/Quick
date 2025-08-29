import { configureStore } from '@reduxjs/toolkit';
import { playerReducer } from './reducers/playerReducer';
// import { userApi } from "./reducers/user";
import userReducer from './slices/UserSlice';
import usersReducer from './slices/UsersSlice';
import albumReducer from './slices/AlbumSlice';
import tracksReducer from './slices/TrackSlice';
export const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
    player: playerReducer,
    tracks: tracksReducer,
    albums: albumReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
