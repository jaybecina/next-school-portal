import axiosInterceptorInstance from "../axios/axiosInterceptorInstance";

export const getAllSport = async () => {
  return await axiosInterceptorInstance.get("/api/sports");
};

export const getSearchSport = async (keyword, field) => {
  console.log("getSearchSport keyword: ", keyword);
  console.log("getSearchSport field: ", field);
  return await axiosInterceptorInstance.get(
    `/api/sports?keyword=${keyword ? keyword : ""}&field=${
      field ? field : "all"
    }`
  );
};

export const getSportDetails = async (id) => {
  return await axiosInterceptorInstance.get(`/api/sports/${id}`);
};

export const joinSportMember = async ({ id, student_id }) => {
  return await axiosInterceptorInstance.post(`/api/joinSportMember`, {
    id,
    student_id,
  });
};
