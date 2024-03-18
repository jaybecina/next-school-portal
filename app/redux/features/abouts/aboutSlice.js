"use client";
import React from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllAbout, getAboutDetails } from "@/app/services/aboutService";

const initialState = {
  abouts: [],
  aboutDetails: {},
  aboutIsError: false,
  aboutIsSuccess: false,
  aboutIsLoading: false,
  aboutMessage: "",
};

// Get all abouts
export const fetchAllAbout = createAsyncThunk(
  "abouts/getAll",
  async (_, thunkAPI) => {
    try {
      return await getAllAbout();
    } catch (error) {
      const aboutMessage =
        (error.response &&
          error.response.data &&
          error.response.data.aboutMessage) ||
        error.aboutMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(aboutMessage);
    }
  }
);

// Get about details
export const fetchAboutDetails = createAsyncThunk(
  "abouts/getDetails",
  async (aboutId, thunkAPI) => {
    try {
      return await getAboutDetails(aboutId);
    } catch (error) {
      const aboutMessage =
        (error.response &&
          error.response.data &&
          error.response.data.aboutMessage) ||
        error.aboutMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(aboutMessage);
    }
  }
);

export const aboutSlice = createSlice({
  name: "about",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllAbout.pending, (state) => {
        state.aboutIsLoading = true;
      })
      .addCase(fetchAllAbout.fulfilled, (state, action) => {
        state.aboutIsLoading = false;
        state.aboutIsSuccess = true;
        state.abouts = action.payload;
      })
      .addCase(fetchAllAbout.rejected, (state, action) => {
        state.aboutIsLoading = false;
        state.aboutIsError = true;
        state.aboutMessage = action.payload;
      })
      .addCase(fetchAboutDetails.pending, (state) => {
        state.aboutIsLoading = true;
      })
      .addCase(fetchAboutDetails.fulfilled, (state, action) => {
        state.aboutIsLoading = false;
        state.aboutIsSuccess = true;
        state.aboutDetails = action.payload;
      })
      .addCase(fetchAboutDetails.rejected, (state, action) => {
        state.aboutIsLoading = false;
        state.aboutIsError = true;
        state.aboutMessage = action.payload;
      });
  },
});

export const { reset } = aboutSlice.actions;
export default aboutSlice.reducer;
