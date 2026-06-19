import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { vehicleService } from '../../services/api';

export const fetchVehicles = createAsyncThunk('vehicles/fetchVehicles', async (pageable = { page: 0, size: 100 }) => {
  const response = await vehicleService.searchVehicles(pageable);
  return response.data.content; // Return the list of vehicles
});

const vehiclesSlice = createSlice({
  name: 'vehicles',
  initialState: {
    list: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVehicles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchVehicles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload || [];
      })
      .addCase(fetchVehicles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default vehiclesSlice.reducer;
