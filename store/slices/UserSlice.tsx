import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/User";

interface userState {
  user?: User;
  isAuth: boolean;
}

const initialState: userState = {
  isAuth: false,
};

export const UserSlice = createSlice({
  initialState,
  name: "body",
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isAuth = true;
    },
    change(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = initialState.user;
      state.isAuth = initialState.isAuth;
    },
  },
});

export default UserSlice.reducer;
export const { change, login, logout} = UserSlice.actions;
