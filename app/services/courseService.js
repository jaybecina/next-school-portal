import axiosInterceptorInstance from "../axios/axiosInterceptorInstance";

export const getAllCourse = async () => {
  return await axiosInterceptorInstance.get("/api/courses");
};

export const getSearchCourse = async (keyword, field) => {
  console.log("getSearchCourse keyword: ", keyword);
  console.log("getSearchCourse field: ", field);
  return await axiosInterceptorInstance.get(
    `/api/courses?keyword=${keyword ? keyword : ""}&field=${
      field ? field : "all"
    }`
  );
};

export const getCourseDetails = async (id) => {
  return await axiosInterceptorInstance.get(`/api/courses/${id}`);
};
