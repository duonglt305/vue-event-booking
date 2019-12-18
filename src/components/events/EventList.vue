<template>
    <b-row
        id="event-list">
        <b-col
            :key="index"
            cols="12" md="6"
            v-for="(item, index) in items">
            <Event :event="item" :index="index"/>
        </b-col>
        <b-col class="mt-3" cols="12">
            <b-pagination-nav
                :number-of-pages="totalPage"
                base-url="?page="
                class="d-flex justify-content-center justify-content-md-end"
                use-router
                v-model="currentPage">
            </b-pagination-nav>
        </b-col>
    </b-row>
</template>

<script>
    import Event from "./Event";
    import {mapState} from 'vuex';

    export default {
        name: "EventList",
        components: {
            Event,
        },
        created() {
            if(!this.items.length)
                this.$store.dispatch('event/list');
        },
        data() {
            return {
                current: 1,
            }
        },
        computed: {
            ...mapState({
                items: state => state.event.events,
                totalPage: state => state.event.totalPage,
            }),
            currentPage: {
                get() {
                    if (this.$route.query.page)
                        this.current = this.$route.query.page;
                    else this.current = 1;
                    return this.current;
                },
                set(value) {
                    this.changePage(value);
                    this.current = value
                }
            },
        },
        methods: {
            changePage(page) {
                this.$store.dispatch('event/list', page);
            },
        }
    }
</script>

<style scoped>

</style>
