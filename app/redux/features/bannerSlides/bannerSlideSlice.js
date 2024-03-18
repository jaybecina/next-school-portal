"use client";
import React from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllBannerSlide,
  getBannerSlideDetails,
} from "@/app/services/bannerSlideService";

const initialState = {
  bannerSlides: [],
  bannerSlidDetails: {},
  bannerSlidIsError: false,
  bannerSlidIsSuccess: false,
  bannerSlidIsLoading: false,
  bannerSlidMessage: "",
};

// Get all bannerSlides
export const fetchAllBannerSlide = createAsyncThunk(
  "bannerSlides/getAll",
  async (_, thunkAPI) => {
    try {
      return await getAllBannerSlide();
    } catch (error) {
      const bannerSlidMessage =
        (error.response &&
          error.response.data &&
          error.response.data.bannerSlidMessage) ||
        error.bannerSlidMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(bannerSlidMessage);
    }
  }
);

// Get bannerSlid details
export const fetchBannerSlideDetails = createAsyncThunk(
  "bannerSlides/getDetails",
  async (bannerSlidId, thunkAPI) => {
    try {
      return await getBannerSlideDetails(bannerSlidId);
    } catch (error) {
      const bannerSlidMessage =
        (error.response &&
          error.response.data &&
          error.response.data.bannerSlidMessage) ||
        error.bannerSlidMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(bannerSlidMessage);
    }
  }
);

export const bannerSlidSlice = createSlice({
  name: "bannerSlid",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBannerSlide.pending, (state) => {
        state.bannerSlidIsLoading = true;
      })
      .addCase(fetchAllBannerSlide.fulfilled, (state, action) => {
        state.bannerSlidIsLoading = false;
        state.bannerSlidIsSuccess = true;
        state.bannerSlides = action.payload;
      })
      .addCase(fetchAllBannerSlide.rejected, (state, action) => {
        state.bannerSlidIsLoading = false;
        state.bannerSlidIsError = true;
        state.bannerSlidMessage = action.payload;
      })
      .addCase(fetchBannerSlideDetails.pending, (state) => {
        state.bannerSlidIsLoading = true;
      })
      .addCase(fetchBannerSlideDetails.fulfilled, (state, action) => {
        state.bannerSlidIsLoading = false;
        state.bannerSlidIsSuccess = true;
        state.bannerSlidDetails = action.payload;
      })
      .addCase(fetchBannerSlideDetails.rejected, (state, action) => {
        state.bannerSlidIsLoading = false;
        state.bannerSlidIsError = true;
        state.bannerSlidMessage = action.payload;
      });
  },
});

export const { reset } = bannerSlidSlice.actions;
export default bannerSlidSlice.reducer;
