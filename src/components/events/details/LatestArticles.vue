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
                        <div class="blog-image" v-lazy-container="{ selector:'img', loading: articleLoading}">
                            <a @click="resolveArticleDetail(article)">
                                <img :data-src="article.thumbnail" alt="article">
                            </a>
                            <p :class="dateClass(index)">{{ toDate2Digit(article.updated_at) }}<span>{{ toMonthShort(article.updated_at)}}</span>
                            </p>
                        </div>
                        <div class="blog-text">
                            <a @click="resolveArticleDetail(article)">
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
    import common from "../../../utils/common";

    export default {
        name: "LatestArticles",
        props: {
            latest_articles: {
                type: Array,
                default: () => [],
            }
        },
        data() {
            return {
                articleLoading: common.articleLoading,
            }
        },
        mixins: [dateFormatMixin],
        methods: {
            resolveArticleDetail(article) {
                this.$store.commit('event/selectArticle', article);
                this.$router.push({
                    name: 'ArticleDetail',
                    params: {...this.$route.params, aSlug: article.slug},
                    props: {article}
                })
            },
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
