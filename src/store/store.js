import { configureStore } from '@reduxjs/toolkit';
import vehicleReducer from './vehicleSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    vehicles: vehicleReducer,
    users: userReducer,
  },
});
