<template>
    <div :class="{ 'is-invalid' : hasErrors}" class="form-group">
        <label :class="labelClass" :for="labelFor">{{ label }}</label>
        <slot/>
        <span :class="messageColorClass" class="invalid-feedback">{{
            firstErrorMessage }}</span>
    </div>
</template>

<script>
    import {singleErrorExtractorMixin} from 'vuelidate-error-extractor'

    export default {
        props: [
            'labelClass',
            'messageColorClass',
            "labelFor"
        ],
        mixins: [singleErrorExtractorMixin]
    }
</script>

<style scoped>
    .form-group.is-invalid > .form-control {
        border-color: #dc3545;
        padding-right: calc(1.5em + .75rem);
        background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' fill='%23dc3545' viewBox='-2 -2 7 7'><path stroke='%23dc3545' d='M0 0l3 3m0-3L0 3'/><circle r='.5'/><circle cx='3' r='.5'/><circle cy='3' r='.5'/><circle cx='3' cy='3' r='.5'/></svg>");
        background-repeat: no-repeat;
        background-position: center right calc(.375em + .1875rem);
        background-size: calc(.75em + .375rem) calc(.75em + .375rem);
    }

    .form-group.is-invalid > .invalid-feedback {
        display: block;
    }

    .invalid-feedback {
        line-height: 16px;
    }
</style>
