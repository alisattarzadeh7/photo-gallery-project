import axios from 'axios';
import { store } from '../../redux/store';

const baseURL = 'http://192.168.100.240:8000';

const instance = axios.create({
    baseURL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
});

export default instance;
//
instance.interceptors.request.use(
    (config) => {
        if (store.getState().layout.username) {
            config.auth = {
                username: store.getState().layout.username,
                password: store.getState().layout.password,
            };
        }
        // console.log(document.cookie);
        // console.log('store.getState() : ', localStorage.getItem('persist:root'));
        return config;
    },
);
