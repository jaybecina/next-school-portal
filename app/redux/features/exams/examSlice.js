"use client";
import React from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllExam, getExamDetails } from "@/app/services/examService";

const initialState = {
  exams: [],
  examDetails: {},
  examIsError: false,
  examIsSuccess: false,
  examIsLoading: false,
  examMessage: "",
};

// Get all exams
export const fetchAllExam = createAsyncThunk(
  "exams/getAll",
  async (_, thunkAPI) => {
    try {
      return await getAllExam();
    } catch (error) {
      const examMessage =
        (error.response &&
          error.response.data &&
          error.response.data.examMessage) ||
        error.examMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(examMessage);
    }
  }
);

// Get exam details
export const fetchExamDetails = createAsyncThunk(
  "exams/getDetails",
  async (examId, thunkAPI) => {
    try {
      return await getExamDetails(examId);
    } catch (error) {
      const examMessage =
        (error.response &&
          error.response.data &&
          error.response.data.examMessage) ||
        error.examMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(examMessage);
    }
  }
);

export const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllExam.pending, (state) => {
        state.examIsLoading = true;
      })
      .addCase(fetchAllExam.fulfilled, (state, action) => {
        state.examIsLoading = false;
        state.examIsSuccess = true;
        state.exams = action.payload;
      })
      .addCase(fetchAllExam.rejected, (state, action) => {
        state.examIsLoading = false;
        state.examIsError = true;
        state.examMessage = action.payload;
      })
      .addCase(fetchExamDetails.pending, (state) => {
        state.examIsLoading = true;
      })
      .addCase(fetchExamDetails.fulfilled, (state, action) => {
        state.examIsLoading = false;
        state.examIsSuccess = true;
        state.examDetails = action.payload;
      })
      .addCase(fetchExamDetails.rejected, (state, action) => {
        state.examIsLoading = false;
        state.examIsError = true;
        state.examMessage = action.payload;
      });
  },
});

export const { reset } = examSlice.actions;
export default examSlice.reducer;
