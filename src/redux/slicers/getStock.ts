"use client";
import instance from "@/app/api/api_instance";
import { initialStateType } from "@/types/initialState.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchStock = createAsyncThunk("warehouse/stock", async () => {
  const response = await instance("/depo/stock");
  return response.data;
});

const initialState: initialStateType = {
  loading: false,
  data: [],
  error: null,
};

const getStockSlicer = createSlice({
  name: "warehouse/stock",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStock.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchStock.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload;
      })
      .addCase(fetchStock.rejected, (state, action: any) => {
            state.loading = false
            state.error = action.payload;
      });
  },
});

export default getStockSlicer.reducer;
