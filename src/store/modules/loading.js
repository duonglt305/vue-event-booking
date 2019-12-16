export default {
    namespaced: true,
    state: {
        isLoading: false,
        loader: null,
    },
    actions: {
        show({state, commit}) {
            if (!state.isLoading) {
                let loader = this._vm.$loading.show({
                    container: this._vm.$refs.formContainer,
                });
                commit('setLoader', loader);
                commit('setLoadingStatus', true);
            }
        },
        hide({commit, state}) {
            let time = setTimeout(() => {
                state.loader.hide();
                commit('setLoadingStatus', false);
                clearTimeout(time);
            }, 1500)
        },
    },
    mutations: {
        setLoadingStatus(state, status) {
            state.isLoading = status;
        },
        setLoader(state, loader) {
            state.loader = loader;
        }
    }
};
