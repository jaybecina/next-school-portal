import axiosInterceptorInstance from "../axios/axiosInterceptorInstance";

export const getAllLibraryResource = async () => {
  return await axiosInterceptorInstance.get("/api/library-resources");
};

export const getSearchLibraryResource = async (keyword, field) => {
  console.log("getSearchLibraryResource keyword: ", keyword);
  console.log("getSearchLibraryResource field: ", field);
  return await axiosInterceptorInstance.get(
    `/api/library-resources?keyword=${keyword ? keyword : ""}&field=${
      field ? field : "all"
    }`
  );
};

export const getLibraryResourceDetails = async (id) => {
  return await axiosInterceptorInstance.get(`/api/library-resources/${id}`);
};
