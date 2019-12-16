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

Vue.use(VueToast, {
    defaultProgressBar: false,
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
        sameAs: 'The {attribute} confirmation does not match.'
    }
});

Vue.use(VueCarousel);

Vue.config.productionTip = false;
Vue.config.devtools = true;
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


