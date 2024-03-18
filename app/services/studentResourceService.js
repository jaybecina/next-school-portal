import axiosInterceptorInstance from "../axios/axiosInterceptorInstance";

export const getAllStudentResource = async () => {
  return await axiosInterceptorInstance.get("/api/student-resources");
};

export const getSearchStudentResource = async (keyword, field) => {
  console.log("getSearchStudentResource keyword: ", keyword);
  console.log("getSearchStudentResource field: ", field);
  return await axiosInterceptorInstance.get(
    `/api/student-resources?keyword=${keyword ? keyword : ""}&field=${
      field ? field : "all"
    }`
  );
};

export const getStudentResourceDetails = async (id) => {
  return await axiosInterceptorInstance.get(`/api/student-resources/${id}`);
};
