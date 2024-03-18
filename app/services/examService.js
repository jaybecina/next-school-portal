import axiosInterceptorInstance from "../axios/axiosInterceptorInstance";

export const getAllExam = async () => {
  return await axiosInterceptorInstance.get("/api/exams");
};

export const getSearchExam = async (keyword, field) => {
  console.log("getSearchExam keyword: ", keyword);
  console.log("getSearchExam field: ", field);
  return await axiosInterceptorInstance.get(
    `/api/exams?keyword=${keyword ? keyword : ""}&field=${
      field ? field : "all"
    }`
  );
};

export const getExamDetails = async (id) => {
  return await axiosInterceptorInstance.get(`/api/exams/${id}`);
};
