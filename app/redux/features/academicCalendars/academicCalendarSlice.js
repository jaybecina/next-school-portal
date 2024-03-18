"use client";
import React from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllAcademicCalendar,
  getAcademicCalendarDetails,
} from "@/app/services/academicCalendarService";

const initialState = {
  academicCalendars: [],
  academicCalendarDetails: {},
  academicCalendarIsError: false,
  academicCalendarIsSuccess: false,
  academicCalendarIsLoading: false,
  academicCalendarMessage: "",
};

// Get all academicCalendars
export const fetchAllAcademicCalendar = createAsyncThunk(
  "academicCalendars/getAll",
  async (_, thunkAPI) => {
    try {
      return await getAllAcademicCalendar();
    } catch (error) {
      const academicCalendarMessage =
        (error.response &&
          error.response.data &&
          error.response.data.academicCalendarMessage) ||
        error.academicCalendarMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(academicCalendarMessage);
    }
  }
);

// Get academicCalendar details
export const fetchAcademicCalendarDetails = createAsyncThunk(
  "academicCalendars/getDetails",
  async (academicCalendarId, thunkAPI) => {
    try {
      return await getAcademicCalendarDetails(academicCalendarId);
    } catch (error) {
      const academicCalendarMessage =
        (error.response &&
          error.response.data &&
          error.response.data.academicCalendarMessage) ||
        error.academicCalendarMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(academicCalendarMessage);
    }
  }
);

export const academicCalendarSlice = createSlice({
  name: "academicCalendar",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllAcademicCalendar.pending, (state) => {
        state.academicCalendarIsLoading = true;
      })
      .addCase(fetchAllAcademicCalendar.fulfilled, (state, action) => {
        state.academicCalendarIsLoading = false;
        state.academicCalendarIsSuccess = true;
        state.academicCalendars = action.payload;
      })
      .addCase(fetchAllAcademicCalendar.rejected, (state, action) => {
        state.academicCalendarIsLoading = false;
        state.academicCalendarIsError = true;
        state.academicCalendarMessage = action.payload;
      })
      .addCase(fetchAcademicCalendarDetails.pending, (state) => {
        state.academicCalendarIsLoading = true;
      })
      .addCase(fetchAcademicCalendarDetails.fulfilled, (state, action) => {
        state.academicCalendarIsLoading = false;
        state.academicCalendarIsSuccess = true;
        state.academicCalendarDetails = action.payload;
      })
      .addCase(fetchAcademicCalendarDetails.rejected, (state, action) => {
        state.academicCalendarIsLoading = false;
        state.academicCalendarIsError = true;
        state.academicCalendarMessage = action.payload;
      });
  },
});

export const { reset } = academicCalendarSlice.actions;
export default academicCalendarSlice.reducer;
