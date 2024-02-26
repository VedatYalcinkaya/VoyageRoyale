import { JwtPayload, jwtDecode } from "jwt-decode";

class TokenService {
    getToken() {
        return localStorage.getItem("token");
    }

    setToken(token: string) {
        localStorage.setItem("token", token);
    }

    getRefreshToken() {
        return localStorage.getItem("refreshToken");
    }

    setRefreshToken(token: string) {
        localStorage.setItem("refreshToken", token);
    }

    logout(){
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("customer");
        localStorage.removeItem("corporateCustomer");
    }

    decodeToken() {
        const token = this.getToken();
        
        if (token !== null) {
            try {
                
                const decode= jwtDecode(token);
                return decode;
                
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        }
        
        return null;
    }
}

export default new TokenService();
