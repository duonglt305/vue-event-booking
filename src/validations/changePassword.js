import {minLength, required, sameAs} from 'vuelidate/lib/validators'

const validations = {
    current_password: {
        required,
        minLength: minLength(8),
    },
    new_password: {
        required,
        minLength: minLength(8),
        sameAs: sameAs('new_password_confirmation')
    },
    new_password_confirmation: {
        required,
        minLength: minLength(8),
    }
};
export default validations;
