import React, { ReactNode, useEffect } from 'react'
import { useAppSelector } from '../store/configureStore';
import { useNavigate } from 'react-router-dom';
import toastr from 'toastr';

type Props = {}

const ProtectedRoute = ({children}: { children: ReactNode }) => {
    const navigate = useNavigate();
    const credential = useAppSelector(state => state.getCustomerByEmail.data?.authorities);
    useEffect(() => {
        if (!credential) {
            toastr.info("You do not have permission to access this page");
            navigate("/");
        }
    }, [credential, navigate]);
    return <>{children}</>;
}

export default ProtectedRoute