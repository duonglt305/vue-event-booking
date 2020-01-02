<template>
    <main class="container">
        <b-card class="event-schedule">
            <div class="d-flex justify-content-between pl-3 pr-3 pt-3 pb-3 mb-4">
                <div class="">
                    <div class="d-md-flex justify-content-between align-items-start">
                        <div class="info">
                            <h2 class="event-name">{{ event ? event.name : '' }}</h2>
                        </div>
                    </div>
                    <p class="event-desc"><i class="fa fa-map-marker"/> {{ event.address }}</p>
                    <p class="event-desc"><i class="fa fa-calendar"/> {{ event.date ? eventDate : '' }} {{ eventTime }}</p>
                </div>
                <div>
                    <router-link :to="'/'" class="btn-registration">
                        Register Now!
                    </router-link>
                </div>
            </div>
            <div class="event-schedule-header mb-4">
                <h3 class="text-center">Event Schedule</h3>
            </div>
            <div class="schedule">
                <div class="schedule-body">
                    <div class="schedule-header">
                        <div class="schedule-time">08:00</div>
                        <div class="schedule-time">10:00</div>
                        <div class="schedule-time">12:00</div>
                        <div class="schedule-time">14:00</div>
                    </div>
                    <div class="schedule-container">
                        <div class="body">
                            <div class="channel" v-for="channel in channelFiltered">
                                <div class="channel-detail">
                                    {{ channel.name }}
                                </div>
                                <div class="rooms">
                                    <div class="room" v-for="room in channel.rooms">
                                        <div class="room-detail">
                                            {{ room.name }}
                                        </div>
                                        <div class="sessions">
                                            <template v-if="room.sessions.length">
                                                <div class="session-item"
                                                     @click="sessionDetail(session)"
                                                     :style="resolveStyleSession(session)"
                                                     v-for="session in room.sessions">
                                                    {{ session.title }}
                                                </div>
                                            </template>
                                            <template v-else>
                                                <p class="text-center">No session</p>
                                            </template>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </b-card>
        <b-modal id="session_detail" hide-header>
            <template v-if="selectedSession">
                <h4 class="session-title">{{ selectedSession.title }}</h4>
                <p class="session-desc">{{ selectedSession.description }}</p>
                <b-row class="justify-content-between">
                    <b-col cols="4">
                        <p class="ss-detail-item">Speaker: </p>
                        <p class="ss-detail-item">Start: </p>
                        <p class="ss-detail-item">End: </p>
                        <p class="ss-detail-item">Cost: </p>
                    </b-col>
                    <b-col cols="6">
                        <p>{{ speakerFullName }}</p>
                        <p>{{ startTime }}</p>
                        <p>{{ endTime }}</p>
                        <p>{{ sessionCost }}</p>
                    </b-col>
                </b-row>
            </template>
            <template v-slot:modal-footer>
                <b-button size="sm" variant="danger" @click="$bvModal.hide('session_detail')">Close</b-button>
            </template>
        </b-modal>
    </main>
</template>

<style scoped lang="scss">
    .schedule {
        overflow-x: auto;
        overflow-y: hidden;
        border: 1px solid red;

        .schedule-body {
            min-width: 991px;

            .schedule-container {
                overflow-y: auto;
                overflow-x: hidden;
            }

            .body {
                max-height: calc(100vh - 575px);
            }
        }

        .schedule-header {
            display: flex;
            padding: 5px 0;
            border-bottom: 1px solid red;
            justify-content: flex-end;

            .schedule-time {
                width: 20%;
                position: relative;

                &:before {
                    position: absolute;
                    bottom: -5px;
                    left: -1px;
                    content: '';
                    width: 1px;
                    height: 5px;
                    background-color: red;
                }
            }
        }

        .channel {
            width: 100%;
            display: flex;
            align-items: center;
            border-bottom: 1px solid red;

            &:last-child {
                border-bottom: none;
            }

            .channel-detail {
                width: 10%;
                text-align: center;
            }

            .rooms {
                width: 90%;
                border-left: 1px solid red;

                .room {
                    display: flex;
                    align-items: center;

                    &:last-child {
                        border-bottom: none;
                    }

                    .room-detail {
                        padding: 10px 0;
                        border-right: 1px solid red;
                        text-align: center;
                        width: 11.11%;
                    }

                    .sessions {
                        position: relative;
                        height: 100%;
                        width: calc(100% - 11.11%);
                        /*border-left: 1px solid red;*/

                        .session-item {
                            position: absolute;
                            transform: translateY(-50%);
                            text-align: center;
                            padding: 5px;
                            border: 1px solid greenyellow;
                            font-size: 0.8rem;
                            user-select: none;
                            cursor: pointer;
                            text-overflow: ellipsis;
                            border-radius: 5px;
                            overflow: hidden;
                            white-space: nowrap;
                        }
                    }
                }
            }
        }

    }

    #session_detail {
        .modal-body {
            padding: 20px;

            .session-title {
                margin-bottom: 15px;
            }

            .session-desc {
                margin-bottom: 10px;
                font-weight: 300;
            }

            .ss-detail-item {
                font-weight: 500;
            }
        }
    }
</style>

<script>
    import {mapState} from "vuex";
    import dateFormatMixin from "../../mixins/dateFormatMixin";
    import currencyFormatMixin from "../../mixins/currencyFormatMixin";

    export default {
        name: "Schedules",
        created() {
            if (!this.event.name)
                this.$store.dispatch('event/detail', this.$route.params);
        },
        mixins: [dateFormatMixin, currencyFormatMixin],
        data() {
            return {
                selectedSession: null,
            };
        },
        computed: {
            ...mapState({
                event: ({event}) => event.event,
                channels: ({event}) => event.event.channels,
            }),
            speakerFullName() {
                return this.selectedSession.speaker.firstname + ' ' + this.selectedSession.speaker.lastname;
            },
            startTime() {
                return this.parseTime(this.selectedSession.start);
            },
            endTime() {
                return this.parseTime(this.selectedSession.end);
            },
            sessionCost() {
                return this.currencyFormat(this.selectedSession.cost);
            },
            eventDate() {
                return this.parseDate(this.event.date);
            },

            eventTime() {
                return this.event.date ? this.parseTime(this.event.date) : '';
            },
            channelFiltered() {
                return this.channels ? this.channels.filter(channel => {
                    return channel.rooms.length;
                }) : [];
            }
        },
        methods: {
            sessionDetail(session) {
                this.$bvModal.show('session_detail');
                this.selectedSession = session;
            },
            resolveStyleSession(session) {
                let start = new Date(Date.parse(session.start)), end = new Date(Date.parse(session.end));
                let length = 8 * 60;
                let mStart = start.getHours() * 60 + start.getMinutes();
                let mEnd = end.getHours() * 60 + end.getMinutes();
                return {
                    'margin-left': `${(mStart - (8 * 60)) / length * 100}%`,
                    width: `${(mEnd - mStart) / length * 100}%`,
                }
            }
        },
    }
</script>

