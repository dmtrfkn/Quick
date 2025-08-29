import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

interface userState {
  user?: User;
  is: boolean;
}

const initialState: userState = {
  is: false,
};

export const UserSlice = createSlice({
  initialState,
  name: 'body',
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.is = true;
    },
    change(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = initialState.user;
      state.is = initialState.is;
    },
  },
});

export default UserSlice.reducer;
export const { change, login, logout } = UserSlice.actions;
