"use client"
import instance from '@/app/api/api_instance';
import { initialStateType } from '@/types/initialState.type';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const postStaff = createAsyncThunk("warehouse/staff", async()=>{
    const response = await instance("/test")
    return response.data
})

const initialState:initialStateType ={
    loading: false,
    data: [],
    error: null
}

const addStaffSlicer = createSlice({
    name: 'warehouse/staff',
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder.addCase(postStaff.pending, (state, action)=>{
            state.loading = true
        }).addCase(postStaff.fulfilled, (state, action)=>{
            state.loading = false
            state.data = action.payload
        }).addCase(postStaff.rejected, (state, action:any)=>{
            state.loading = false
            state.error = action.payload
        })
    }
})

export default addStaffSlicer.reducer