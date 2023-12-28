"use client";
import instance from "@/app/api/api_instance";
import { initialStateType } from "@/types/initialState.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchIncoming = createAsyncThunk("warehouse/incoming", async () => {
  const response = await instance("/depo/incoming");
  return response.data;
});

const initialState: initialStateType = {
  loading: false,
  data: [],
  error: null,
};

const getIncomingSlicer = createSlice({
  name: "warehouse/incoming",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIncoming.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchIncoming.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchIncoming.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default getIncomingSlicer.reducer;
