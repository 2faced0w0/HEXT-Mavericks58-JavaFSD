import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './slices/usersSlice';
import vehiclesReducer from './slices/vehiclesSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    vehicles: vehiclesReducer,
  },
});
