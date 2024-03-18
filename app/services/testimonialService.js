import axiosInterceptorInstance from "../axios/axiosInterceptorInstance";

export const getAllTestimonial = async () => {
  return await axiosInterceptorInstance.get("/api/testimonial");
};

export const getSearchTestimonial = async (keyword, field) => {
  console.log("getSearchTestimonial keyword: ", keyword);
  console.log("getSearchTestimonial field: ", field);
  return await axiosInterceptorInstance.get(
    `/api/testimonial?keyword=${keyword ? keyword : ""}&field=${
      field ? field : "all"
    }`
  );
};

export const getTestimonialDetails = async (id) => {
  return await axiosInterceptorInstance.get(`/api/testimonial/${id}`);
};
