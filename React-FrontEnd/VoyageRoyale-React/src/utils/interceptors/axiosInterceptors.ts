import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api/",
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("A request is being made...");
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => {
        if (response && response.data && response.data.token) {
            console.log("Token received from backend:", response.data.token);
        }
        console.log("Successful response received...");
        return response;
    },
    (error) => {
        console.log("An error occurred:", error.response?.data);
        toastr.error(error.response?.data?.message || "An error occurred");
        return Promise.reject(error);
    }
);

export const authenticateUser = async (credentials: { email: string, password: string }) => {
    try {
        const response = await axiosInstance.post('/auth/authenticate', credentials);
        if (response && response.data && response.data.token) {
            const { token } = response.data;
            localStorage.setItem('authToken', token);
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Authentication failed:", error);
        return false;
    }
};

export default axiosInstance;