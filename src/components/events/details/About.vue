<template>
    <div class="event-section-about">
        <div class="container">
            <b-row>
                <b-col cols="12">
                    <div class="about-box">
                        <h4>About the Event!</h4>
                        <read-more class="about-content" more-str="Read more..." :text="description" link="#"
                                   less-str="Read less" :max-chars="1000"/>
                        <!--                        <div v-html="description"/>-->
                        <router-link :to="registrationLink" href="#" class="btn-registration">
                            Register Now!
                        </router-link>
                    </div>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        name: "EventAbout",

        props: {
            registrationLink: {
                type: Object,
                required: true,
            },
        },
        computed: {
            ...mapState({
                event: state => state.event.event,
            }),
            description() {
                return this.event.description ? this.event.description : '';
            },
        }
    }
</script>

<style scoped lang="scss">
    .event-section-about {
        padding: 70px 0;

        .about-box {
            .btn-registration {
                margin-top: 30px;
            }

            h4 {
                font-weight: 600;
            }
            .about-content * {
                font-family: initial;
                text-align: initial;
                list-style-type: initial;
            }
        }


    }
</style>
