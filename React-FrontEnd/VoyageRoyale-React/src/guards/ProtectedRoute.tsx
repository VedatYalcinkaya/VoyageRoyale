import React, { ReactNode, useEffect } from 'react'
import { useAppSelector } from '../store/configureStore';
import { useNavigate } from 'react-router-dom';
import toastr from 'toastr';
import tokenService from '../services/tokenService';

type Props = {}

const ProtectedRoute = ({children}: { children: ReactNode }) => {
    const navigate = useNavigate();
    const credential = tokenService.getToken();
    useEffect(() => {
        if (!credential) {
            toastr.info("You do not have permission to access this page");
            navigate("/");
        }
    }, [credential, navigate]);
    return <>{children}</>;
}

export default ProtectedRoute