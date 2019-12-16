<template>
    <section class="evlis-contact-area section_70" data-scroll-index="7">
        <div class="about_bg">
            <img src="../../../assets/img/email.png" alt="shout">
        </div>
        <div class="container">
            <b-row>
                <b-col cols="12">
                    <div class="site-heading">
                        <h4>Contact Us</h4>
                        <h2>get in touch</h2>
                        <p>Consectetur adipisicing elit sed do eiusmod, tempor incididunt labore dolore magna aliqua
                            enim minim veniam quista nostrud exion.</p>
                    </div>
                </b-col>
            </b-row>
            <b-row>
                <b-col cols="12">
                    <div class="contact-box">
                        <form @submit.prevent="submitContact">
                            <b-row>
                                <b-col cols="12" md="6">
                                    <form-group
                                        :validator="$v.contact.name"
                                        attribute="name"
                                        label="Your Full Name">
                                        <input type="text"
                                               class="form-control"
                                               v-model="contact.name"
                                               placeholder="Your Full Name">
                                    </form-group>
                                    <form-group
                                        :validator="$v.contact.email"
                                        attribute="email"
                                        label="Your Email Address">
                                        <input type="email"
                                               class="form-control"
                                               v-model="contact.email"
                                               placeholder="Your Email Address">
                                    </form-group>
                                </b-col>
                                <b-col cols="12" md="6">
                                    <form-group
                                        :validator="$v.contact.message"
                                        attribute="message"
                                        label="Message">
                                       <textarea placeholder="Write your message here..."
                                                 class="form-control"
                                                 v-model="contact.message"
                                                 spellcheck="false"/>
                                    </form-group>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col cols="12">
                                    <div class="form-group">

                                    </div>
                                    <div class="submit-form">
                                        <vue-recaptcha
                                            size="invisible"
                                            ref="recaptcha"
                                            @verify="onVerify"
                                            :sitekey="siteKey">
                                        </vue-recaptcha>
                                        <button type="submit"><i class="fa fa-paper-plane-o"/> Send Message</button>
                                    </div>
                                </b-col>
                            </b-row>
                        </form>
                    </div>
                </b-col>
            </b-row>
        </div>
    </section>
</template>

<script>
    import validations from "../../../validations/contact";
    import VueRecaptcha from 'vue-recaptcha';

    export default {
        name: "Contact",
        components: {VueRecaptcha},
        props: {
            id: {
                type: Number,
                default: () => 0,
            }
        },
        data() {
            return {
                siteKey: '6LcifMcUAAAAAPPUnqXIuPtvk_1jh97P0GNr-grn',
                contact: {}
            }
        },
        validations: validations,
        methods: {
            submitContact() {
                this.$refs.recaptcha.execute();
                this.$v.$touch();
            },
            onVerify(response) {
                if (!this.$v.$invalid && response) {
                    let data = {
                        ...this.contact,
                        event_id: this.id,
                        recaptcha: response,
                    };
                    this.$store.dispatch('event/submitContact', data);
                    this.contact = {};
                }
            }
        }
    }
</script>

<style scoped>

</style>
