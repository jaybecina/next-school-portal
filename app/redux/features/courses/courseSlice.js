"use client";
import React from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllCourse, getCourseDetails } from "@/app/services/courseService";

const initialState = {
  courses: [],
  courseDetails: {},
  courseIsError: false,
  courseIsSuccess: false,
  courseIsLoading: false,
  courseMessage: "",
};

// Get all courses
export const fetchAllCourse = createAsyncThunk(
  "courses/getAll",
  async (_, thunkAPI) => {
    try {
      return await getAllCourse();
    } catch (error) {
      const courseMessage =
        (error.response &&
          error.response.data &&
          error.response.data.courseMessage) ||
        error.courseMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(courseMessage);
    }
  }
);

// Get course details
export const fetchCourseDetails = createAsyncThunk(
  "courses/getDetails",
  async (courseId, thunkAPI) => {
    try {
      return await getCourseDetails(courseId);
    } catch (error) {
      const courseMessage =
        (error.response &&
          error.response.data &&
          error.response.data.courseMessage) ||
        error.courseMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(courseMessage);
    }
  }
);

export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCourse.pending, (state) => {
        state.courseIsLoading = true;
      })
      .addCase(fetchAllCourse.fulfilled, (state, action) => {
        state.courseIsLoading = false;
        state.courseIsSuccess = true;
        state.courses = action.payload;
      })
      .addCase(fetchAllCourse.rejected, (state, action) => {
        state.courseIsLoading = false;
        state.courseIsError = true;
        state.courseMessage = action.payload;
      })
      .addCase(fetchCourseDetails.pending, (state) => {
        state.courseIsLoading = true;
      })
      .addCase(fetchCourseDetails.fulfilled, (state, action) => {
        state.courseIsLoading = false;
        state.courseIsSuccess = true;
        state.courseDetails = action.payload;
      })
      .addCase(fetchCourseDetails.rejected, (state, action) => {
        state.courseIsLoading = false;
        state.courseIsError = true;
        state.courseMessage = action.payload;
      });
  },
});

export const { reset } = courseSlice.actions;
export default courseSlice.reducer;
