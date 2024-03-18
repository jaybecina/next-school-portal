"use client";
import React from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllCurriculum,
  getCurriculumDetails,
} from "@/app/services/curriculumService";

const initialState = {
  curricula: [],
  curriculumDetails: {},
  curriculumIsError: false,
  curriculumIsSuccess: false,
  curriculumIsLoading: false,
  curriculumMessage: "",
};

// Get all curricula
export const fetchAllCurriculum = createAsyncThunk(
  "curricula/getAll",
  async (_, thunkAPI) => {
    try {
      return await getAllCurriculum();
    } catch (error) {
      const curriculumMessage =
        (error.response &&
          error.response.data &&
          error.response.data.curriculumMessage) ||
        error.curriculumMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(curriculumMessage);
    }
  }
);

// Get curriculum details
export const fetchCurriculumDetails = createAsyncThunk(
  "curricula/getDetails",
  async (curriculumId, thunkAPI) => {
    try {
      return await getCurriculumDetails(curriculumId);
    } catch (error) {
      const curriculumMessage =
        (error.response &&
          error.response.data &&
          error.response.data.curriculumMessage) ||
        error.curriculumMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(curriculumMessage);
    }
  }
);

export const curriculumSlice = createSlice({
  name: "curriculum",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCurriculum.pending, (state) => {
        state.curriculumIsLoading = true;
      })
      .addCase(fetchAllCurriculum.fulfilled, (state, action) => {
        state.curriculumIsLoading = false;
        state.curriculumIsSuccess = true;
        state.curricula = action.payload;
      })
      .addCase(fetchAllCurriculum.rejected, (state, action) => {
        state.curriculumIsLoading = false;
        state.curriculumIsError = true;
        state.curriculumMessage = action.payload;
      })
      .addCase(fetchCurriculumDetails.pending, (state) => {
        state.curriculumIsLoading = true;
      })
      .addCase(fetchCurriculumDetails.fulfilled, (state, action) => {
        state.curriculumIsLoading = false;
        state.curriculumIsSuccess = true;
        state.curriculumDetails = action.payload;
      })
      .addCase(fetchCurriculumDetails.rejected, (state, action) => {
        state.curriculumIsLoading = false;
        state.curriculumIsError = true;
        state.curriculumMessage = action.payload;
      });
  },
});

export const { reset } = curriculumSlice.actions;
export default curriculumSlice.reducer;
