<template>
    <div :class="alert.type" class="alert">{{ alert.message }}</div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: "Alert",
        computed: {
            ...mapState({
                alert: state => state.alert
            })
        },
    }
</script>

<style scoped>
    /* Start alert */
    .alert {
        font-size: 0.8em;
        padding: 0.25rem 0.75rem;
        border: none;
        line-height: 16px;
        opacity: 1;
        transition: opacity 0.3s linear;
    }

    .hide.alert.alert-danger {
        opacity: 0;
    }
</style>
