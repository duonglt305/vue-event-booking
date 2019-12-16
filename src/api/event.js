import api from '../utils/api';

export const eventList = (page = 1) => api({
    url: `events${page !== 1 ? `/?page=${page}` : ''}`,
});

export const eventDetail = (oSlug, eSlug) => api({
    url: `organizers/${oSlug}/events/${eSlug}`
});


export const purchaseEvent = (oSlug, eSlug, data) => api({
    url: `organizers/${oSlug}/events/${eSlug}/registration`,
    method: 'post',
    data,
});

export const paymentDetail = (oSlug, eSlug) => api({
    url: `organizers/${oSlug}/events/${eSlug}/payment-detail`,
});

export const confirmPayment = (data) => api({
    url: `confirm-payment`,
    method: 'post',
    data,
});
export const executePayment = (data) => api({
    url: `payment`,
    method: 'post',
    data,
});
export const myRegistrations = (page) => api({
    url: `registrations${page !== 1 ? `/?page=${page}` : ''}`,
});

export const submitContact = (data) => api({
    url: 'contact',
    method: 'POST',
    data
});

export const articles = (oSlug, eSlug, page) => api({
    url: `organizers/${oSlug}/events/${eSlug}/articles${page !== 1 ? `/?page=${page}` : ''}`,
});


export const articleDetail = (oSlug, eSlug, aSlug) => api({
    url: `organizers/${oSlug}/events/${eSlug}/${aSlug}`,
});
