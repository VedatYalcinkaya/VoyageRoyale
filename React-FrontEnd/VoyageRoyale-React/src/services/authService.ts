import axiosInstance from "../utils/interceptors/axiosInterceptors";
import tokenService from "./tokenService";

class AuthService{
    authenticate = async (credentials:any) => {
        try {
            const response = await axiosInstance.post("/auth/authenticate", credentials); 
            const token = response.data.token;
            tokenService.setToken(token);
            return token;
        } catch (error) {
            console.error("Authentication failed:", error);
            throw error;
        }
    }
}

export default new AuthService();