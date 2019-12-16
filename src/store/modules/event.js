import {
    articleDetail,
    articles,
    confirmPayment,
    eventDetail,
    eventList,
    executePayment,
    myRegistrations,
    paymentDetail,
    purchaseEvent,
    submitContact,
} from '../../api/event'
import router from "../../router";
import common from "../../utils/common";

export default {
    namespaced: true,
    state: {
        events: [],
        event: {},
        articles: {
            totalPage: 1,
            data: []
        },
        article: {},
        registration: {
            event: {},
            sessions: [],
            ticket: {name: ''},
            status: '',
        },
        registrationTotalPage: 1,
        registrations: [],
        totalPage: 1,
    },
    actions: {
        list({commit, dispatch}, page = 1) {
            dispatch('loading/show', null, {root: true});
            eventList(page).then(
                response => {
                    commit('setEventList', response.data);
                    dispatch('loading/hide', null, {root: true});
                }, error => {
                    dispatch('loading/hide', null, {root: true});
                })
        },
        myRegistrations({commit, dispatch}, page = 1) {
            dispatch('loading/show', null, {root: true});
            myRegistrations(page).then(
                response => {
                    commit('setMyRegistrations', response.data);
                    dispatch('loading/hide', null, {root: true});
                }, error => {
                    dispatch('loading/hide', null, {root: true});
                })
        },
        detail({commit, dispatch}, {oSlug, eSlug}) {
            dispatch('loading/show', null, {root: true});
            commit('removeEventDetail');
            eventDetail(oSlug, eSlug).then(
                response => {
                    commit('setEventDetail', response.data);
                    dispatch('loading/hide', null, {root: true});
                },
                (error) => {
                    this._vm.$toastr.e(error.data.message);
                    dispatch('loading/hide', null, {root: true});
                    router.push('/');
                })
        },
        purchase({commit, dispatch}, {oSlug, eSlug, data}) {
            dispatch('loading/show', null, {root: true});
            data.return_url = common.getReturnUrl(oSlug, eSlug);
            data.cancel_url = `${location.origin}/${oSlug}/${eSlug}/registration`;
            purchaseEvent(oSlug, eSlug, data).then(
                response => {
                    location.href = response.data.url;
                },
                error => {
                    this._vm.$toastr.e(error.data.message);
                    dispatch('loading/hide', null, {root: true});
                }
            );
        },
        paymentDetail({commit, dispatch}, {oSlug, eSlug}) {
            dispatch('loading/show', null, {root: true});
            paymentDetail(oSlug, eSlug).then(
                response => {
                    commit('setPaymentDetail', response.data.data);
                    dispatch('loading/hide', null, {root: true});
                }, error => {
                    this._vm.$toastr.e(error.data.message);
                    dispatch('loading/hide', null, {root: true});
                    router.push('/');
                })
        },

        confirmPayment({commit, dispatch}, data) {
            dispatch('loading/show', null, {root: true});
            confirmPayment(data).then(
                response => {
                    this._vm.$toastr.s(response.data.message);
                    commit('setPaymentSuccess', response.data.registration);
                    dispatch('loading/hide', null, {root: true});
                    router.push('');
                },
                error => {
                    this._vm.$toastr.e(error.data.message);
                    dispatch('loading/hide', null, {root: true});
                }
            )
        },
        executePayment({commit, dispatch}, {oSlug, eSlug, data}) {
            data.return_url = common.getReturnUrl(oSlug, eSlug);
            data.cancel_url = `${location.origin}/${oSlug}/${eSlug}/profile/registrations`;
            dispatch('loading/show', null, {root: true});
            executePayment(data).then(
                response => {
                    location.href = response.data.url;
                }, error => {
                    this._vm.$toastr.e(error.data.message);
                    dispatch('loading/hide', null, {root: true});
                })
        },
        submitContact({commit, dispatch}, data) {
            dispatch('loading/show', null, {root: true});
            submitContact(data).then(
                response => {
                    this._vm.$toastr.s(response.data.message);
                    dispatch('loading/hide', null, {root: true});
                }, error => {
                    this._vm.$toastr.e(error.data.message);
                    dispatch('loading/hide', null, {root: true});
                });
        },
        articles({commit, dispatch}, {oSlug, eSlug, page = 1}) {
            dispatch('loading/show', null, {root: true});
            commit('clearArticles');
            articles(oSlug, eSlug, page).then(
                response => {
                    commit('setArticles', response.data);
                    dispatch('loading/hide', null, {root: true});
                }, error => {
                    this._vm.$toastr.s(error.data.message);
                    dispatch('loading/hide', null, {root: true});
                })
        },
        articleDetail({commit, dispatch}, {oSlug, eSlug, aSlug}) {
            dispatch('loading/show', null, {root: true});
            commit('clearArticle');
            articleDetail(oSlug, eSlug, aSlug).then(
                response => {
                    dispatch('loading/hide', null, {root: true});
                    commit('setArticle', response.data);
                },
                error => {
                    dispatch('loading/hide', null, {root: true});
                    this._vm.$toastr.s(error.data.message);
                })
        }
    },
    mutations: {
        setMyRegistrations(state, data) {
            state.registrations = data.data;
            state.registrationTotalPage = data.meta.last_page;
        },
        setPaymentDetail(state, data) {
            state.registration = data;
        },
        setPaymentSuccess(state, data) {
            state.registration = data;
        },
        setEventList: (state, data) => {
            state.events = data.data;
            state.totalPage = data.meta.last_page;
        },
        setEventDetail: (state, data) => {
            state.event = data;
        },
        removeEventDetail: state => {
            state.event = {}
        },
        setArticles(state, data) {
            state.articles.totalPage = data.meta.last_page;
            state.articles.data = data.data;
        },
        clearArticles(state) {
            state.articles = {
                totalPage: 1,
                data: []
            };
        },
        setArticle(state, data) {
            state.article = data;
        },
        clearArticle(state) {
            state.article = {};
        }
    }
}
