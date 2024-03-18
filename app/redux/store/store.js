"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import eventReducer from "../features/events/eventSlice";
import newsReducer from "../features/news/newsSlice";
import enrollmentReducer from "../features/enrollment/enrollmentSlice";
import curriculumReducer from "../features/curricula/curriculumSlice";
import courseReducer from "../features/courses/courseSlice";
import clubReducer from "../features/clubs/clubSlice";
import sportReducer from "../features/sports/sportSlice";
import studentResourceReducer from "../features/studentResources/studentResourceSlice";
import onlineLearningReducer from "../features/onlineLearnings/onlineLearningSlice";
import examReducer from "../features/exams/examSlice";
import academicCalendarReducer from "../features/academicCalendars/academicCalendarSlice";
import virtualTourReducer from "../features/virtualTours/virtualTourSlice";
import aboutReducer from "../features/abouts/aboutSlice";
import bannerSlideReducer from "../features/bannerSlides/bannerSlideSlice";
import libraryResourceReducer from "../features/libraryResources/libraryResourceSlice";
import testimonialReducer from "../features/testimonials/testimonialSlice";
import admissionReducer from "../features/admissions/admissionSlice";
import studentHandbookReducer from "../features/studentHandbooks/studentHandbookSlice";
// import goalReducer from '../features/goals/goalSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  events: eventReducer,
  newses: newsReducer,
  enrollment: enrollmentReducer,
  curricula: curriculumReducer,
  courses: courseReducer,
  clubs: clubReducer,
  sports: sportReducer,
  studentResources: studentResourceReducer,
  onlineLearnings: onlineLearningReducer,
  exams: examReducer,
  academicCalendars: academicCalendarReducer,
  virtualTours: virtualTourReducer,
  abouts: aboutReducer,
  bannerSlides: bannerSlideReducer,
  testimonials: testimonialReducer,
  libraryResources: libraryResourceReducer,
  admissions: admissionReducer,
  studentHandbooks: studentHandbookReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
