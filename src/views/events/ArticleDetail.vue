<template>
    <main class="container">
        <div class="page-content">
            <article class="post post--single">
                <header class="post__header">
                    <h3 class="post__title">{{ article.title }}</h3>
                    <div class="post__meta">
                        <span class="post__created-at">
                            <i class="fa fa-clock-o"/><a href="#"> {{ article.updated_at ? date :'' }}</a>
                        </span>
                    </div>
                </header>
                <div class="post__content" v-html="article.body"></div>
            </article>
        </div>
    </main>
</template>

<script>
    import {mapState} from "vuex";
    import common from "../../utils/common";

    export default {
        name: "ArticleDetail",
        data(){
            return {
                articleLoading: common.articleLoading
            };
        },
        mounted() {
            if(!this.article.title)
                this.$store.dispatch('event/articleDetail', this.$route.params);
        },
        computed: {
            ...mapState({
                article: ({event}) => event.article,
            }),
            date() {
                return this.article ? new Intl.DateTimeFormat('en-US', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                }).format(new Date(Date.parse(this.article.updated_at))) : '';
            }
        }
    }
</script>

<style>

    .post--single p, h3 {
        font-family: Roboto, sans-serif !important;
        margin-bottom: 20px;
    }

    .post--single .post__header {
        border-bottom: 1px solid #ddd;
    }

    .post--single .post__title {
        font-weight: 700;
        color: #666;
        font-size: 24px;
        letter-spacing: .05em;
    }

    .post--single .post__meta {
        margin-bottom: 10px;
    }

    .post--single .post__meta span {
        margin-right: 15px;
        color: #ff2b4a;
    }

    .post--single .post__content {
        padding: 30px 0;
    }

    .post--single .post__relate-group {
        text-align: left;
    }

    .post--single .post__relate-group.post__relate-group--right {
        text-align: right;
    }

    .post--single .post__relate-group {
        text-align: left;
    }

    .post--single .post__relate-group .relate__title {
        position: relative;
        margin-bottom: 20px;
        padding-bottom: 5px;
        font-size: 14px;
        font-weight: 700;
        color: #333;
    }

    .post--related .post__thumbnail {
        position: relative;
        width: 100px;
        float: left;
    }

    .post--related .post__header {
        float: left;
        width: calc(100% - 100px);
        padding-left: 15px;
        border-bottom: none;
    }

    .post .post__overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
        transition: all .4s ease;
    }

    iframe, img {
        max-width: 100%;
    }

    .post--single .post__meta span a {
        font-weight: 400;
        color: #666;
        font-size: 12px;
        letter-spacing: .01em;
    }
</style>
