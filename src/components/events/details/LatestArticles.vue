<template>
    <section class="evlis-blog-area section_70">
        <b-container>
            <b-row>
                <b-col cols="12">
                    <div class="site-heading">
                        <h4>latest news</h4>
                        <h2>Event News</h2>
                    </div>
                </b-col>
            </b-row>
            <b-row>
                <b-col cols="12" lg="4" v-for="(article,index) in latest_articles" :key="`latest-article-${index}`">
                    <div class="single-blog">
                        <div class="blog-image">
                            <a href="#">
                                <img :src="article.thumbnail" alt="blog 1">
                            </a>
                            <p :class="dateClass(index)">{{ toDate2Digit(article.updated_at) }}<span>{{ toMonthShort(article.updated_at)}}</span>
                            </p>
                        </div>
                        <div class="blog-text">
                            <a href="#">
                                <h3>{{ article.title }}</h3>
                            </a>
                        </div>
                    </div>
                </b-col>
            </b-row>
            <b-row class="mt-4">
                <b-col cols="12" class="text-center">
                    <router-link :to="{name:'Articles'}" class="btn-registration">View More</router-link>
                </b-col>
            </b-row>
        </b-container>
    </section>
</template>

<script>
    import dateFormatMixin from "../../../mixins/dateFormatMixin";

    export default {
        name: "LatestArticles",
        props: {
            latest_articles: {
                type: Array,
                default: () => [],
            }
        },
        mixins: [dateFormatMixin],
        methods: {
            dateClass(index) {
                return `date-bg-${index % 2 === 0 ? 1 : 2}`
            },
            toDate2Digit(string) {
                const date = new Date(Date.parse(string));
                return new Intl.DateTimeFormat('en-US', {day: '2-digit'}).format(date);
            },
            toMonthShort(string) {
                const date = new Date(Date.parse(string));
                return new Intl.DateTimeFormat('en-US', {month: 'short'}).format(date);
            }
        }
    }
</script>

<style scoped>

</style>
