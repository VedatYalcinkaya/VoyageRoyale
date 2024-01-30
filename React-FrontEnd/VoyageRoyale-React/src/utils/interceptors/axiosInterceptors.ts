 import axios from "axios";

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
    
    console.log("Bir istek atıldı...");
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => {
        console.log("Başarılı bir cevap alındı...");
        return response;
    },
    (error) => {
        console.log("Bir hata ile karşılaşıldı", error.response.data);
        toastr.error(error.response.data);
        return Promise.reject(error.response.data);
    }
);

export default axiosInstance;
