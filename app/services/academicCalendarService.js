import axiosInterceptorInstance from "../axios/axiosInterceptorInstance";

export const getAllAcademicCalendar = async () => {
  return await axiosInterceptorInstance.get("/api/academic-calendar");
};

export const getSearchAcademicCalendar = async (keyword, field) => {
  console.log("getSearchAcademicCalendar keyword: ", keyword);
  console.log("getSearchAcademicCalendar field: ", field);
  return await axiosInterceptorInstance.get(
    `/api/academic-calendar?keyword=${keyword ? keyword : ""}&field=${
      field ? field : "all"
    }`
  );
};

export const getAcademicCalendarDetails = async (id) => {
  return await axiosInterceptorInstance.get(`/api/academic-calendar/${id}`);
};
