"use client";
import React from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllSport,
  getSportDetails,
  joinSportMember,
} from "@/app/services/sportService";

const initialState = {
  sports: [],
  sportDetails: {},
  sportIsError: false,
  sportIsSuccess: false,
  sportIsLoading: false,
  sportMessage: "",
};

// Get all sports
export const fetchAllSport = createAsyncThunk(
  "sports/getAll",
  async (_, thunkAPI) => {
    try {
      return await getAllSport();
    } catch (error) {
      const sportMessage =
        (error.response &&
          error.response.data &&
          error.response.data.sportMessage) ||
        error.sportMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(sportMessage);
    }
  }
);

// Get sport details
export const fetchSportDetails = createAsyncThunk(
  "sports/getDetails",
  async (sportId, thunkAPI) => {
    try {
      return await getSportDetails(sportId);
    } catch (error) {
      const sportMessage =
        (error.response &&
          error.response.data &&
          error.response.data.sportMessage) ||
        error.sportMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(sportMessage);
    }
  }
);

// create sport member
export const createSportMember = createAsyncThunk(
  "sports/createSportMember",
  async (payload, thunkAPI) => {
    try {
      return await joinSportMember(payload);
    } catch (error) {
      const sportMessage =
        (error.response &&
          error.response.data &&
          error.response.data.sportMessage) ||
        error.sportMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(sportMessage);
    }
  }
);

export const sportSlice = createSlice({
  name: "sport",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSport.pending, (state) => {
        state.sportIsLoading = true;
      })
      .addCase(fetchAllSport.fulfilled, (state, action) => {
        state.sportIsLoading = false;
        state.sportIsSuccess = true;
        state.sports = action.payload;
      })
      .addCase(fetchAllSport.rejected, (state, action) => {
        state.sportIsLoading = false;
        state.sportIsError = true;
        state.sportMessage = action.payload;
      })
      .addCase(fetchSportDetails.pending, (state) => {
        state.sportIsLoading = true;
      })
      .addCase(fetchSportDetails.fulfilled, (state, action) => {
        state.sportIsLoading = false;
        state.sportIsSuccess = true;
        state.sportDetails = action.payload;
      })
      .addCase(fetchSportDetails.rejected, (state, action) => {
        state.sportIsLoading = false;
        state.sportIsError = true;
        state.sportMessage = action.payload;
      })
      .addCase(createSportMember.pending, (state) => {
        state.sportIsLoading = true;
      })
      .addCase(createSportMember.fulfilled, (state, action) => {
        state.sportIsLoading = false;
        state.sportIsSuccess = true;
      })
      .addCase(createSportMember.rejected, (state, action) => {
        state.sportIsLoading = false;
        state.sportIsError = true;
        state.sportMessage = action.payload;
      });
  },
});

export const { reset } = sportSlice.actions;
export default sportSlice.reducer;
