import Vue from 'vue'
import Router from 'vue-router'
import Register from "../views/auth/Register";
import Verify from "../views/auth/Verify";
import Login from "../views/auth/Login";
import store from '../store';
import Home from "../views/Home";
import EventDetail from "../views/events/EventDetail";
import Registration from "../views/events/Registration";
import ReviewPayment from "../views/events/ReviewPayment";
import MyRegistration from "../components/users/MyRegistration";
import ChangePassword from "../components/users/ChangePassword";
import ChangePhoto from "../components/users/ChangePhoto";
import MyQrCode from "../components/users/MyQrCode";
import Articles from "../views/events/Articles";

Vue.use(Router);

const router = new Router({
    mode: 'history',
    linkExactActiveClass: 'active',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import(/* webpackChunkName: "home" */ '../views/Home')
        },
        {
            path: '/register',
            name: 'Register',
            component: () => import(/* webpackChunkName: "register" */ '../views/auth/Register')
        },
        {
            path: '/verify/:username',
            name: 'Verify',
            component: () => import(/* webpackChunkName: "verify" */ '../views/auth/Verify')
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import(/* webpackChunkName: "login" */ '../views/auth/Login')
        },
        {
            path: '/profile',
            component: () => import(/* webpackChunkName: "profile" */ '../views/auth/Profile'),
            children: [
                {
                    path: 'qrcode',
                    name: 'MyQrCode',
                    components: {
                        default: () => import(/* webpackChunkName: "user-profile" */ '../components/users/UserProfile'),
                        profile_detail: () => import(/* webpackChunkName: "my-qr-code" */ '../components/users/MyQrCode'),
                    }
                },
                {
                    path: 'registrations',
                    name: 'MyRegistration',
                    components: {
                        default: () => import(/* webpackChunkName: "user-profile" */ '../components/users/UserProfile'),
                        profile_detail: () => import(/* webpackChunkName: "my-registration" */ '../components/users/MyRegistration'),
                    }
                },
                {
                    path: 'change-password',
                    name: 'ChangePassword',
                    components: {
                        default: () => import(/* webpackChunkName: "user-profile" */ '../components/users/UserProfile'),
                        profile_detail: () => import(/* webpackChunkName: "change-password" */ '../components/users/ChangePassword'),
                    }
                },
                {
                    path: 'change-photo',
                    name: 'ChangePhoto',
                    components: {
                        default: () => import(/* webpackChunkName: "user-profile" */ '../components/users/UserProfile'),
                        profile_detail: () => import(/* webpackChunkName: "change-photo" */ '../components/users/ChangePhoto'),
                    }
                },
            ]
        },
        {
            path: '/:oSlug/:eSlug/event-detail',
            name: 'EventDetail',
            component: () => import(/* webpackChunkName: "event-detail" */ '../views/events/EventDetail'),
        },
        {
            path: '/:oSlug/:eSlug/registration',
            name: 'Registration',
            component: () => import(/* webpackChunkName: "registration" */ '../views/events/Registration'),
        },
        {
            path: '/:oSlug/:eSlug/schedules',
            name: 'Schedules',
            component: () => import(/* webpackChunkName: "schedule" */ '../views/events/Schedules'),
        },
        {
            path: '/:oSlug/:eSlug/review',
            name: 'ReviewPayment',
            component: () => import(/* webpackChunkName: "review-payment" */ '../views/events/ReviewPayment'),
        },

        {
            path: '/:oSlug/:eSlug/news',
            name: 'Articles',
            component: () => import(/* webpackChunkName: "articles" */ '../views/events/Articles'),
        },

        {
            path: '/:oSlug/:eSlug/:aSlug',
            name: 'ArticleDetail',
            component: () => import(/* webpackChunkName: "article-detail" */ '../views/events/ArticleDetail'),
        },
    ]
});


router.beforeEach((to, from, next) => {
    let privatePages = ['Registration', 'ReviewPayment', 'ChangePhoto', 'ChangePassword', 'MyRegistration', 'MyQrCode'];
    let authenticatedPageNotAccess = ['Login', 'Register', 'Verify'];
    let isAuthenticated = store.getters['auth/statusIsLogged'];

    // When access to verify page, if verify status is true => next, else verify status is false => redirect back
    let isVerify = store.getters['auth/statusIsVerifying'];
    if (['Verify'].includes(to.name) && !isVerify) {
        next(from.path);
    } else next();

    // If unauthenticated and access private page, redirect to login page
    if (!isAuthenticated && privatePages.includes(to.name))
        next('/login');
    // If authenticated and access to authenticated page not access, redirect back
    else if (isAuthenticated && authenticatedPageNotAccess.includes(to.name))
        next(from.path);
    // Else next
    else next();
});
export default router;
