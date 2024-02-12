import axios from "axios";
import toastr from "toastr";
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
    return response;
  },
  (error) => {
    store.dispatch(decreaseRequestCount());

    if (error.response) {
      const status = error.response.status;
      if (status === 400) {
        toastr.error(error.response.data.detail);
      } else if (status === 500) {
        toastr.error("Internal Server Error");
      } else if (status === 401) {
        toastr.error("Please sign in ", "Unautharized attempt.");
      } else {
        toastr.error("An error occurred: " + error.response.statusText);
      }
    } else if (error.request) {
      toastr.error("No response received from server");
    } else {
      toastr.error("Error: " + error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
