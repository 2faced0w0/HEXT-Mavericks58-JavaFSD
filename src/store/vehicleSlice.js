import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { vehicleService } from '../services/api';

export const fetchVehicles = createAsyncThunk(
  'vehicles/fetchVehicles',
  async (criteria, { rejectWithValue }) => {
    try {
      const response = await vehicleService.searchVehicles(criteria);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const vehicleSlice = createSlice({
  name: 'vehicles',
  initialState: {
    data: [],
    totalElements: 0,
    totalPages: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVehicles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVehicles.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.content || action.payload;
        state.totalElements = action.payload.totalElements;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchVehicles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default vehicleSlice.reducer;
