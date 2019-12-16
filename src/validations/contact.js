import {required, maxLength, email} from 'vuelidate/lib/validators'

const validations = {
    contact: {
        name: {
            required,
        },
        email: {
            required,
            email
        },
        message: {
            required,
            maxLength: maxLength(255),
        },
    }
};
export default validations;
