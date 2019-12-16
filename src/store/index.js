import Vue from 'vue';
import Vuex from 'vuex';
import auth from "./modules/auth";
import loading from "./modules/loading";
import alert from "./modules/alert";
import event from "./modules/event";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        alert,
        auth,
        loading,
        event,
    },
});
