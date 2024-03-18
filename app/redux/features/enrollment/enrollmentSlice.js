"use client";
import React from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getEnrollmentDetails } from "@/app/services/enrollmentService";

const initialState = {
  enrollments: [],
  enrollmentDetails: null,
  enrollmentIsError: false,
  enrollmentIsSuccess: false,
  enrollmentIsLoading: false,
  enrollmentMessage: "",
};

// Get enrollment details
export const fetchEnrollmentDetails = createAsyncThunk(
  "enrollments/getDetails",
  async (enrollmentId, thunkAPI) => {
    try {
      return await getEnrollmentDetails(enrollmentId);
    } catch (error) {
      const enrollmentMessage =
        (error.response &&
          error.response.data &&
          error.response.data.enrollmentMessage) ||
        error.enrollmentMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(enrollmentMessage);
    }
  }
);

export const enrollmentSlice = createSlice({
  name: "enrollment",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEnrollmentDetails.pending, (state) => {
        state.enrollmentIsLoading = true;
      })
      .addCase(fetchEnrollmentDetails.fulfilled, (state, action) => {
        state.enrollmentIsLoading = false;
        state.enrollmentIsSuccess = true;
        state.enrollmentDetails = action.payload;
      })
      .addCase(fetchEnrollmentDetails.rejected, (state, action) => {
        state.enrollmentIsLoading = false;
        state.enrollmentIsError = true;
        state.enrollmentMessage = action.payload;
      });
  },
});

export const { reset } = enrollmentSlice.actions;
export default enrollmentSlice.reducer;
