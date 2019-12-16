<template>
    <!--Navbar Start-->
    <b-navbar :sticky="true" toggleable="lg" type="light" variant="light">
        <b-container>
            <b-navbar-brand to="/">
                <img alt="" src="../../assets/img/min-logo.png">
            </b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"/>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="ml-auto" v-if="!isLogged">
                    <b-nav-item :to="{name: 'Register'}">Register</b-nav-item>
                    <b-nav-item :to="{name: 'Login'}">Login</b-nav-item>
                </b-navbar-nav>
                <b-navbar-nav class="ml-auto" v-else>
                    <b-nav-item-dropdown v-if="user" :text="fullName" right>
                        <b-dropdown-item :to="{name: 'MyQrCode'}"><i class="fa fa-user"/> Profile</b-dropdown-item>
                        <b-dropdown-item :to="{name: 'ChangePassword'}"><i class="fa fa-key"/> Change password
                        </b-dropdown-item>
                        <b-dropdown-item @click.prevent="logout" href=""><i class="fa fa-sign-out"/> Logout
                        </b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-container>
    </b-navbar>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: "Header",
        data() {
            return {}
        },
        computed: {
            fullName() {
                return this.user ? `${this.user.firstname} ${this.user.lastname}` : '';
            },
            ...mapState({
                user: state => state.auth.user.user,
                isLogged: state => state.auth.status.isLogged
            })
        },
        methods: {
            logout() {
                this.$store.dispatch('auth/logout');
            }
        }
    }
</script>

<style lang="scss">
    .navbar {
        .dropdown-menu {
            &:focus {
                outline: none;
            }

            &.dropdown-menu-right {
                &.show {
                    border: none;
                    border-radius: 2px;
                    box-shadow: 1px 1px 5px 0 rgba(1, 1, 1, 0.2);
                }
            }

            .dropdown-item {
                text-transform: initial;

                &:focus, &:hover {
                    transition: all 0.3s;
                    color: var(--main);

                    i {
                        transition: all 0.3s;
                        color: var(--main);
                    }
                }
            }
        }
    }
</style>
