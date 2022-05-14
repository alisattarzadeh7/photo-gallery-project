import { useSelector } from 'react-redux';
import { layoutReducerTypes } from '../Utility/interfaces';

const useSession = () => {
    const username = useSelector((state:layoutReducerTypes) => state.layout.username);
    const password = useSelector((state:layoutReducerTypes) => state.layout.password);
    const token = useSelector((state:layoutReducerTypes) => state.layout.token);
    return {
        username,
        password,
        token,
    };
};

export default useSession;
