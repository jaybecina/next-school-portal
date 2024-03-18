"use client";
import React from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllNews, getNewsDetails } from "@/app/services/newsService";

const initialState = {
  newses: [],
  newsDetails: {},
  newsIsError: false,
  newsIsSuccess: false,
  newsIsLoading: false,
  newsMessage: "",
};

// Get all newses
export const fetchAllNews = createAsyncThunk(
  "newses/getAll",
  async (_, thunkAPI) => {
    try {
      return await getAllNews();
    } catch (error) {
      const newsMessage =
        (error.response &&
          error.response.data &&
          error.response.data.newsMessage) ||
        error.newsMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(newsMessage);
    }
  }
);

// Get news details
export const fetchNewsDetails = createAsyncThunk(
  "newses/getDetails",
  async (newsId, thunkAPI) => {
    try {
      return await getNewsDetails(newsId);
    } catch (error) {
      const newsMessage =
        (error.response &&
          error.response.data &&
          error.response.data.newsMessage) ||
        error.newsMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(newsMessage);
    }
  }
);

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllNews.pending, (state) => {
        state.newsIsLoading = true;
      })
      .addCase(fetchAllNews.fulfilled, (state, action) => {
        state.newsIsLoading = false;
        state.newsIsSuccess = true;
        state.newses = action.payload;
      })
      .addCase(fetchAllNews.rejected, (state, action) => {
        state.newsIsLoading = false;
        state.newsIsError = true;
        state.newsMessage = action.payload;
      })
      .addCase(fetchNewsDetails.pending, (state) => {
        state.newsIsLoading = true;
      })
      .addCase(fetchNewsDetails.fulfilled, (state, action) => {
        state.newsIsLoading = false;
        state.newsIsSuccess = true;
        state.newsDetails = action.payload;
      })
      .addCase(fetchNewsDetails.rejected, (state, action) => {
        state.newsIsLoading = false;
        state.newsIsError = true;
        state.newsMessage = action.payload;
      });
  },
});

export const { reset } = newsSlice.actions;
export default newsSlice.reducer;
