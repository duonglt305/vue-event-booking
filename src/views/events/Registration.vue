<template>
    <main class="container">
        <b-card class="registration">
            <div>
                <div class="d-md-flex justify-content-between align-items-start">
                    <div class="info">
                        <h2 class="event-name">{{ event ? event.name : '' }}</h2>
                    </div>
                </div>
                <p class="event-desc"><i class="fa fa-map-marker"/> {{ event.address }}</p>
                <p class="event-desc"><i class="fa fa-calendar"/> {{ event.date ? eventDate : '' }} {{ event.date ?
                    eventTime : '' }}</p>
            </div>
            <h5 class="mt-3">Select your ticket</h5>
            <b-row class="mt-3 justify-content-center">
                <div class="single-price-box"
                     :class="{active: ticketId === ticket.id}"
                     v-for="ticket in tickets" @click="selectTicket(ticket.id)">
                    <div class="price-head">
                        <h4>{{ ticket.name }}</h4>
                        <h2>
                            {{ ticket.cost === 0 ? 'Free' : `${currencyFormat(ticket.cost)}` }}<span> / person</span>
                        </h2>
                    </div>
                    <div class="price-body" v-if="ticket.description">
                        {{ ticket.description }}
                    </div>
                </div>
            </b-row>
            <template v-if="sessionsPremium.length > 0">
                <h5 class="mt-3">Select addition workshop you want to book:</h5>
                <ul class="additional-sessions">
                    <li class="session-item" v-for="session in sessionsPremium" :key="session.id">
                        <b-checkbox :value="session.id" v-model="selectedSessionPremiumIds">
                            {{ session.title }} - <i>{{ session.type }}</i>
                        </b-checkbox>
                        <div class="">{{ session.channel }} / {{ session.room }} - {{ parseTime(session.start) }} <i
                                class="fa fa-arrow-circle-o-right"/> {{ parseTime(session.end) }}
                        </div>
                        <b>{{ currencyFormat(session.cost) }}</b>
                    </li>
                </ul>
            </template>
            <div class="mt-5 d-flex justify-content-end">
                <div class="purchase-info">
                    <b-col sm="12" class="mt-2 mb-2">
                        <b-row>
                            <b-col sm="6">Event Ticket</b-col>
                            <b-col sm="6">{{ currencyFormat(ticketCost) }}</b-col>
                        </b-row>
                    </b-col>
                    <b-col sm="12" class="mt-2 mb-2 ">
                        <b-row>
                            <b-col sm="6">Addition session</b-col>
                            <b-col sm="6">{{ currencyFormat(additionSessionsCost) }}</b-col>
                        </b-row>
                    </b-col>
                    <hr>
                    <b-col sm="12" class="mt-2 mb-2">
                        <b-row>
                            <b-col sm="6"><b>Total</b></b-col>
                            <b-col sm="6"><b>{{ currencyFormat(total) }}</b></b-col>
                        </b-row>
                    </b-col>
                </div>
            </div>
            <template v-slot:footer>
                <div class="form-group text-right">
                    <b-button variant="success" class="mr-2" @click="purchase" :disabled="!ticketId">Purchase</b-button>
                    <b-button variant="danger" @click="$router.go(-1)">Cancel</b-button>
                </div>
            </template>
        </b-card>
    </main>
</template>

<style scoped lang="scss">
    .registration {
        padding: 30px 20px;

        .event-name {
            margin-bottom: 1.1rem;
        }

        .additional-sessions {
            padding: 1rem 1.5rem;

            .session-item {
                margin: 1rem 0;
                background-color: #fff;
                box-shadow: 0 4px 10px rgba(14, 16, 48, .1);
                padding: 0.8rem 1rem;
                border-radius: 5px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                @media screen and(max-width: 991px) {
                    flex-direction: column;
                }

                &:hover {
                    box-shadow: 0 4px 10px rgba(14, 16, 48, .2);
                }

            }
        }

        .single-price-box {
            border-radius: 0.25rem;
            overflow: hidden;
            margin: 0 1rem 10px;
            box-shadow: 0 4px 10px rgba(14, 16, 48, .1);
            transition: 0.3s box-shadow ease;
            color: #fff;
            cursor: pointer;
            max-width: 200px;

            .price-head {
                position: relative;
                border-bottom: none;

                h2 {
                    font-size: 1.5rem;

                    span {
                        font-size: 0.9rem;
                    }
                }
            }

            .price-body {
                padding: 1rem 1.35rem;
                font-weight: 300;
                font-size: 0.85rem;
            }

            &:hover {
                box-shadow: 0 4px 10px rgba(14, 16, 48, .3);
            }

            @media (max-width: 991px) and (min-width: 768px) {
                margin: 1rem;
            }
            @media (max-width: 768px) {
                margin: 1rem;
                width: 100%;
            }
        }

        .purchase-info {
            width: 50%;
            @media screen and (max-width: 991px) {
                width: 70%;
            }
            @media screen and (max-width: 768px) {
                width: 100%;
            }
        }


    }


</style>


<script>
    import dateFormatMixin from "../../mixins/dateFormatMixin";
    import {mapState} from 'vuex'
    import Checkbox from 'vue-material-checkbox'
    import currencyFormatMixin from "../../mixins/currencyFormatMixin";
    import sessionMixin from "../../mixins/sessionMixin";


    export default {
        name: "Registration",
        created() {
            if (!this.event.name)
                this.$store.dispatch('event/detail', this.$route.params);
        },
        mounted() {
            if (this.registered && this.registration && this.registration.status !== 'PAID')
                this.$toastr.e('You have already registered this event but not yet payment, you can payment in your profile.');
            else if (this.registration && this.registration.status === 'PAID')
                this.$toastr.w('You have already registered this event.');
        },
        data() {
            return {
                ticketId: 0,
                selectedSessionPremiumIds: [],
            }
        },
        watch: {
            selectedSessionPremiumIds(newVal) {

            }
        },
        mixins: [dateFormatMixin, currencyFormatMixin, sessionMixin],
        computed: {
            ...mapState({
                event: state => state.event.event
            }),
            registration() {
                return this.event ? this.event.registration : null;
            },
            registered() {
                return this.event && this.event.registration !== null;
            },
            ticketCost() {
                let ticket = this.tickets.find(ticket => ticket.id === this.ticketId);
                return ticket ? ticket.cost : this.ticketId;
            },
            eventTime() {
                return this.parseTime(this.event.date);
            },
            eventDate() {
                return this.parseDate(this.event.date);
            },
            tickets() {
                return this.event && this.event.tickets ?
                    this.event.tickets.sort((curr, next) => curr.cost - next.cost).filter(t => t.available) : []
            },
            channels() {
                let channels = (this.event && this.event.channels) ? this.event.channels : [];
                if (channels.length === 0) return channels;

                channels = channels.filter(c => {
                    let rooms = c && c.rooms ? c.rooms : null;
                    if (!rooms) return false;
                    for (let i = 0; i < rooms.length; i++) {
                        let sessions = rooms[i].sessions;
                        if (sessions.length > 0) {
                            return true;
                        }
                    }
                });
                return channels;
            },
            total() {
                return this.ticketCost + this.additionSessionsCost;
            },
            additionSessionsCost() {
                return this.sessionsPremium.reduce((total, session) => {
                    for (let sessionId of this.selectedSessionPremiumIds) {
                        if (sessionId === session.id)
                            total += session.cost;
                    }
                    return total;
                }, 0);
            },
            sessionsPremium() {
                if (this.channels !== undefined && this.channels !== null) {
                    let sessions = this.channels.map(c => this.getSessionByChannel(c));
                    sessions = sessions.length > 0 ? sessions.reduce((current, next) => [...current, ...next])
                        .filter(s => (s.cost !== null && parseInt(s.cost) !== 0)) : [];
                    return sessions;
                }
                return [];
            }
        },
        methods: {
            selectTicket(ticket_id) {
                this.ticketId = ticket_id;
            },
            purchase() {
                let data = {
                    ...this.$route.params,
                    data: {
                        ticket_id: this.ticketId,
                        session_ids: this.selectedSessionPremiumIds,
                    }
                };
                this.$store.dispatch('event/purchase', data);
            },
        },
        components: {
            Checkbox
        }
    }
</script>
