"use client";
import React from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllTestimonial,
  getTestimonialDetails,
} from "@/app/services/testimonialService";

const initialState = {
  testimonials: [],
  testimonialDetails: {},
  testimonialIsError: false,
  testimonialIsSuccess: false,
  testimonialIsLoading: false,
  testimonialMessage: "",
};

// Get all testimonials
export const fetchAllTestimonial = createAsyncThunk(
  "testimonials/getAll",
  async (_, thunkAPI) => {
    try {
      return await getAllTestimonial();
    } catch (error) {
      const testimonialMessage =
        (error.response &&
          error.response.data &&
          error.response.data.testimonialMessage) ||
        error.testimonialMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(testimonialMessage);
    }
  }
);

// Get testimonial details
export const fetchTestimonialDetails = createAsyncThunk(
  "testimonials/getDetails",
  async (testimonialId, thunkAPI) => {
    try {
      return await getTestimonialDetails(testimonialId);
    } catch (error) {
      const testimonialMessage =
        (error.response &&
          error.response.data &&
          error.response.data.testimonialMessage) ||
        error.testimonialMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(testimonialMessage);
    }
  }
);

export const testimonialSlice = createSlice({
  name: "testimonial",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTestimonial.pending, (state) => {
        state.testimonialIsLoading = true;
      })
      .addCase(fetchAllTestimonial.fulfilled, (state, action) => {
        state.testimonialIsLoading = false;
        state.testimonialIsSuccess = true;
        state.testimonials = action.payload;
      })
      .addCase(fetchAllTestimonial.rejected, (state, action) => {
        state.testimonialIsLoading = false;
        state.testimonialIsError = true;
        state.testimonialMessage = action.payload;
      })
      .addCase(fetchTestimonialDetails.pending, (state) => {
        state.testimonialIsLoading = true;
      })
      .addCase(fetchTestimonialDetails.fulfilled, (state, action) => {
        state.testimonialIsLoading = false;
        state.testimonialIsSuccess = true;
        state.testimonialDetails = action.payload;
      })
      .addCase(fetchTestimonialDetails.rejected, (state, action) => {
        state.testimonialIsLoading = false;
        state.testimonialIsError = true;
        state.testimonialMessage = action.payload;
      });
  },
});

export const { reset } = testimonialSlice.actions;
export default testimonialSlice.reducer;
