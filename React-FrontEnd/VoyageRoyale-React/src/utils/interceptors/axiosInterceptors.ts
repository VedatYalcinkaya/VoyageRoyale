 import axios from "axios";
 import toastr from "toastr";
import { store } from "../../store/configureStore";
import { decreaseRequestCount, increaseRequestCount } from "../../store/slices/loadingSlice";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api/",
});

const getToken = () => {
    return localStorage.getItem("accessToken");
};

axiosInstance.interceptors.request.use((config) => {
    const token = getToken();
    
    if (token) {
        config.headers.Authorization = token;
    }

    store.dispatch(increaseRequestCount());
    
    console.log("Bir istek atıldı...");
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => {
        console.log("Başarılı bir cevap alındı...");
        store.dispatch(decreaseRequestCount());
        return response;
    },
    (error) => {
        console.log("Bir hata ile karşılaşıldı", error.message);
      
         toastr.error(error.message);   
     
        
        store.dispatch(decreaseRequestCount());

        return Promise.reject(error.message);
    }
);

const authenticate = async (credentials:any) => {
    try {
        const response = await axiosInstance.post("/auth/authenticate", credentials);
        
        // Extract token from response
        const token = response.data.token;

        // Store token in localStorage
        localStorage.setItem("accessToken", token);

        return token;
    } catch (error) {
        console.error("Authentication failed:", error);
        throw error;
    }
};

export default axiosInstance;
