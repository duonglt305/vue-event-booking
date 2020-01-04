<template>
    <b-card class="card-profile">
        <div class="user-profile" v-lazy-container="{ selector: 'img', loading: speakerLoading, }">
            <img :data-src="photo" alt="profile-photo">
        </div>
        <div class="profile-body">
            <div class="profile-content">
                <div class="profile-info">
                    <a href="" @click.prevent>{{ fullName }}</a>
                </div>
                <div class="profile-item-info">
                    <span class="profile-label">Username:</span>
                    <a class="profile-data" href="" @click.prevent>{{ user.username }}</a>
                </div>
                <div class="profile-item-info">
                    <span class="profile-label">Email:</span>
                    <a class="profile-data" href="" @click.prevent>{{ user.email }}</a>
                </div>
            </div>
            <div class="profile-items">
                <router-link tag="a" :to="{name: 'MyQrCode'}" class="profile-item">
                            <span class="item-content">
                                <i class="fa fa-qrcode"/>
                                <span class="item-desc">My QrCode</span>
                            </span>
                </router-link>
                <router-link tag="a" :to="{name: 'MyRegistration'}" class="profile-item">
                            <span class="item-content">
                                <i class="fa fa-registered"/>
                                <span class="item-desc">My registrations</span>
                            </span>
                </router-link>
                <router-link tag="a" :to="{name: 'ChangePassword'}" class="profile-item">
                            <span class="item-content">
                                <i class="fa fa-key"/>
                                <span class="item-desc">Change password</span>
                            </span>
                </router-link>
                <router-link tag="a" :to="{name: 'ChangePhoto'}" class="profile-item">
                            <span class="item-content">
                                <i class="fa fa-user"/>
                                <span class="item-desc">Change photo</span>
                            </span>
                </router-link>
            </div>
        </div>
    </b-card>
</template>

<script>
    import QrCode from "@chenfengyuan/vue-qrcode";
    import {mapState} from "vuex";
    import common from "../../utils/common";

    export default {
        name: "Profile",
        components: {
            QrCode,
        },
        data() {
            return {
                speakerLoading: common.speakerLoading,
            }
        },
        computed: {
            photo() {
                return this.user && this.user.photo ? this.user.photo : common.defaultPhoto;
            },
            ...mapState({
                user: state => state.auth.user.user
            }),
            fullName() {
                return this.user.firstname + ' ' + this.user.lastname
            }
        }
    }
</script>

<style scoped>

</style>
