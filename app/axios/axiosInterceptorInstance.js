import axios from "axios";

const rootAPIURL = process.env.NEXT_PUBLIC_API_ROOT_URL;

// Get user from localStorage
let user = null;
if (typeof window !== "undefined") {
  user = JSON.parse(localStorage.getItem("user"));
  console.log("we are running on the client");
} else {
  console.log("we are running on the server");
}

console.log("rootAPIURL: ", process.env.NEXT_PUBLIC_API_ROOT_URL);

const axiosInterceptorInstance = axios.create({
  baseURL: rootAPIURL, // Replace with your API base URL,
  // withCredentials: true,
  // withXSRFToken: true,
});

// Request interceptor
axiosInterceptorInstance.interceptors.request.use(
  (config) => {
    // Modify the request config here (add headers, authentication tokens)
    // const accessToken = JSON.parse(localStorage.getItem("token"));

    if (user?.accessToken) {
      const accessToken = user?.accessToken;
      console.log("token from localstorage users: ", accessToken);

      if (config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
        // config.headers["X-Requested-With"] = "XMLHTTPRequest";
      }

      // Add Content-Type: application/octet-stream for specific requests
      if (config.headers["Content-Type"] === "application/octet-stream") {
        config.headers["Content-Type"] = "application/octet-stream";
      }
    }

    return config;
  },
  (error) => {
    // Handle request errors here

    return Promise.reject(error);
  }
);
// End of Request interceptor

// Response interceptor
axiosInterceptorInstance.interceptors.response.use(
  (response) => {
    // Modify the response data here

    return response;
  },
  async (error) => {
    // Handle response errors here

    const originalRequest = error.config;

    // Check for 401 Unauthorized error indicating token expiration
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // Make a request to refresh the token
        if (user?.accessToken) {
          const refreshToken = process.env.NEXT_PUBLIC_PERSONAL_ACCESS_TOKEN;
          console.log(
            "NEXT_PUBLIC_PERSONAL_ACCESS_TOKEN: ",
            process.env.NEXT_PUBLIC_PERSONAL_ACCESS_TOKEN
          );
          const response = await axiosInterceptorInstance.post(
            "/api/refresh-token",
            {
              personal_access_token: refreshToken,
              userId: user?.user?.id,
            }
          );

          // Update tokens in localStorage
          const updatedUserObject = { ...user };
          updatedUserObject.accessToken = response?.data.accessToken;
          localStorage.setItem("user", JSON.stringify(updatedUserObject));

          // Retry the original request with the new token
          originalRequest.headers.Authorization = `Bearer ${response?.data.accessToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        // Handle refresh token failure (e.g., redirect to login page)
        console.error("Token refresh failed", refreshError);
        // Redirect to login page or perform other actions
      }
    }
    return Promise.reject(error);
  }
);
// End of Response interceptor

export default axiosInterceptorInstance;
