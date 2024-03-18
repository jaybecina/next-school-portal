import axiosInterceptorInstance from "../axios/axiosInterceptorInstance";

export const getAllVirtualTour = async () => {
  return await axiosInterceptorInstance.get("/api/virtual-tour");
};

export const getSearchVirtualTour = async (keyword, field) => {
  console.log("getSearchVirtualTour keyword: ", keyword);
  console.log("getSearchVirtualTour field: ", field);
  return await axiosInterceptorInstance.get(
    `/api/virtual-tour?keyword=${keyword ? keyword : ""}&field=${
      field ? field : "all"
    }`
  );
};

export const getVirtualTourDetails = async (id) => {
  return await axiosInterceptorInstance.get(`/api/virtual-tour/${id}`);
};
