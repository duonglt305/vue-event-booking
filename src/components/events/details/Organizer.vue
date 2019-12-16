<template>
    <div class="mt-5 card card-body">
        <div class="pl-5 section-title" id="organizer">
            <p>Organizer</p>
        </div>
        <div class="pt-3 pb-3 pr-5 pl-5" v-if="organizer">
            <h5>{{ organizer.name }}</h5>
            <p class="ml-3 mt-3"><i class="fa fa-envelope mr-3"/>{{ organizer.email }}</p>
            <p class="ml-3"><i class="fa fa-phone mr-3"/>{{ organizer.phone }}</p>
            <p class="ml-3"><i class="fa fa-address-card mr-3"/>{{ organizer.address }}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Organizer",
        props: {
            organizer: {
                type: Object,
                default: {}
            }
        }
    }
</script>

<style scoped>
    .card-body {
        padding: unset;
    }
    .section-title {
        border-bottom: 2px solid var(--main);
        margin-bottom: 0.5em;
    }

    .section-title p {
        padding-top: 0.5em;
        padding-bottom: 0.5em;
        font-size: 1.75em;
    }
</style>
