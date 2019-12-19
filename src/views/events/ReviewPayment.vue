<template>
    <main class="container view-payment">
        <b-card class="p-md-4">
            <div class="payment-header">
                <div class="payment-info">
                    <h4>{{ event ? event.name : '' }}</h4>
                    <p><i class="fa fa-map-marker"/> {{ event ? event.address : '' }}</p>
                    <p><i class="fa fa-calendar"/> {{ event ? eventDate : '' }} {{ event ? eventTime : '' }}</p>
                </div>
                <span class="kt-badge kt-badge--inline kt-badge--pill"
                      :class="paymentStatus">{{  registration ? registration.status : '' }}</span>
            </div>
            <h5 class="mt-5 mb-2">Payment detail:</h5>
            <div class="table-responsive">
                <table class="table table-striped">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th class="text-center">Quantity</th>
                        <th class="text-right">Cost</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Ticket: {{ ticket ? ticket.name : '' }}</td>
                        <td class="text-center">1</td>
                        <td class="text-right">{{ ticket ? currencyFormat(ticket.cost) : 0 }}</td>
                    </tr>
                    <tr v-for="session in sessions" :key="`session-executePayment-${session.id}`">
                        <td>Session: {{ session.title }}</td>
                        <td class="text-center">1</td>
                        <td class="text-right">{{ currencyFormat(session.cost)}}</td>
                    </tr>
                    <tr>
                        <td><b>Total:</b></td>
                        <td class="text-right"><b>{{ currencyFormat(total) }}</b></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <template v-slot:footer>
                <div class="text-center text-md-right">
                    <b-button variant="primary" class="mr-2" @click="confirmPayment" v-if="!paid">Confirm Payment
                    </b-button>
                    <b-button variant="danger" @click="cancel">Cancel</b-button>
                </div>
            </template>
        </b-card>
    </main>
</template>


<style scoped lang="scss">
    .view-payment {

        .payment-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
        }

        .payment-status {
            padding: 5px 10px;
            background-color: var(--primary);
            color: #fff;
            line-height: 0.85rem;
            font-size: 0.85rem;
            border-radius: 5px;
            box-shadow: 0 4px 8px rgba(14, 16, 48, .05);

            &.success {
                background-color: var(--success);
            }
        }
    }


</style>
<script>
    import dateFormatMixin from "../../mixins/dateFormatMixin";
    import currencyFormatMixin from "../../mixins/currencyFormatMixin";
    import {mapState} from "vuex";

    export default {
        name: "ReviewPayment",
        created() {
            if (!this.registration.id)
                this.$store.dispatch('event/paymentDetail', this.$route.params);
        },
        data() {
            return {}
        },
        mixins: [dateFormatMixin, currencyFormatMixin],
        computed: {
            ...mapState({
                registration: state => state.event.registration,
            }),

            paid() {
                return this.registration.status ? this.registration.status.trim().toLowerCase() === 'paid' : false;
            },
            paymentStatus() {
                return this.paid ? 'kt-badge--success' : 'kt-badge--primary';
            },
            event() {
                return this.registration.event;
            },
            ticket() {
                return this.registration.ticket;
            },
            sessions() {
                return this.registration.sessions;
            },
            eventDate() {
                return this.event.date ? this.parseDate(this.event.date) : '';
            },
            eventTime() {
                return this.parseTime(this.event.date);
            },

            total() {
                return this.sessions ? this.sessions.reduce((total, current) => {
                    total += current.cost;
                    return total;
                }, 0) + this.ticket.cost : 0;
            },
        },
        methods: {

            cancel() {
                this.$router.push({name: 'MyRegistration'});
            },
            confirmPayment() {
                let {paymentId, PayerID} = this.$route.query;
                let registration_id = this.registration.id;
                if (paymentId && PayerID) {
                    this.$store.dispatch('event/confirmPayment', {
                        payment_id: paymentId,
                        payer_id: PayerID, registration_id
                    });
                }
            },
        }
    }
</script>
