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
        watch: {
            $route(from, to) {
                this.$store.dispatch('alert/clear');
            }
        }
    }
</script>
<style scoped lang="scss">
    #app {
        width: 100%;
        height: 100%;
    }
</style>

