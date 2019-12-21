<template>
    <section class="evlis-sponsor-area section_70" data-scroll-index="5">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="site-heading">
                        <h4>Event Sponsors</h4>
                        <h2>Partners &amp; Sponsors</h2>
                    </div>
                </div>
            </div>
            <b-row>
                <b-col cols="12">
                    <carousel :autoplay="true" :mouseDrag="true" :loop="true" :per-page="5"
                              :per-page-custom="[[320,1], [768,2], [991,3]]">
                        <slide v-for="partner in partners" :key="partner.id">
                            <div class="partner-item">
                                <img class="partner-logo" v-lazy="partner.logo" alt="partner-logo">
                                <div class="partner-info">
                                    <h4 class="text-uppercase">{{ partner.name }}</h4>
                                    <p class="partner-desc">{{ partner.description }}</p>
                                </div>
                            </div>
                        </slide>
                    </carousel>
                </b-col>
            </b-row>
        </div>
    </section>
</template>

<script>
    export default {
        name: "Partners",
        props: {
            partners: {
                type: Array,
                default: () => []
            }
        }
    }
</script>

<style scoped>
    .partner-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .partner-logo {
        max-width: 300px;
        width: 100%;
        margin-bottom: 1.75rem;
    }

    .partner-info {
        text-align: center;
        max-width: 400px;
    }

    .partner-desc {
        font-weight: 300;
    }


</style>
