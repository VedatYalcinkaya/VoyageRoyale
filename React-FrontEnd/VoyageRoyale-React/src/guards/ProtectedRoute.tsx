import { useAppSelector } from '../store/configureStore';
import { useNavigate } from 'react-router-dom';

type Props = {}

export default function ({children}: { children:any }) {
    const navigate = useNavigate();
    const role = useAppSelector(state => state.getCustomerByEmail.data?.authorities);
    
    if (!role) {
            navigate("/");
    }
    if(role?.includes("CUSTOMER") || role?.includes("CORPORATE_CUSTOMER") || role?.includes("USER")){
        return <>{children}</>
    }
}   
