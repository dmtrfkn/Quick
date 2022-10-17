import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./reducers/user";
import userReducer from "./slices/UserSlice";
export const store = configureStore({
  reducer: { user: userReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
