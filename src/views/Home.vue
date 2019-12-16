<template>
    <main class="container">
        <EventList/>
    </main>
</template>

<script>
    import EventList from "../components/events/EventList";

    export default {
        name: "Home",
        computed: {},
        components: {
            EventList
        }
    }
</script>
