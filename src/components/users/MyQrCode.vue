<template>
    <b-card class="mt-4 mt-lg-0">
        <template v-slot:header>
            My QrCode
        </template>
        <div class="qrcode-content">
            <qr-code :value="user.registration_code" :options="{width: 300}"/>
        </div>
    </b-card>
</template>

<script>
    import QrCode from '@chenfengyuan/vue-qrcode';
    import {mapState} from "vuex";

    export default {
        name: "MyQrCode",
        components: {
            QrCode,
        },
        computed: {
            ...mapState({
                user: state => state.auth.user.user,
            })
        }
    }
</script>

<style scoped>
    .qrcode-content {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .qrcode-content canvas{
        border: 1px solid var(--main);
    }
</style>
