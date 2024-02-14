import React, { ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store/configureStore';
import toastr from 'toastr';

type Props = {}

const SignUpRoute = ({children}: { children: ReactNode }) => {
    const navigate = useNavigate();
    const credential = useAppSelector(state => state.getCustomerByEmail.data?.authorities);
    useEffect(() => {
        if (credential) {
            navigate("/");
            toastr.info("You have already signed in. Please sign out first");
        }
    }, [credential, navigate]);
    return <>{children}</>;
}
export default SignUpRoute