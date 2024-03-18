import axiosInterceptorInstance from "../axios/axiosInterceptorInstance";

export const getAllAdmission = async () => {
  return await axiosInterceptorInstance.get("/api/admission", {
    headers: {
      "Content-Type": "application/octet-stream",
      // Other specific headers if needed for this request
    },
  });
};

export const getSearchAdmission = async (keyword, field) => {
  console.log("getSearchAdmission keyword: ", keyword);
  console.log("getSearchAdmission field: ", field);
  return await axiosInterceptorInstance.get(
    `/api/admission?keyword=${keyword ? keyword : ""}&field=${
      field ? field : "all"
    }`
  );
};

export const getAdmissionDetails = async (id) => {
  return await axiosInterceptorInstance.get(`/api/admission/${id}`);
};
