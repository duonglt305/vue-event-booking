<template>

    <section class="evlis-schedule-area section_70" data-scroll-index="3" v-if="channelSessions.length">
        <div class="schedule_bg">
            <img src="../../../assets/img/choos_bg.png" alt="schedule bg">
        </div>
        <b-container>
            <b-row>
                <b-col cols="12">
                    <div class="site-heading">
                        <h4>at a Glance</h4>
                        <h2>Event schedule</h2>
                        <p>Consectetur adipisicing elit sed do eiusmod, tempor incididunt labore dolore magna aliqua
                            enim minim veniam quista nostrud exion.</p>
                    </div>
                </b-col>
            </b-row>
            <b-row>
                <b-col cols="12">
                    <div class="offer-tabs">
                        <template v-if="channelSessions.length > 0">
                            <ul id="offerTab">
                                <li :class="{ active : channel.id === selectChannel }"
                                    :key="channel.id"
                                    class="nav-item"
                                    v-for="channel in channels">
                                    <a @click="changeSelectChannel(channel.id)" class="nav-link">Channel <span>{{ channel.name }}</span></a>
                                </li>
                            </ul>
                            <transition tag="div" class="session-list" name="slide-fade">
                                <div class="row">
                                    <div class="col-md-6" v-for="session in channelSessions"
                                         :key="`session-${session.id}`">
                                        <div class="single-schedule-item">
                                            <div class="overlay-ribbon">
                                                <div class="ribbon-content">{{ currencyFormat(session.cost) }}</div>
                                            </div>
                                            <div class="schedule-time">
                                                <h3>{{resolveStartEndTime(session.start,session.end)}}</h3>
                                            </div>
                                            <div class="schedule-details">
                                                <a href="#">
                                                    <h3>{{ session.title }} - {{ session.type }}</h3>
                                                </a>
                                                <p>{{ session.description }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </transition>
                        </template>
                        <template v-else>
                            <p class="pb-3 pt-3 text-center">Current is no session</p>
                        </template>
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </section>

</template>

<script>
    import dateFormatMixin from "../../../mixins/dateFormatMixin";
    import {mapState} from 'vuex';
    import moment from 'moment';
    import currencyFormatMixin from "../../../mixins/currencyFormatMixin";

    export default {
        name: "Schedule",
        data() {
            return {
                selectedChannel: null,
            }
        },
        mixins: [dateFormatMixin, currencyFormatMixin],
        computed: {
            ...mapState({
                event: state => state.event.event,
            }),
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
            selectChannel: {
                set(id) {
                    this.selectedChannel = id;
                },
                get() {
                    if (!this.selectedChannel)
                        this.selectedChannel = this.event.channels[0].id;
                    return this.selectedChannel;
                }
            },
            channelSessions() {
                if (this.channels !== undefined && this.channels !== null) {
                    let index = this.channels.findIndex(c => c.id === this.selectChannel);
                    let sessions = this.getSessionByChannel(this.channels[index]);
                    return !!sessions.length ? sessions : [];
                }
                return [];
            }
        },
        methods: {
            changeSelectChannel(id) {
                this.selectedChannel = id;
            },
            resolveStartEndTime(start, end) {
                return `${moment(start).format('H:mm')} - ${moment(end).format('H:mm')}`;
            },
            getSessionByChannel(channel) {
                if (channel && channel.rooms) {
                    return channel.rooms.reduce((result, room) => {
                        let sessions = room.sessions;
                        let newSessions = sessions.map(session => {
                            return {
                                ...session,
                                room: room.name
                            }
                        });
                        return [...result, ...newSessions];
                    }, [])
                }
                return [];
            }
        }

    }
</script>

<style scoped lang="scss">

    .session-list {
        max-height: 600px;
        overflow-y: auto;
        overflow-x: hidden;
    }

    .single-schedule-item {
        position: relative;
        padding: 20px;
    }

    .overlay-ribbon {
        position: absolute;
        width: 3em;
        height: 3em;
        z-index: 500;
        top: -5px;
        right: 2%;
        background: var(--main);
        padding: 5px 0;
        border-radius: 8px;

        &:after {
            content: "";
            position: absolute;
            bottom: -2em;
            right: 0;
            width: 0;
            height: 0;
            border-top: 3em solid var(--main);
            border-left: 3em solid transparent;
            z-index: 998;
        }

        &:before {
            content: "";
            position: absolute;
            bottom: -2em;
            left: 0;
            width: 0;
            height: 0;
            border-top: 3em solid var(--main);
            border-right: 3em solid transparent;
            z-index: 997;
        }

        .ribbon-content {
            z-index: 500;
            position: relative;
            margin: 0 5px;
            text-align: center;
            font-size: 1rem;
            font-weight: 500;
            color: white;
            padding-top: 5px;
        }
    }

    #offerTab {
        .nav-item {
            &.active .nav-link {
                color: #fff;
                background-color: var(--second);

                span {
                    color: #fff;
                    border-color: #fff;
                }
            }

            .nav-link {
                cursor: pointer;
                color: var(--second);
                border-color: var(--second);

                span {
                    border-color: var(--second);
                    color: var(--second);
                }
            }
        }
    }

</style>
