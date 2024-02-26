import axios from "axios";
import { toast } from "react-toastify";
import { store } from "../../store/configureStore";
import {
  decreaseRequestCount,
  increaseRequestCount,
} from "../../store/slices/loadingSlice";
import tokenService from "../../services/tokenService";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/",
});

axiosInstance.interceptors.request.use((config) => {
  const token = tokenService.getToken();

  if (token) {
    config.headers.Authorization = "Bearer " + token;
  }

  store.dispatch(increaseRequestCount());

  console.log("A request is being made...");
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    store.dispatch(decreaseRequestCount());
    if (response.status === 201) {
      toast.success("Creation Successful");
    }
    return response;
  },
  async(error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = tokenService.getRefreshToken();
        const { data: { accessToken, refreshToken: newRefreshToken } } = await axios.post("/auth/refreshToken", null, {
          headers: { Authorization: `Bearer ${refreshToken}` }
        });

        tokenService.setToken(accessToken);
        tokenService.setRefreshToken(newRefreshToken);

        originalRequest.headers.Authorization = "Bearer " + accessToken;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);
        return Promise.reject(refreshError);
      }
    }

    if (error.response) {
      const status = error.response.status;
      if (status === 400) {
         if(error.response.data.detail){
            toast.error(error.response.data.detail);
         }else{
          toast.error("Something went wrong");
         }
        
      } else if (status === 500) {
        toast.error("Internal Server Error");
      } else {
        toast.error("An error occurred: " + error.response.statusText);
      }
    } else if (error.request) {
      toast.error("No response received from server");
    } else {
      toast.error("Error: " + error.message);
    }
    store.dispatch(decreaseRequestCount());
    return Promise.reject(error);
  }
);

export default axiosInstance;
