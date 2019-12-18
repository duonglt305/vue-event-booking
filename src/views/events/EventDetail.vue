<template>
    <div class="event-detail" v-if="event">
        <div class="event-header">
            <div class="container">
                <b-row>
                    <b-col cols="12">
                        <div class="banner-welcome">
                            <h3 v-if="event.date">{{ parseDate(event.date) }}</h3>
                            <h2>{{ event.name }}</h2>
                            <p>{{ event.address }}</p>
                            <router-link :to="registrationLink" class="btn-registration white">
                                Register Now!
                            </router-link>
                        </div>
                    </b-col>
                </b-row>
            </div>
        </div>
        <EventAbout v-if="event.description" :registration-link="registrationLink"/>
        <CountDown/>
        <Schedule/>
        <Speakers :speakers="event.speakers"/>
        <Tickets :tickets="event.tickets"/>
        <Partners :partners="event.partners"/>
        <LatestArticles :latest_articles="event.latest_articles"/>
        <Contact :id="event.id"/>
    </div>
</template>

<style scoped lang="scss">
    .event-detail {
        display: flex;
        flex-direction: column;
        width: 100vw;
        margin-left: 0;

        .event-header {
            display: flex;
            align-items: center;
            background: url(../../assets/img/welcome.jpg) no-repeat center;
            background-size: cover;
            height: calc(100vh - 71px);
            width: 100vw;

            .btn-registration {
                margin: 2rem 0;
                padding: 10px 20px;
            }
        }

    }
</style>
<script>
    import {mapState} from 'vuex';
    import dateFormatMixin from "../../mixins/dateFormatMixin";
    import EventAbout from "../../components/events/details/About";
    import CountDown from "../../components/events/details/CountDown";
    import Partners from "../../components/events/details/Partners";
    import Tickets from "../../components/events/details/Tickets";
    import Speakers from "../../components/events/details/Speakers";
    import LatestArticles from "../../components/events/details/LatestArticles";
    import Contact from "../../components/events/details/Contact";
    import Schedule from "../../components/events/details/Schedule";

    export default {
        name: "EventDetail",
        components: {
            CountDown,
            EventAbout,
            Schedule,
            Partners,
            Tickets,
            Speakers,
            LatestArticles,
            Contact,
        },
        created() {
            if (!this.event.name)
                this.$store.dispatch('event/detail', this.$route.params);
            window.scrollTo(0, 0);
        },
        mixins: [dateFormatMixin],
        computed: {
            ...mapState({
                event: state => state.event.event,
                isLogged: ({auth}) => auth.status.isLogged,
            }),
            registrationLink() {
                return this.isLogged ? {
                    name: 'Registration',
                    params: {
                        oSlug: this.$route.params.oSlug,
                        eSlug: this.$route.params.eSlug,
                    }
                } : {name: 'Login'}
            },
            organizer() {
                return this.event && this.event.organizer ? this.event.organizer : null
            },
            tickets() {
                return this.event && this.event.tickets ? this.event.tickets : []
            },
        },
    }
</script>

