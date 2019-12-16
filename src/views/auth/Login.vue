<template>
    <main class="container">
        <div class="row d-flex justify-content-center">
            <div class="col-12 col-lg-6 login-box">
                <div class="card">
                    <div class="card-body">
                        <form action="" @submit.prevent="login">
                            <h4>Login to Platform</h4>
                            <p class="mb-4">Events for you</p>
                            <alert/>
                            <form-group
                                :validator="$v.user.username"
                                messageColorClass="text-danger"
                                label="Username"
                                labelClass="sr-only"
                                attribute="username">
                                <input type="text" class="form-control" placeholder="Username"
                                       v-model="user.username">
                            </form-group>
                            <form-group
                                :validator="$v.user.password"
                                messageColorClass="text-danger"
                                label="Password"
                                labelClass="sr-only"
                                attribute="password">
                                <input type="password" class="form-control" placeholder="Password"
                                       v-model="user.password">
                            </form-group>
                            <div class="form-group">
                                <button type="submit" class="btn btn-block btn-submit">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
    import validationLogin from '../../validations/login'

    export default {
        name: "Login",
        data() {
            return {
                user: {}
            }
        },
        computed: {},
        methods: {
            login() {
                this.$v.$touch();
                if (!this.$v.$invalid) {
                    this.$store.dispatch('auth/login', this.user)
                }
            }
        },
        validations: validationLogin,
    }
</script>
<style scoped>

</style>
