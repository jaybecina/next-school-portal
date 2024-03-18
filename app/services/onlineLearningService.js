import axiosInterceptorInstance from "../axios/axiosInterceptorInstance";

export const getAllOnlineLearning = async () => {
  return await axiosInterceptorInstance.get("/api/online-learning");
};

export const getSearchOnlineLearning = async (keyword, field) => {
  console.log("getSearchOnlineLearning keyword: ", keyword);
  console.log("getSearchOnlineLearning field: ", field);
  return await axiosInterceptorInstance.get(
    `/api/online-learning?keyword=${keyword ? keyword : ""}&field=${
      field ? field : "all"
    }`
  );
};

export const getOnlineLearningDetails = async (id) => {
  return await axiosInterceptorInstance.get(`/api/online-learning/${id}`);
};
