"use client";
import React from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllClub,
  getClubDetails,
  joinClubMember,
} from "@/app/services/clubService";

const initialState = {
  clubs: [],
  clubDetails: {},
  clubIsError: false,
  clubIsSuccess: false,
  clubIsLoading: false,
  clubMessage: "",
};

// Get all clubs
export const fetchAllClub = createAsyncThunk(
  "clubs/getAll",
  async (_, thunkAPI) => {
    try {
      return await getAllClub();
    } catch (error) {
      const clubMessage =
        (error.response &&
          error.response.data &&
          error.response.data.clubMessage) ||
        error.clubMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(clubMessage);
    }
  }
);

// Get club details
export const fetchClubDetails = createAsyncThunk(
  "clubs/getDetails",
  async (clubId, thunkAPI) => {
    try {
      return await getClubDetails(clubId);
    } catch (error) {
      const clubMessage =
        (error.response &&
          error.response.data &&
          error.response.data.clubMessage) ||
        error.clubMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(clubMessage);
    }
  }
);

// create club member
export const createClubMember = createAsyncThunk(
  "clubs/createClubMember",
  async (payload, thunkAPI) => {
    try {
      return await joinClubMember(payload);
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

export const clubSlice = createSlice({
  name: "club",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllClub.pending, (state) => {
        state.clubIsLoading = true;
      })
      .addCase(fetchAllClub.fulfilled, (state, action) => {
        state.clubIsLoading = false;
        state.clubIsSuccess = true;
        state.clubs = action.payload;
      })
      .addCase(fetchAllClub.rejected, (state, action) => {
        state.clubIsLoading = false;
        state.clubIsError = true;
        state.clubMessage = action.payload;
      })
      .addCase(fetchClubDetails.pending, (state) => {
        state.clubIsLoading = true;
      })
      .addCase(fetchClubDetails.fulfilled, (state, action) => {
        state.clubIsLoading = false;
        state.clubIsSuccess = true;
        state.clubDetails = action.payload;
      })
      .addCase(fetchClubDetails.rejected, (state, action) => {
        state.clubIsLoading = false;
        state.clubIsError = true;
        state.clubMessage = action.payload;
      })
      .addCase(createClubMember.pending, (state) => {
        state.clubIsLoading = true;
      })
      .addCase(createClubMember.fulfilled, (state, action) => {
        state.clubIsLoading = false;
        state.clubIsSuccess = true;
      })
      .addCase(createClubMember.rejected, (state, action) => {
        state.clubIsLoading = false;
        state.clubIsError = true;
        state.clubMessage = action.payload;
      });
  },
});

export const { reset } = clubSlice.actions;
export default clubSlice.reducer;
