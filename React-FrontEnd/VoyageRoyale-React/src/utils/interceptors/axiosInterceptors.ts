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
