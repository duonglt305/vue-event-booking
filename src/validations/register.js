import {required, minLength, email, sameAs} from 'vuelidate/lib/validators'
const validations = {
    attendee: {
        firstname: {
            required,
        },
        lastname: {
            required,
        },
        username: {
            required,
            minLength: minLength(8),
        },
        email: {
            required,
            email
        },
        password: {
            required,
            minLength: minLength(8),
            sameAs: sameAs('password_confirmation')
        },
        password_confirmation: {
            required,
            minLength: minLength(8),
        }
    }
};
export default validations;
