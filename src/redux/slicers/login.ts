"use client";
import instance from "@/app/api/api_instance";
import { initialStateType } from "@/types/initialState.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: initialStateType = {
  loading: false,
  data: [],
  error: null,
};

export const loginUser = createAsyncThunk(
  "warehouse/login",
  async (login: any) => {
    const response = await instance("/rest-auth/login", login);
    return response.data;
  }
);

const loginSlicer = createSlice({
  name: "warehouse/login",
  reducers: {},
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default loginSlicer.reducer;