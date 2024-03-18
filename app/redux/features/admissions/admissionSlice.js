"use client";
import React from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllAdmission,
  getAdmissionDetails,
} from "@/app/services/admissionService";

const initialState = {
  admissions: [],
  admissionDetails: {},
  admissionIsError: false,
  admissionIsSuccess: false,
  admissionIsLoading: false,
  admissionMessage: "",
};

// Get all admissions
export const fetchAllAdmission = createAsyncThunk(
  "admissions/getAll",
  async (_, thunkAPI) => {
    try {
      return await getAllAdmission();
    } catch (error) {
      const admissionMessage =
        (error.response &&
          error.response.data &&
          error.response.data.admissionMessage) ||
        error.admissionMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(admissionMessage);
    }
  }
);

// Get admission details
export const fetchAdmissionDetails = createAsyncThunk(
  "admissions/getDetails",
  async (admissionId, thunkAPI) => {
    try {
      return await getAdmissionDetails(admissionId);
    } catch (error) {
      const admissionMessage =
        (error.response &&
          error.response.data &&
          error.response.data.admissionMessage) ||
        error.admissionMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(admissionMessage);
    }
  }
);

export const admissionSlice = createSlice({
  name: "admission",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllAdmission.pending, (state) => {
        state.admissionIsLoading = true;
      })
      .addCase(fetchAllAdmission.fulfilled, (state, action) => {
        state.admissionIsLoading = false;
        state.admissionIsSuccess = true;
        state.admissions = action.payload;
      })
      .addCase(fetchAllAdmission.rejected, (state, action) => {
        state.admissionIsLoading = false;
        state.admissionIsError = true;
        state.admissionMessage = action.payload;
      })
      .addCase(fetchAdmissionDetails.pending, (state) => {
        state.admissionIsLoading = true;
      })
      .addCase(fetchAdmissionDetails.fulfilled, (state, action) => {
        state.admissionIsLoading = false;
        state.admissionIsSuccess = true;
        state.admissionDetails = action.payload;
      })
      .addCase(fetchAdmissionDetails.rejected, (state, action) => {
        state.admissionIsLoading = false;
        state.admissionIsError = true;
        state.admissionMessage = action.payload;
      });
  },
});

export const { reset } = admissionSlice.actions;
export default admissionSlice.reducer;
