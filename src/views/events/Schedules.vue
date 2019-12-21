<template>
    <main class="container">
        <b-card class="event-schedule">
            <div class="pl-3 pr-3 pt-3 pb-3 mb-4">
                <div class="d-md-flex justify-content-between align-items-start">
                    <div class="info">
                        <h2 class="event-name">{{ event ? event.name : '' }}</h2>
                    </div>
                </div>
                <p class="event-desc"><i class="fa fa-map-marker"/> {{ event.address }}</p>
                <p class="event-desc"><i class="fa fa-calendar"/> {{ event.date ? eventDate : '' }} {{ eventTime }}</p>
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
                                            <div class="session-item" tooltip="I'm up above it!"
                                                 :style="resolveStyleSession(session)"
                                                 v-for="session in room.sessions">
                                                {{ session.title }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </b-card>
    </main>
</template>

<style scoped lang="scss">
    .schedule {
        overflow-x: auto;
        border: 1px solid red;

        .schedule-body {
            min-width: 991px;

            .schedule-container {
                overflow-y: auto;
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
                    left: 2px;
                    content: '';
                    width: 2px;
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
                    /*border-bottom: 1px solid #0f9af0;*/

                    &:last-child {
                        border-bottom: none;
                    }

                    .room-detail {
                        padding: 10px 0;
                        border-right: 1px solid #0f9af0;
                        text-align: center;
                        width: 11.11%;
                    }

                    .sessions {
                        position: relative;
                        height: 100%;
                        padding: 0 5px;
                        width: calc(100% - 11.11%);
                        border-left: 1px solid red;

                        .session-item {
                            position: absolute;
                            transform: translateY(-50%);
                            text-align: center;
                            padding: 5px 0;
                            border: 1px solid greenyellow;
                            font-size: 0.8rem;
                            user-select: none;
                            cursor: pointer;
                            border-radius: 5px;
                        }
                    }
                }
            }
        }

    }

    [tooltip]::before,
    [tooltip]::after {
        text-transform: none; /* opinion 2 */
        font-size: .9em; /* opinion 3 */
        line-height: 1;
        user-select: none;
        pointer-events: none;
        position: absolute;
        display: none;
        opacity: 0;
    }

    [tooltip]::before {
        content: '';
        border: 5px solid transparent; /* opinion 4 */
        z-index: 1001; /* absurdity 1 */
    }

    [tooltip]::after {
        content: attr(tooltip); /* magic! */

        /* most of the rest of this is opinion */
        font-family: Helvetica, sans-serif;
        text-align: center;

        /*
          Let the content set the size of the tooltips
          but this will also keep them from being obnoxious
          */
        min-width: 3em;
        max-width: 21em;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 1ch 1.5ch;
        border-radius: .3ch;
        box-shadow: 0 1em 2em -.5em rgba(0, 0, 0, 0.35);
        background: #333;
        color: #fff;
        z-index: 1000; /* absurdity 2 */
    }

    /* Make the tooltips respond to hover */
    [tooltip]:hover::before,
    [tooltip]:hover::after {
        display: block;
    }

    /* don't show empty tooltips */
    [tooltip='']::before,
    [tooltip='']::after {
        display: none !important;
    }

    /* FLOW: UP */
    [tooltip]:not([flow])::before,
    [tooltip][flow^="up"]::before {
        bottom: 100%;
        border-bottom-width: 0;
        border-top-color: #333;
    }

    [tooltip]:not([flow])::after,
    [tooltip][flow^="up"]::after {
        bottom: calc(100% + 5px);
    }

    [tooltip]:not([flow])::before,
    [tooltip]:not([flow])::after,
    [tooltip][flow^="up"]::before,
    [tooltip][flow^="up"]::after {
        left: 50%;
        transform: translate(-50%, -.5em);
    }

</style>

<script>
    import {mapState} from "vuex";
    import dateFormatMixin from "../../mixins/dateFormatMixin";

    export default {
        name: "Schedules",
        created() {
            if (!this.event.name)
                this.$store.dispatch('event/detail', this.$route.params);
        },
        mixins: [dateFormatMixin],
        computed: {
            ...mapState({
                event: ({event}) => event.event,
                channels: ({event}) => event.event.channels,
            }),

            eventDate() {
                return this.parseDate(this.event.date);
            },

            eventTime() {
                return this.parseTime(this.event.date);
            },
            channelFiltered() {
                return this.channels ? this.channels.filter(channel => {
                    return channel.rooms.length;
                }) : [];
            }
        },
        methods: {
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
        data() {
            return {};
        }
    }
</script>

