import axiosInterceptorInstance from "../axios/axiosInterceptorInstance";

export const getAllAbout = async () => {
  return await axiosInterceptorInstance.get("/api/about");
};

export const getSearchAbout = async (keyword, field) => {
  console.log("getSearchAbout keyword: ", keyword);
  console.log("getSearchAbout field: ", field);
  return await axiosInterceptorInstance.get(
    `/api/about?keyword=${keyword ? keyword : ""}&field=${
      field ? field : "all"
    }`
  );
};

export const getAboutDetails = async (id) => {
  return await axiosInterceptorInstance.get(`/api/about/${id}`);
};
