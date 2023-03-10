import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { UserSlice } from './UserSlice'

const makeStore = () => configureStore({
  reducer: {
    [UserSlice.name]: UserSlice.reducer,
  },
  devTools: true,
});

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export default makeStore();