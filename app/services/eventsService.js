import axiosInterceptorInstance from "../axios/axiosInterceptorInstance";

export const getAllEvents = async () => {
  return await axiosInterceptorInstance.get("/api/events");
};

export const getSearchEvents = async (keyword, field) => {
  console.log("getSearchEvents keyword: ", keyword);
  console.log("getSearchEvents field: ", field);
  return await axiosInterceptorInstance.get(
    `/api/events?keyword=${keyword ? keyword : ""}&field=${
      field ? field : "all"
    }`
  );
};

export const getEventDetails = async (id) => {
  return await axiosInterceptorInstance.get(`/api/events/${id}`);
};
