import {changePassword, changePhoto, login, logout, register, verify} from '../../api/auth'
import router from '../../router'
import common from "../../utils/common";

let user = common.getUser();
export default {
    namespaced: true,
    state: {
        user: user,
        status: {
            isLogged: !!user,
            isVerifying: false,
        },
    },
    getters: {
        statusIsVerifying(state) {
            return state.status &&
                state.status.isVerifying;
        },
        statusIsLogged(state) {
            return state.status &&
                state.status.isLogged;
        }
    },
    actions: {
        register({commit, dispatch}, user) {
            dispatch('loading/show', null, {root: true});
            register(user).then(
                response => {
                    commit('registerSuccess');
                    dispatch('loading/hide', null, {root: true});
                    router.push(`/verify/${user.username}`);
                    this._vm.$toastr.s(response.data.message);
                }, error => {
                    this._vm.$toastr.e(error.data.message);
                    dispatch('loading/hide', null, {root: true});
                })
        },
        login({commit, dispatch}, user) {
            dispatch('loading/show', null, {root: true});
            login(user).then(
                response => {
                    commit('loginSuccess', response.data);
                    dispatch('loading/hide', null, {root: true});
                    router.push('/');
                },
                error => {
                    if (error.data.status === 'not_verify') {
                        commit('loginSuccessNotVerify');
                        router.push(`/verify/${user.username}`);
                    }
                    this._vm.$toastr.e(error.data.message);
                    dispatch('loading/hide', null, {root: true});
                });
        },
        logout({commit, dispatch}) {
            dispatch('loading/show', null, {root: true});
            logout().then(() => {
                commit('logout');
                dispatch('loading/hide', null, {root: true});
                router.push('/login');
            }, () => {
                commit('logout');
                dispatch('loading/hide', null, {root: true});
                router.push('/login');
            })
        },
        verify({commit, state, dispatch}, data) {
            dispatch('loading/show', null, {root: true});
            verify(data).then(
                response => {
                    commit('verifySuccess', response.data);
                    dispatch('loading/hide', null, {root: true});
                    router.push('/');
                },
                error => {
                    this._vm.$toastr.e(error.data.message);
                    dispatch('loading/hide', null, {root: true});
                }
            );
        },
        changePassword({commit, dispatch}, data) {
            dispatch('loading/show', null, {root: true});
            changePassword(data).then(
                response => {
                    commit('changePasswordSuccess');
                    this._vm.$toastr.s(response.data.message);
                    router.push('/login');
                    dispatch('loading/hide', null, {root: true});
                }, error => {
                    if (error.status === 422) {
                        this._vm.$toastr.e(error.data.message);
                    }
                    dispatch('loading/hide', null, {root: true});
                })
        },
        changePhoto({commit, dispatch}, data) {
            dispatch('loading/show', null, {root: true});
            changePhoto(data).then(response => {
                this._vm.$toastr.s(response.data.message);
                commit('changePhotoSuccess', response.data);
                dispatch('loading/hide', null, {root: true});
            }, error => {
                if (error.status === 422) {
                    this._vm.$toastr.e(error.data.message);
                }
                dispatch('loading/hide', null, {root: true});
            })
        }
    },
    mutations: {
        registerSuccess(state) {
            state.status = {isVerifying: true};
        },

        loginSuccessNotVerify(state) {
            state.status = {isVerifying: true};
        },

        verifySuccess(state, user) {
            state.status = {
                isLogged: true
            };
            state.user = user;
            common.setUser(user);
        },

        loginSuccess(state, user) {
            state.status = {
                isLogged: true
            };
            state.user = user;
            common.setUser(state.user);
        },

        logout(state) {
            state.status = {};
            state.user = false;
            common.clearUser();
        },
        changePasswordSuccess(state) {
            state.status = {};
            state.user = false;
            common.clearUser();
        },

        changePhotoSuccess(state, {photo}) {
            state.user.user.photo = photo;
            let user = common.getUser();
            user.user.photo = photo;
            common.setUser(user);
        },
        refreshSuccess(state, data) {
            state.user = data;
            common.setUser(data);
        },
        refreshFailure() {
            state.user = {};
            common.clearUser();
            router.push('/login');
        }
    }
}
