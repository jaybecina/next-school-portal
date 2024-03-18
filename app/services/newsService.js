import axiosInterceptorInstance from "../axios/axiosInterceptorInstance";

export const getAllNews = async () => {
  return await axiosInterceptorInstance.get("/api/news");
};

export const getSearchNews = async (keyword, field) => {
  console.log("getSearchNews keyword: ", keyword);
  console.log("getSearchNews field: ", field);
  return await axiosInterceptorInstance.get(
    `/api/news?keyword=${keyword ? keyword : ""}&field=${field ? field : "all"}`
  );
};

export const getNewsDetails = async (id) => {
  return await axiosInterceptorInstance.get(`/api/news/${id}`);
};
