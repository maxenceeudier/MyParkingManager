import { createSlice } from '@reduxjs/toolkit';
import { AppState } from './store';


interface UserStore {
  name: string,
  token: string,
  lock: boolean,
}

const initialState : UserStore = {
  token: "",
  lock: false,
  name: "",
};


export const UserSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    setUser: (state, action) => {
      state.token =  action.payload.token;
      state.name = action.payload.name
      state.lock = action.payload.lock
    },
    removeUser: (state) => {
      state.name = "";
      state.token = "";
      state.lock = false;
    },
    Lock: (state) => {
      state.lock = true
    },
    Unlock: (state) => {
      state.lock = false
    }
  },
});

export const { setUser, removeUser, Lock, Unlock } = UserSlice.actions;

export const selectUser = (state : AppState) => state.user;


export default UserSlice.reducer;