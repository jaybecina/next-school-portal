import axiosInterceptorInstance from "../axios/axiosInterceptorInstance";

export const getAllCurriculum = async () => {
  return await axiosInterceptorInstance.get("/api/curricula");
};

export const getSearchCurriculum = async (keyword, field) => {
  console.log("getSearchCurriculum keyword: ", keyword);
  console.log("getSearchCurriculum field: ", field);
  return await axiosInterceptorInstance.get(
    `/api/curricula?keyword=${keyword ? keyword : ""}&field=${
      field ? field : "all"
    }`
  );
};

export const getCurriculumDetails = async (id) => {
  return await axiosInterceptorInstance.get(`/api/curricula/${id}`);
};
