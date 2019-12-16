<template>
    <section class="evlis-pricing-area section_70" data-scroll-index="6">
        <div class="container">
            <div class="ticket-list">
                <div class="single-price-box" v-for="ticket in tickets"
                     :class="{ unavailable: !ticket.available, active: ticket.feature }">
                    <div class="price-head">
                        <h4>{{ ticket.name }}</h4>
                        <h2>{{ currencyFormat(ticket.cost)}}<span> / person</span></h2>
                    </div>
                    <div class="price-body" v-html="ticket.short_description"/>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import currencyFormatMixin from "../../../mixins/currencyFormatMixin";

    export default {
        name: "Tickets",
        props: {
            tickets: {
                type: Array,
                default: () => []
            }
        },
        mixins: [currencyFormatMixin],
        computed: {
            ticketAvailable() {
                return this.tickets.filter(ticket => ticket.available);
            }
        },
        methods: {
            resolveTicketClass(ticket) {
                return `${ticket.available ? 'text-success' : 'text-danger'} text-uppercase`;
            }
        }
    }
</script>

<style scoped>
    .ticket-list {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    @media screen and (max-width: 991px) {
        .ticket-list {
            justify-content: center;
        }
    }

    .single-price-box.unavailable {
        opacity: 0.5;
    }
</style>
