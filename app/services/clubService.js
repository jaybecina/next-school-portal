import axiosInterceptorInstance from "../axios/axiosInterceptorInstance";

export const getAllClub = async () => {
  return await axiosInterceptorInstance.get("/api/clubs");
};

export const getSearchClub = async (keyword, field) => {
  console.log("getSearchClub keyword: ", keyword);
  console.log("getSearchClub field: ", field);
  return await axiosInterceptorInstance.get(
    `/api/clubs?keyword=${keyword ? keyword : ""}&field=${
      field ? field : "all"
    }`
  );
};

export const getClubDetails = async (id) => {
  return await axiosInterceptorInstance.get(`/api/clubs/${id}`);
};

export const joinClubMember = async ({ id, student_id }) => {
  return await axiosInterceptorInstance.post(`/api/joinClubMember`, {
    id,
    student_id,
  });
};
