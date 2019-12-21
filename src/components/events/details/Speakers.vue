<template>
    <section class="evlis-speakers-area section_70" data-scroll-index="4">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="site-heading">
                        <h4>meet our</h4>
                        <h2>honorable speakers</h2>
                    </div>
                </div>
            </div>
            <div class="row justify-content-center" v-for="group in speakerGroups">
                <div class="col-lg-3 col-sm-6" v-for="speaker in group">
                    <div class="single-speakers">
                        <div class="speakers-image"
                             v-lazy-container="{ selector: 'img', loading: speakerLoading }">
                            <img :data-src="speaker.photo" :alt="`speakers-${speaker.id}`">
                        </div>
                        <div class="speakers-info">
                            <a href="#">
                                <h3>{{ speaker.firstname }} {{ speaker.lastname }}</h3>
                            </a>
                            <p>{{ speaker.position }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>

    import common from "../../../utils/common";

    export default {
        name: "Speakers",
        props: {
            speakers: {
                type: Array,
                default: () => []
            }
        },
        data() {
            return {
                speakerLoading: common.speakerLoading,
            }
        },
        computed: {
            speakerGroups() {
                return this.chunk(this.speakers, 4);
            }
        },
        methods: {
            chunk(array, size) {
                const chunked_arr = [];
                let index = 0;
                while (index < array.length) {
                    chunked_arr.push(array.slice(index, size + index));
                    index += size;
                }
                return chunked_arr;
            }
        }
    }
</script>

<style scoped>

</style>
