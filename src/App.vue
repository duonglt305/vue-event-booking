<template>
    <div id="app">
        <Header/>
        <transition name="slide-fade">
            <router-view/>
        </transition>
        <Footer/>
    </div>
</template>

<script>
    import Header from './components/layouts/Header'
    import Footer from "./components/layouts/Footer";

    export default {
        name: 'app',
        components: {
            Header,
            Footer
        },
        mounted() {
            document.cookie = 'SameSite=None; Secure';
        },
        watch: {
            $route(from, to) {
                this.$store.dispatch('alert/clear');
            }
        }
    }
</script>
<style scoped lang="scss">
    #app {
        width: calc(100vw - 5px);
        height: 100%;
    }
</style>

