import axiosInterceptorInstance from "../axios/axiosInterceptorInstance";

// export const getAllEnrollments = async () => {
//   return await axiosInterceptorInstance.get("/api/enrollments");
// };

// export const getSearchEnrollments = async (keyword, field) => {
//   console.log("getSearchEvents keyword: ", keyword);
//   console.log("getSearchEvents field: ", field);
//   return await axiosInterceptorInstance.get(
//     `/api/enrollments?keyword=${keyword ? keyword : ""}&field=${
//       field ? field : "all"
//     }`
//   );
// };

export const getEnrollmentDetails = async (studentId) => {
  return await axiosInterceptorInstance.get(
    `/api/getEnrollmentByStudent/${studentId}`
  );
};
