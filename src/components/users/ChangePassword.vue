<template>
    <b-card  class="mt-4 mt-lg-0">
        <template v-slot:header>
            <p>Change password</p>
        </template>
        <div class="px-5 py-4">
            <form-group
                :validator="$v.current_password"
                attribute="current password"
                labelFor="current_password"
                label="Current Password">
                <input class="form-control" id="current_password" placeholder="Current Password" type="password"
                       v-model="current_password">
            </form-group>
            <form-group
                :validator="$v.new_password"
                attribute="new password"
                labelFor="new_password"
                label="New Password">
                <input class="form-control" id="new_password" placeholder="New Password" type="password"
                       v-model="new_password">
            </form-group>
            <form-group
                :validator="$v.new_password_confirmation"
                attribute="verify password"
                labelFor="new_password_confirmation"
                label="Verify Password">
                <input class="form-control" id="new_password_confirmation" placeholder="Verify Password" type="password"
                       v-model="new_password_confirmation">
            </form-group>
            <div class="form-group text-right">
                <b-button variant="primary" @click.prevent="changePassword">Change password</b-button>
            </div>
        </div>
    </b-card>
</template>

<script>
    import changePasswordValidations from '../../validations/changePassword';

    export default {
        name: "ChangePassword",
        data() {
            return {
                current_password: '',
                new_password: '',
                new_password_confirmation: ''
            }
        },
        methods: {
            changePassword() {
                this.$v.$touch();
                if (!this.$v.$invalid)
                    this.$store.dispatch('auth/changePassword', {
                        current_password: this.current_password,
                        new_password: this.new_password,
                        new_password_confirmation: this.new_password_confirmation,
                    })
            }
        },
        validations: changePasswordValidations,
    }
</script>

<style scoped>

</style>
