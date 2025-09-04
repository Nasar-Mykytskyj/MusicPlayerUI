import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './playerSlice';
import userReducer from './userSlice';
import searchReducer from './searchSlice';

const store = configureStore({
  reducer: {
    player: playerReducer,
    user: userReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
