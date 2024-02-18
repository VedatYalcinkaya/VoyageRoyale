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
  (error) => {
    

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
      } else if (status === 401) {
        toast.error("Invalid email or password ");
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
