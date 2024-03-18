import axiosInterceptorInstance from "../axios/axiosInterceptorInstance";

const rootAPIURL = process.env.NEXT_PUBLIC_API_ROOT_URL;

export const refreshToken = async (payload) => {
  return await axiosInterceptorInstance.post(
    `${rootAPIURL}/api/refresh-token`,
    payload
  );
};

// export const CSRF = async () => {
//   return await axiosInterceptorInstance.get(
//     `${rootAPIURL}/sanctum/csrf-cookie`,
//     payload
//   );
// };

// Send Cookies with Subsequent Requests:
// When making subsequent API requests to your Laravel backend that require authentication or using cookies, ensure to send the cookies with the requests.
// Attach cookies to the request headers
// axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
