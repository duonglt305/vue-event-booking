<template>
    <b-card class="mt-4 mt-lg-0">
        <template v-slot:header>
            My Registrations
        </template>
        <div class="table-responsive">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th>Event</th>
                    <th>Ticket</th>
                    <th>Cost</th>
                    <th>Status</th>
                    <th>Payment</th>
                </tr>
                </thead>
                <tbody>
                <template v-if="items.length">
                    <tr v-for="item in items" :key="item.id">
                        <td>{{ item.event }}</td>
                        <td>{{ item.ticket }}</td>
                        <td>{{ item.total }}</td>
                        <td v-html="item.status"/>
                        <td>
                            <a class="text-primary" v-if="!item.paid" href=""
                               @click.prevent="executePayment(item.registration)">Pay</a>
                            <a class="text-success" v-else href=""
                               @click.prevent="detailPayment(item.registration)">Invoice</a>
                        </td>
                    </tr>
                </template>
                <template v-else>
                    <tr>
                        <td class="text-center" colspan="6">No registration</td>
                    </tr>
                </template>
                </tbody>
            </table>
        </div>
        <b-pagination-nav
                :number-of-pages="registrationTotalPage"
                base-url="?page="
                class="d-flex justify-content-center justify-content-md-end"
                use-router
                v-model="currentPage">
        </b-pagination-nav>
    </b-card>
</template>

<script>
    import {mapState} from "vuex";
    import currencyFormatMixin from "../../mixins/currencyFormatMixin";

    export default {
        name: "MyRegistration",
        created() {
            let page = this.$route.query.page ? this.$route.query.page : 1;
            if (!this.registrations.length)
                this.$store.dispatch('event/myRegistrations', page);
        },
        data() {
            return {
                current: 1,
            };
        },
        mixins: [currencyFormatMixin],
        computed: {
            ...mapState({
                registration: ({event}) => event.registration,
                registrations: state => state.event.registrations,
                registrationTotalPage: state => state.event.registrationTotalPage,
            }),
            items() {
                return this.registrations.map(re => {
                    let type = re.status === 'Paid' ? 'success' : 'primary';
                    let total = re.ticket.cost;
                    if (re.sessions.length) {
                        total += re.sessions.reduce((t, current) => {
                            t += current.cost;
                            return t;
                        }, 0);
                    }
                    return {
                        registration: re,
                        id: re.id,
                        paid: re.status.trim().toLowerCase() === 'paid',
                        event: re.event.name,
                        ticket: re.ticket.name,
                        status: `<span class="kt-badge kt-badge--${type} kt-badge--inline kt-badge--pill">${re.status}</span>`,
                        total: this.currencyFormat(total),
                    };
                });
            },
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
                this.$store.dispatch('event/myRegistrations', page);
            },
            executePayment(registration) {
                const {event, id} = registration;
                this.$store.dispatch('event/executePayment', {
                    oSlug: event.organizer.slug,
                    eSlug: event.slug,
                    data: {
                        registration_id: id,
                    }
                });
            },
            detailPayment({event, id}) {
                if (this.registration.id !== id)
                    this.$store.commit('event/clearRegistration');
                this.$router.push({
                    name: 'ReviewPayment',
                    params: {
                        oSlug: event.organizer.slug,
                        eSlug: event.slug,
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
