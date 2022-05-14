import { loginWithUsername } from './Apis&Queries/apis';
import { loginByUsername } from '../redux/actions/LayoutAction';
import { store } from '../redux/store';

export const loginUser = async (username:string, password:string) => {
    const { token } = await loginWithUsername({
        username,
        password,
    });
    if (token) {
        store.dispatch(loginByUsername({
            username,
            password,
            token,
        }));
    }
    return token;
};
