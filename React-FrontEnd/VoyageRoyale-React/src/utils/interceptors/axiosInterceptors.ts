 import axios from "axios";
 import toastr from "toastr";
import { store } from "../../store/configureStore";
import { decreaseRequestCount, increaseRequestCount } from "../../store/slices/loadingSlice";
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
    
    console.log("Bir istek atıldı...");
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => {
       
        store.dispatch(decreaseRequestCount());
        return response;
    },
    (error) => {
        
        if(error.status == 400)
         toastr.error(error.error.detail);   
     
        
        store.dispatch(decreaseRequestCount());

        return Promise.reject(error.error.detail);
    }
);



export default axiosInstance;
