import axiosInterceptorInstance from "../axios/axiosInterceptorInstance";

export const logoutService = async () => {
  return await axiosInterceptorInstance.post("/api/logout", {});
};
