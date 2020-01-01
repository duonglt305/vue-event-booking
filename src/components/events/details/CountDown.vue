<template>
    <section class="evlis-countdown-area">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="countdown-box">
                        <div class="countdown-inner-text">
                            <flip-countdown :deadline="date"/>
                            <form>
                                <p>
                                    <input type="email" placeholder="E-mail Address" disabled/>
                                </p>
                                <p>
                                    <button type="submit" disabled>Notify me</button>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import {mapState} from "vuex";
    import FlipCountdown from 'vue2-flip-countdown'
    import moment from "moment";

    export default {
        name: "CountDown",
        components: {
            FlipCountdown,
        },
        computed: {
            date() {
                let date = new Date();
                return this.event.date ? this.event.date : moment(date).format('YYYY-MM-DD hh:mm:ss');
            },
            ...mapState({
                event: state => state.event.event,
            }),
        }

    }
</script>

<style scoped>
    .countdown-inner-text > .flip-clock {
        margin-bottom: 1.5rem;
    }
</style>
