<template>
    <main class="container">
        <div class="row d-flex justify-content-center">
            <div class="col-12 col-lg-6 login-box">
                <div class="card">
                    <div class="card-body">
                        <form @submit.prevent="register" action="">
                            <h4>Register to Platform</h4>
                            <p class="mb-4">Events for you</p>
                            <alert/>
                            <div class="row">
                                <div class="col-12 col-md-6">
                                    <form-group
                                        :validator="$v.attendee.firstname"
                                        attribute="first name"
                                        label="First name"
                                        labelClass="sr-only">
                                        <input class="form-control" placeholder="First name" type="text"
                                               v-model="attendee.firstname">
                                    </form-group>
                                </div>
                                <div class="col-12 col-md-6">
                                    <form-group
                                        :validator="$v.attendee.lastname"
                                        attribute="last name"
                                        label="Last name"
                                        labelClass="sr-only">
                                        <input class="form-control" placeholder="Last name" type="text"
                                               v-model="attendee.lastname">
                                    </form-group>
                                </div>
                            </div>

                            <form-group
                                :validator="$v.attendee.username"
                                attribute="username"
                                label="Username"
                                labelClass="sr-only">
                                <input class="form-control" placeholder="Username" type="text"
                                       v-model="attendee.username">
                            </form-group>

                            <form-group
                                :validator="$v.attendee.email"
                                attribute="email"
                                label="Email"
                                labelClass="sr-only">
                                <input class="form-control" placeholder="Email" type="email"
                                       v-model="attendee.email">
                            </form-group>

                            <form-group
                                :validator="$v.attendee.password"
                                attribute="password"
                                label="Password"
                                labelClass="sr-only">
                                <input class="form-control" placeholder="Password" type="password"
                                       v-model="attendee.password">
                            </form-group>

                            <form-group
                                :validator="$v.attendee.password_confirmation"
                                attribute="confirm password"
                                label="Confirm password"
                                labelClass="sr-only">
                                <input class="form-control" placeholder="Confirm password" type="password"
                                       v-model="attendee.password_confirmation">
                            </form-group>

                            <div class="form-group">
                                <button class="btn btn-block btn-submit" type="submit">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
    import registerValidations from '../../validations/register';

    export default {
        name: "Register",
        data() {
            return {
                attendee: {}
            }
        },
        computed: {},
        methods: {
            register() {
                this.$v.$touch();
                if (!this.$v.$invalid)
                    this.$store.dispatch('auth/register', this.attendee);
            }
        },
        validations: registerValidations

    }
</script>
