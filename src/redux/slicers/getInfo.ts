"use client";
import instance from "@/app/api/api_instance";
import { getCookie } from "@/app/utils/cookies";
import { initialStateType } from "@/types/initialState.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const infoSection = getCookie("info_page_name");

export const fetchInfo = createAsyncThunk(
  `warehouse/info/get/${infoSection?.name}`,
  async () => {
    const response = await instance(`/info/${infoSection?.name}`);
    return response.data;
  }
);

const initialState: initialStateType = {
  loading: false,
  data: [],
  error: null,
};

const getInfoSlicer = createSlice({
  name: `warehouse/info/get/${infoSection}`,
  reducers: {},
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchInfo.rejected, (state, action) => {
        state.loading = false;
        console.log(action.payload);
      });
  },
});

export default getInfoSlicer.reducer;
