import api from '../utils/api'

export const login = data => api({
    url: 'auth/login',
    method: 'post',
    data
});
export const verify = data => api({
    url: 'auth/verify',
    method: 'post',
    data
});
export const logout = () => api({
    url: 'auth/logout',
    method: 'post'
});

export const register = data => api({
    url: 'auth/register',
    method: 'post',
    data
});


export const refresh = () => api({
    url: 'auth/refresh',
    method: 'post',
});
export const changePassword = data => api({
    url: 'auth/change-password',
    method: 'post',
    data
});
export const changePhoto = data => api({
    url: 'auth/change-photo',
    method: 'post',
    data
});
