const AUTH_KEY = 'app-attendee';
export default {
    /**
     * @type string
     * @description default vue app title
     */
    appTitle: 'Event Booking Platform | DGD',

    /**
     * @type string
     * @description api base url
     */
    apiBaseUrl: 'http://dissertation.test/api/v1/',

    getReturnUrl(oSlug, eSlug) {
        return `${location.origin}/${oSlug}/${eSlug}/review`
    },

    getHeader() {
        let user = this.getUser();
        if (user && user.access_token) {
            return {'Authorization': `Bearer ${user.access_token}`};
        }
        return {};
    },

    getUser() {
        let user = localStorage.getItem(AUTH_KEY);
        return user ? JSON.parse(user) : false;
    },

    setUser(user) {
        localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    },

    clearUser() {
        localStorage.removeItem(AUTH_KEY);
    },
}
