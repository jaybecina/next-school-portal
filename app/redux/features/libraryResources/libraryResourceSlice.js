"use client";
import React from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllLibraryResource,
  getLibraryResourceDetails,
} from "@/app/services/libraryResourceService";

const initialState = {
  libraryResources: [],
  libraryResourceDetails: {},
  libraryResourceIsError: false,
  libraryResourceIsSuccess: false,
  libraryResourceIsLoading: false,
  libraryResourceMessage: "",
};

// Get all libraryResources
export const fetchAllLibraryResource = createAsyncThunk(
  "libraryResources/getAll",
  async (_, thunkAPI) => {
    try {
      return await getAllLibraryResource();
    } catch (error) {
      const libraryResourceMessage =
        (error.response &&
          error.response.data &&
          error.response.data.libraryResourceMessage) ||
        error.libraryResourceMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(libraryResourceMessage);
    }
  }
);

// Get libraryResource details
export const fetchLibraryResourceDetails = createAsyncThunk(
  "libraryResources/getDetails",
  async (libraryResourceId, thunkAPI) => {
    try {
      return await getLibraryResourceDetails(libraryResourceId);
    } catch (error) {
      const libraryResourceMessage =
        (error.response &&
          error.response.data &&
          error.response.data.libraryResourceMessage) ||
        error.libraryResourceMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(libraryResourceMessage);
    }
  }
);

export const libraryResourceSlice = createSlice({
  name: "libraryResource",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllLibraryResource.pending, (state) => {
        state.libraryResourceIsLoading = true;
      })
      .addCase(fetchAllLibraryResource.fulfilled, (state, action) => {
        state.libraryResourceIsLoading = false;
        state.libraryResourceIsSuccess = true;
        state.libraryResources = action.payload;
      })
      .addCase(fetchAllLibraryResource.rejected, (state, action) => {
        state.libraryResourceIsLoading = false;
        state.libraryResourceIsError = true;
        state.libraryResourceMessage = action.payload;
      })
      .addCase(fetchLibraryResourceDetails.pending, (state) => {
        state.libraryResourceIsLoading = true;
      })
      .addCase(fetchLibraryResourceDetails.fulfilled, (state, action) => {
        state.libraryResourceIsLoading = false;
        state.libraryResourceIsSuccess = true;
        state.libraryResourceDetails = action.payload;
      })
      .addCase(fetchLibraryResourceDetails.rejected, (state, action) => {
        state.libraryResourceIsLoading = false;
        state.libraryResourceIsError = true;
        state.libraryResourceMessage = action.payload;
      });
  },
});

export const { reset } = libraryResourceSlice.actions;
export default libraryResourceSlice.reducer;
