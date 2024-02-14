import { ReactNode, useEffect } from "react";
import { useAppSelector } from "../store/configureStore";
import { useNavigate } from "react-router-dom";
import toastr from "toastr";

function AdminRoute({ children }: { children: ReactNode }) {
    const navigate = useNavigate();

    const credential = useAppSelector(state => state.getCustomerByEmail.data?.authorities);

    useEffect(() => {
        if (!credential || (credential.includes("CUSTOMER") || credential.includes("CORPORATE_CUSTOMER") || credential.includes("USER"))) {
            toastr.info("You do not have permission to access this page");
            navigate("/");
        }
    }, [credential, navigate]);

    return <>{children}</>;
}

export default AdminRoute;
