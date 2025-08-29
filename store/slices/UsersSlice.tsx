import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

interface usersState {
  users?: User[];
}
const usersInitial: usersState = {
  users: [],
};

export const UsersSlice = createSlice({
  initialState: usersInitial,
  name: 'users',
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});
export const { setUsers } = UsersSlice.actions;
export default UsersSlice.reducer;
