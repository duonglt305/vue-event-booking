<template>
    <div class="event-box">
        <div class="event-image">
            <b-img-lazy :src="event.thumbnail" alt="event"/>
            <p :class="dateClass">{{ date }}</p>
        </div>
        <div class="event-text">
            <a href="" @click.prevent="resolveEventDetail">
                <h3>{{ event.name }}</h3>
            </a>
            <div class="d-flex flex-column flex-lg-row justify-content-between align-items-center mt-3">
                <p class="organizer">{{ event.organizer.name }}</p>
                <a href="" class="registration-link mt-2 mt-md-0"
                   @click.prevent="resolveRegistration">
                    Register now
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    import dateFormatMixin from "../../mixins/dateFormatMixin";
    import {mapState} from "vuex";

    export default {
        name: "Event",
        props: {
            event: {
                type: Object,
                default: () => {
                },
            },
            index: Number,
        },
        mixins: [dateFormatMixin],
        computed: {
            ...mapState({
                currentEvent: ({event}) => event.event,
                isLogged: ({auth}) => auth.status.isLogged,
            }),
            dateClass() {
                return `event-date-${this.index % 2 === 0 ? 1 : 2}`;
            },
            date() {
                return this.parseDate(this.event.date);
            },

        },
        methods: {
            resolveEventDetail() {
                if (this.currentEvent.slug !== this.event.slug)
                    this.$store.commit('event/clearEventDetail');
                this.$router.push({
                    name: 'EventDetail',
                    params: {
                        oSlug: this.event.organizer.slug,
                        eSlug: this.event.slug,
                    }
                });
            },
            resolveRegistration() {
                if (this.currentEvent.slug !== this.event.slug)
                    this.$store.commit('event/clearEventDetail');
                return this.$router.push(this.isLogged ? {
                    name: 'Registration',
                    params: {
                        oSlug: this.event.organizer.slug,
                        eSlug: this.event.slug,
                    }
                } : {
                    name: 'Login',
                })
            }
        }
    }
</script>

<style scoped>
    .event-text {
        padding: 20px;
        background: #fff none repeat scroll 0 0;
        box-shadow: 0 4px 10px rgba(14, 16, 48, .05);
    }

    .event-image {
        position: relative;
    }

    .event-image p {
        position: absolute;
        top: 15px;
        width: auto;
        left: 15px;
        display: inline-block;
        padding: 5px 18px;
        color: #fff;
        font-weight: 700;
        text-transform: uppercase;
        font-size: 13px;
        letter-spacing: 2px;
        border-radius: 20px;
    }

    .event-date-1 {
        background: #e1137b none repeat scroll 0 0;
    }

    .event-date-2 {
        background: #ff8a01 none repeat scroll 0 0;
    }

    .event-text h3 {
        font-family: 'Roboto', sans-serif;
        color: #111;
        text-transform: capitalize;
        font-weight: 500;
        display: inline-block;
        font-size: 24px;
        margin-bottom: 10px;
        letter-spacing: 1px;
        -webkit-transition: all 0.4s ease 0s;
        transition: all 0.4s ease 0s;
    }

    .event-text h3:hover {
        color: #e1137b
    }

    .event-box {
        margin-top: 30px;
        /*box-shadow: 0 0 5px 0 rgba(1, 1, 1, 0.2);*/
        border-radius: 5px;
        overflow: hidden;
        transition: box-shadow 0.4s;
    }

    .event-box:hover {
        box-shadow: 0 4px 10px rgba(14, 16, 48, .05);
    }

    .event-desc {
        font-weight: lighter;
    }

    .registration-link {
        color: var(--main);
        padding: 5px 10px;
        transition: all 0.4s;
        border-radius: 2px;
        border: 1px solid var(--main);
    }

    .registration-link:hover {
        background-color: var(--main);
        box-shadow: none;
        color: white;
    }
</style>
