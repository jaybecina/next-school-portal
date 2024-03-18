"use client";
import React from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllStudentHandbook,
  getStudentHandbookDetails,
} from "@/app/services/studentHandbookService";

const initialState = {
  studentHandbooks: [],
  studentHandbookDetails: {},
  studentHandbookIsError: false,
  studentHandbookIsSuccess: false,
  studentHandbookIsLoading: false,
  studentHandbookMessage: "",
};

// Get all studentHandbooks
export const fetchAllStudentHandbook = createAsyncThunk(
  "studentHandbooks/getAll",
  async (_, thunkAPI) => {
    try {
      return await getAllStudentHandbook();
    } catch (error) {
      const studentHandbookMessage =
        (error.response &&
          error.response.data &&
          error.response.data.studentHandbookMessage) ||
        error.studentHandbookMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(studentHandbookMessage);
    }
  }
);

// Get studentHandbook details
export const fetchStudentHandbookDetails = createAsyncThunk(
  "studentHandbooks/getDetails",
  async (studentHandbookId, thunkAPI) => {
    try {
      return await getStudentHandbookDetails(studentHandbookId);
    } catch (error) {
      const studentHandbookMessage =
        (error.response &&
          error.response.data &&
          error.response.data.studentHandbookMessage) ||
        error.studentHandbookMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(studentHandbookMessage);
    }
  }
);

export const studentHandbookSlice = createSlice({
  name: "studentHandbook",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllStudentHandbook.pending, (state) => {
        state.studentHandbookIsLoading = true;
      })
      .addCase(fetchAllStudentHandbook.fulfilled, (state, action) => {
        state.studentHandbookIsLoading = false;
        state.studentHandbookIsSuccess = true;
        state.studentHandbooks = action.payload;
      })
      .addCase(fetchAllStudentHandbook.rejected, (state, action) => {
        state.studentHandbookIsLoading = false;
        state.studentHandbookIsError = true;
        state.studentHandbookMessage = action.payload;
      })
      .addCase(fetchStudentHandbookDetails.pending, (state) => {
        state.studentHandbookIsLoading = true;
      })
      .addCase(fetchStudentHandbookDetails.fulfilled, (state, action) => {
        state.studentHandbookIsLoading = false;
        state.studentHandbookIsSuccess = true;
        state.studentHandbookDetails = action.payload;
      })
      .addCase(fetchStudentHandbookDetails.rejected, (state, action) => {
        state.studentHandbookIsLoading = false;
        state.studentHandbookIsError = true;
        state.studentHandbookMessage = action.payload;
      });
  },
});

export const { reset } = studentHandbookSlice.actions;
export default studentHandbookSlice.reducer;
