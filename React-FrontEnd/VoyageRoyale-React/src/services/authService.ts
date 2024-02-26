import axios from "axios";
import tokenService from "./tokenService";

class AuthService{
    authenticate = async (credentials:any) => {
        try {
            const response = await axios.post("http://localhost:8080/api/auth/authenticate", credentials); 
            const token = response.data;
            tokenService.setToken(token.token);
            tokenService.setRefreshToken(token.refreshToken)
            return token;
        } catch (error) {
            console.error("Authentication failed:", error);
            throw error;
        }
    }
}

export default new AuthService();