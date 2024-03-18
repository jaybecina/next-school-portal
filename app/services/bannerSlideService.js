import axiosInterceptorInstance from "../axios/axiosInterceptorInstance";

export const getAllBannerSlide = async () => {
  return await axiosInterceptorInstance.get("/api/banner-slide");
};

export const getSearchBannerSlide = async (keyword, field) => {
  console.log("getSearchBannerSlide keyword: ", keyword);
  console.log("getSearchBannerSlide field: ", field);
  return await axiosInterceptorInstance.get(
    `/api/banner-slide?keyword=${keyword ? keyword : ""}&field=${
      field ? field : "all"
    }`
  );
};

export const getBannerSlideDetails = async (id) => {
  return await axiosInterceptorInstance.get(`/api/banner-slide/${id}`);
};
