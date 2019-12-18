<template>
    <main class="container">
        <b-container>
            <b-row>
                <b-col cols="12" lg="4" v-for="(article,index) in articles" :key="`article-${index}`">
                    <div class="single-blog">
                        <div class="blog-image">
                            <a href="" @click.prevent="resolveArticleDetail(article)">
                                <img :src="article.thumbnail" alt="blog 1">
                            </a>
                            <p :class="dateClass(index)">
                                {{ article.updated_at ? toDate2Digit(article.updated_at) : '' }}
                                <span>{{ toMonthShort(article.updated_at)}}</span>
                            </p>
                        </div>
                        <div class="blog-text">
                            <a href="" @click.prevent="resolveArticleDetail(article)">
                                <h3>{{ article.title }}</h3>
                            </a>
                        </div>
                    </div>
                </b-col>
            </b-row>
            <b-row class="mt-4">
                <b-col cols="12" class="text-center">
                    <b-pagination-nav
                            :number-of-pages="totalPage"
                            base-url="?page="
                            class="d-flex justify-content-center justify-content-md-end"
                            use-router
                            v-model="currentPage">
                    </b-pagination-nav>
                </b-col>
            </b-row>
        </b-container>
    </main>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        name: "Articles",
        created() {
            if (!this.$route.params.oSlug || !this.$route.params.eSlug) this.$router.back();
            if (!this.articles.length)
                this.$store.dispatch('event/articles', this.$route.params);
        },
        computed: {
            ...mapState({
                articles: ({event}) => event.articles.data,
                totalPage: ({event}) => event.articles.totalPage,
            }),
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
            },
            changePage(page) {
                this.$store.dispatch('event/articles', {
                    ...this.$route.params,
                    page,
                });
            },
            resolveArticleDetail(article){
                this.$store.commit('event/selectArticle',article);
                this.$router.push({ name: 'ArticleDetail', params:{...this.$route.params, aSlug: article.slug }, props:{article}})
            },
        }
    }
</script>

<style scoped lang="scss">

</style>
