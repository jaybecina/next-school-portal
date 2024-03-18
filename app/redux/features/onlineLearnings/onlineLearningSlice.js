"use client";
import React from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllOnlineLearning,
  getOnlineLearningDetails,
} from "@/app/services/onlineLearningService";

const initialState = {
  onlineLearnings: [],
  onlineLearningDetails: {},
  onlineLearningIsError: false,
  onlineLearningIsSuccess: false,
  onlineLearningIsLoading: false,
  onlineLearningMessage: "",
};

// Get all onlineLearnings
export const fetchAllOnlineLearning = createAsyncThunk(
  "onlineLearnings/getAll",
  async (_, thunkAPI) => {
    try {
      return await getAllOnlineLearning();
    } catch (error) {
      const onlineLearningMessage =
        (error.response &&
          error.response.data &&
          error.response.data.onlineLearningMessage) ||
        error.onlineLearningMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(onlineLearningMessage);
    }
  }
);

// Get onlineLearning details
export const fetchOnlineLearningDetails = createAsyncThunk(
  "onlineLearnings/getDetails",
  async (onlineLearningId, thunkAPI) => {
    try {
      return await getOnlineLearningDetails(onlineLearningId);
    } catch (error) {
      const onlineLearningMessage =
        (error.response &&
          error.response.data &&
          error.response.data.onlineLearningMessage) ||
        error.onlineLearningMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(onlineLearningMessage);
    }
  }
);

export const onlineLearningSlice = createSlice({
  name: "onlineLearning",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOnlineLearning.pending, (state) => {
        state.onlineLearningIsLoading = true;
      })
      .addCase(fetchAllOnlineLearning.fulfilled, (state, action) => {
        state.onlineLearningIsLoading = false;
        state.onlineLearningIsSuccess = true;
        state.onlineLearnings = action.payload;
      })
      .addCase(fetchAllOnlineLearning.rejected, (state, action) => {
        state.onlineLearningIsLoading = false;
        state.onlineLearningIsError = true;
        state.onlineLearningMessage = action.payload;
      })
      .addCase(fetchOnlineLearningDetails.pending, (state) => {
        state.onlineLearningIsLoading = true;
      })
      .addCase(fetchOnlineLearningDetails.fulfilled, (state, action) => {
        state.onlineLearningIsLoading = false;
        state.onlineLearningIsSuccess = true;
        state.onlineLearningDetails = action.payload;
      })
      .addCase(fetchOnlineLearningDetails.rejected, (state, action) => {
        state.onlineLearningIsLoading = false;
        state.onlineLearningIsError = true;
        state.onlineLearningMessage = action.payload;
      });
  },
});

export const { reset } = onlineLearningSlice.actions;
export default onlineLearningSlice.reducer;
