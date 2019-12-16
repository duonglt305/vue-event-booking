export default {
    namespaced: true,
    state: {
        type: null,
        message: null,
    },
    actions: {
        success({commit, state}, message) {
            commit('success', message);
            // let timeOut = setTimeout(() => {
            //     commit('clear');
            //     clearTimeout(timeOut);
            // }, state.time)
        },
        failure({commit, state}, message) {
            commit('failure', message);
            // let timeOut = setTimeout(() => {
            //     commit('clear');
            //     clearTimeout(timeOut);
            // }, state.time)
        },
        clear({commit}) {
            commit('clear');
        }
    },
    mutations: {
        success(state, message) {
            state.message = message;
            state.type = 'alert-success';
        },
        failure(state, message) {
            state.message = message;
            state.type = 'alert-danger';
        },
        clear(state) {
            state.message = null;
            state.type = null;
        }
    }
}
