"use client";
import { initialStateType } from "@/types/initialState.type";
import instance from "@/app/api/api_instance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const addStockItem = createAsyncThunk(
  "warehouse/stock/add",
  async (product: any) => {
    const response = await instance("/depo/incoming/create", product);
    return response.data;
  }
);

const initialState: any = {
  loading: false,
  data: [],
  error: null,
};

const addStockItemSlice = createSlice({
  name: "warehouse/stock/add",
  reducers: {},
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(addStockItem.pending, (state) => {
        state.loading = true;
      })
      // .addCase(addStockItem.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.data = action.payload;
      // })
      .addCase(addStockItem.rejected, (state) => {
        state.loading = false;
        console.log(3232);
      });
  },
});

export default addStockItemSlice.reducer;
