"use client";
import React from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllStudentResource,
  getStudentResourceDetails,
} from "@/app/services/studentResourceService";

const initialState = {
  studentResources: [],
  studentResourceDetails: {},
  studentResourceIsError: false,
  studentResourceIsSuccess: false,
  studentResourceIsLoading: false,
  studentResourceMessage: "",
};

// Get all studentResources
export const fetchAllStudentResource = createAsyncThunk(
  "studentResources/getAll",
  async (_, thunkAPI) => {
    try {
      return await getAllStudentResource();
    } catch (error) {
      const studentResourceMessage =
        (error.response &&
          error.response.data &&
          error.response.data.studentResourceMessage) ||
        error.studentResourceMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(studentResourceMessage);
    }
  }
);

// Get studentResource details
export const fetchStudentResourceDetails = createAsyncThunk(
  "studentResources/getDetails",
  async (studentResourceId, thunkAPI) => {
    try {
      return await getStudentResourceDetails(studentResourceId);
    } catch (error) {
      const studentResourceMessage =
        (error.response &&
          error.response.data &&
          error.response.data.studentResourceMessage) ||
        error.studentResourceMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(studentResourceMessage);
    }
  }
);

export const studentResourceSlice = createSlice({
  name: "studentResource",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllStudentResource.pending, (state) => {
        state.studentResourceIsLoading = true;
      })
      .addCase(fetchAllStudentResource.fulfilled, (state, action) => {
        state.studentResourceIsLoading = false;
        state.studentResourceIsSuccess = true;
        state.studentResources = action.payload;
      })
      .addCase(fetchAllStudentResource.rejected, (state, action) => {
        state.studentResourceIsLoading = false;
        state.studentResourceIsError = true;
        state.studentResourceMessage = action.payload;
      })
      .addCase(fetchStudentResourceDetails.pending, (state) => {
        state.studentResourceIsLoading = true;
      })
      .addCase(fetchStudentResourceDetails.fulfilled, (state, action) => {
        state.studentResourceIsLoading = false;
        state.studentResourceIsSuccess = true;
        state.studentResourceDetails = action.payload;
      })
      .addCase(fetchStudentResourceDetails.rejected, (state, action) => {
        state.studentResourceIsLoading = false;
        state.studentResourceIsError = true;
        state.studentResourceMessage = action.payload;
      });
  },
});

export const { reset } = studentResourceSlice.actions;
export default studentResourceSlice.reducer;
