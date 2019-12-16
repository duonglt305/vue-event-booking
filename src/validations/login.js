import {required, minLength} from 'vuelidate/lib/validators'

const validations = {
    user: {
        username: {
            required,
            minLength: minLength(8),
        },
        password: {
            required,
            minLength: minLength(8)
        }
    }
};
export default validations;
