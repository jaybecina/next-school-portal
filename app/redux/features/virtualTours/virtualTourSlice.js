"use client";
import React from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllVirtualTour,
  getVirtualTourDetails,
} from "@/app/services/virtualTourService";

const initialState = {
  virtualTours: [],
  virtualTourDetails: {},
  virtualTourIsError: false,
  virtualTourIsSuccess: false,
  virtualTourIsLoading: false,
  virtualTourMessage: "",
};

// Get all virtualTours
export const fetchAllVirtualTour = createAsyncThunk(
  "virtualTours/getAll",
  async (_, thunkAPI) => {
    try {
      return await getAllVirtualTour();
    } catch (error) {
      const virtualTourMessage =
        (error.response &&
          error.response.data &&
          error.response.data.virtualTourMessage) ||
        error.virtualTourMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(virtualTourMessage);
    }
  }
);

// Get virtualTour details
export const fetchVirtualTourDetails = createAsyncThunk(
  "virtualTours/getDetails",
  async (virtualTourId, thunkAPI) => {
    try {
      return await getVirtualTourDetails(virtualTourId);
    } catch (error) {
      const virtualTourMessage =
        (error.response &&
          error.response.data &&
          error.response.data.virtualTourMessage) ||
        error.virtualTourMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(virtualTourMessage);
    }
  }
);

export const virtualTourSlice = createSlice({
  name: "virtualTour",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllVirtualTour.pending, (state) => {
        state.virtualTourIsLoading = true;
      })
      .addCase(fetchAllVirtualTour.fulfilled, (state, action) => {
        state.virtualTourIsLoading = false;
        state.virtualTourIsSuccess = true;
        state.virtualTours = action.payload;
      })
      .addCase(fetchAllVirtualTour.rejected, (state, action) => {
        state.virtualTourIsLoading = false;
        state.virtualTourIsError = true;
        state.virtualTourMessage = action.payload;
      })
      .addCase(fetchVirtualTourDetails.pending, (state) => {
        state.virtualTourIsLoading = true;
      })
      .addCase(fetchVirtualTourDetails.fulfilled, (state, action) => {
        state.virtualTourIsLoading = false;
        state.virtualTourIsSuccess = true;
        state.virtualTourDetails = action.payload;
      })
      .addCase(fetchVirtualTourDetails.rejected, (state, action) => {
        state.virtualTourIsLoading = false;
        state.virtualTourIsError = true;
        state.virtualTourMessage = action.payload;
      });
  },
});

export const { reset } = virtualTourSlice.actions;
export default virtualTourSlice.reducer;
