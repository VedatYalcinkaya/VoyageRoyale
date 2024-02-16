import { ReactNode, useEffect } from "react";
import { useAppSelector } from "../store/configureStore";
import { useNavigate } from "react-router-dom";
import toastr from "toastr";

export default function ({ children }: { children:any }) {
    const navigate = useNavigate();

    const credential = useAppSelector(state => state.getCustomerByEmail.data?.authorities);


        if (!credential || credential.includes("USER")) {        
            navigate("/");
        }
        if (credential?.includes("ADMIN")) {
            return <>{children}</>;
            
        }
}

