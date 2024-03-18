import axiosInterceptorInstance from "../axios/axiosInterceptorInstance";

export const getAllStudentHandbook = async () => {
  return await axiosInterceptorInstance.get("/api/student-handbook");
};

export const getSearchStudentHandbook = async (keyword, field) => {
  console.log("getSearchStudentHandbook keyword: ", keyword);
  console.log("getSearchStudentHandbook field: ", field);
  return await axiosInterceptorInstance.get(
    `/api/student-handbook?keyword=${keyword ? keyword : ""}&field=${
      field ? field : "all"
    }`
  );
};

export const getStudentHandbookDetails = async (id) => {
  return await axiosInterceptorInstance.get(`/api/student-handbook/${id}`);
};
