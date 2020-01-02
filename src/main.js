import Vue from 'vue'
import '@/assets/css/evlis.scss';
import App from './App'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import FormGroup from './components/forms/FormGroup'
import Alert from './components/forms/Alert'
import VuelidateErrorExtractor from 'vuelidate-error-extractor'
import BootstrapVue from 'bootstrap-vue'
import Loading from 'vue-loading-overlay'
import VueCarousel from 'vue-carousel';
import ReadMore from 'vue-read-more';
import VueToast from "vue-toastr";
import VueLazyload from "vue-lazyload";
import common from "./utils/common";

Vue.use(VueToast, {
    defaultProgressBar: false,
});
Vue.use(VueLazyload, {
    attempt: 1,
    loading: common.loadingImage,
    listenEvents: ['scroll']
});
Vue.use(ReadMore);
Vue.component('form-group', FormGroup);
Vue.component('alert', Alert);
Vue.use(Vuelidate);
Vue.use(Loading);
Vue.use(BootstrapVue);
Vue.use(VuelidateErrorExtractor, {
    templates: FormGroup,
    messages: {
        required: 'The {attribute} field is required',
        email: 'The {attribute} must be a valid email address.',
        minLength: 'The {attribute} must be at least {min} characters.',
        maxLength: 'The {attribute} may not be greater than {max} characters.',
        sameAs: 'The {attribute} confirmation does not match.'
    }
});

Vue.use(VueCarousel);

Vue.config.productionTip = process.env.NODE_ENV !== 'production';
Vue.config.devtools = process.env.NODE_ENV !== 'production';
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    components: {
        App
    }
});


