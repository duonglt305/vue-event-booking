<template>
    <div class="mt-5 card card-body">
        <div class="pl-5 section-title" id="description">
            <p>Description</p>
        </div>
        <div class="pr-5 pl-5 pt-3 pb-3">
            <read-more more-str="Read more..." :text="article.body" link="#" less-str="Read less" :max-chars="600"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Description",
        props: {
            article: {
                type: Object,
                default: {}
            }
        }
    }
</script>

<style scoped>
    .section-title {
        border-bottom: 2px solid var(--main);
        margin-bottom: 0.5em;
    }

    .section-title p {
        padding-top: 0.5em;
        padding-bottom: 0.5em;
        font-size: 1.75em;
    }

    .card-body {
        padding: unset;
    }
</style>
