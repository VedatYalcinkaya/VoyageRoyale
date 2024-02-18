import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store/configureStore';

type Props = {}

export default function ({children}: { children: any }) {
    const navigate = useNavigate();
    const credential = useAppSelector(state => state.getCustomerByEmail.data?.authorities);
   
        if (credential) {
            navigate("/");
        }
        if (!credential) {
            return <>{children}</>;
        }
    
    
}
