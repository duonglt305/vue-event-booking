import axios from 'axios';
import common from "./common";
import store from '../store';
import {refresh} from "../api/auth";
import router from "../router";

const api = axios.create({
    baseURL: common.apiBaseUrl,
    timeout: 20000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

api.interceptors.request.use(
    config => {
        if (!!common.getHeader()['Authorization'])
            config.headers['Authorization'] = common.getHeader()['Authorization'];
        return config;
    },
    error => {
        console.log('>> Log error from request utils/api.js');
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    response => {
        return Promise.resolve(response);
    },
    ({config, response}) => {
        if (response.status === 401) {
            if (response.data.status === 'token_expired') {
                const originalRequest = config;
                return refresh().then(response => {
                    store.commit('auth/refreshSuccess', response.data);
                    originalRequest.headers['Authorization'] = `Bearer ${response.data.access_token}`;
                    return axios.request(config);
                }, error => {
                    store.dispatch('loading/hide', null, {root: true});
                    store.commit('auth/refreshFailure');
                });
            } else if (response.data.status === 'token_invalid') {
                store.commit('auth/refreshFailure');
            }
        }
        return Promise.reject(response)
    }
);

export default api;
