<template>
    <main class="container">
        <div class="row d-flex justify-content-center">
            <div class="col-12 col-lg-5 login-box">
                <div class="card">
                    <div class="card-body">
                        <form @submit.prevent="verify">
                            <h4>Verify your account</h4>
                            <p class="mb-4">Events for you</p>
                            <alert/>
                            <form-group
                                :validator="$v.verify_code"
                                attribute="verify code"
                                label="Your verify code"
                                labelClass="sr-only"
                                messageColorClass="text-danger">
                                <input class="form-control" placeholder="Your verify code" type="text"
                                       v-model="verify_code">
                            </form-group>
                            <div class="form-group">
                                <button class="btn btn-block btn-submit" type="submit">Verify</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
    import {minLength, required} from 'vuelidate/lib/validators'
    import FormGroup from "../../components/forms/FormGroup"

    export default {
        name: "Verify",
        components: {
            'form-group': FormGroup
        },
        data() {
            return {
                verify_code: null,
            }
        },
        computed: {},
        methods: {
            verify() {
                this.$v.$touch();
                if (!this.$v.$invalid)
                    this.$store.dispatch('auth/verify', {
                        username: this.$route.params.username,
                        verify_code: this.verify_code
                    });
            }
        },
        validations: {
            verify_code: {
                required,
                minLength: minLength(9)
            }
        }
    }
</script>
