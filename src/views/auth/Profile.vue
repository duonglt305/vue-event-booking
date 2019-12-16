<template>
    <main class="container">
        <b-row>
            <b-col cols="12" lg="4">
                <router-view/>
            </b-col>
            <b-col cols="12" lg="8">
                <transition name="slide-fade">
                    <router-view name="profile_detail"/>
                </transition>
            </b-col>
        </b-row>
    </main>
</template>

<script>
    export default {
        name: "Profile",
    }
</script>

<style scoped>

</style>
