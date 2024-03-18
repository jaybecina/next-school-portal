"use client";
import React from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllEvents, getEventDetails } from "@/app/services/eventsService";

const initialState = {
  events: [],
  eventDetails: {},
  eventIsError: false,
  eventIsSuccess: false,
  eventIsLoading: false,
  eventMessage: "",
};

// Get all events
export const fetchAllEvents = createAsyncThunk(
  "events/getAll",
  async (_, thunkAPI) => {
    try {
      return await getAllEvents();
    } catch (error) {
      const eventMessage =
        (error.response &&
          error.response.data &&
          error.response.data.eventMessage) ||
        error.eventMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(eventMessage);
    }
  }
);

// Get event details
export const fetchEventDetails = createAsyncThunk(
  "events/getDetails",
  async (eventId, thunkAPI) => {
    try {
      return await getEventDetails(eventId);
    } catch (error) {
      const eventMessage =
        (error.response &&
          error.response.data &&
          error.response.data.eventMessage) ||
        error.eventMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(eventMessage);
    }
  }
);

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllEvents.pending, (state) => {
        state.eventIsLoading = true;
      })
      .addCase(fetchAllEvents.fulfilled, (state, action) => {
        state.eventIsLoading = false;
        state.eventIsSuccess = true;
        state.events = action.payload;
      })
      .addCase(fetchAllEvents.rejected, (state, action) => {
        state.eventIsLoading = false;
        state.eventIsError = true;
        state.eventMessage = action.payload;
      })
      .addCase(fetchEventDetails.pending, (state) => {
        state.eventIsLoading = true;
      })
      .addCase(fetchEventDetails.fulfilled, (state, action) => {
        state.eventIsLoading = false;
        state.eventIsSuccess = true;
        state.eventDetails = action.payload;
      })
      .addCase(fetchEventDetails.rejected, (state, action) => {
        state.eventIsLoading = false;
        state.eventIsError = true;
        state.eventMessage = action.payload;
      });
  },
});

export const { reset } = eventSlice.actions;
export default eventSlice.reducer;
