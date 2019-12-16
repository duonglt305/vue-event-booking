<template>
    <b-card class="mt-4 mt-lg-0">
        <template v-slot:header>
            Change photo
        </template>
        <div class="profile-upload-photo">
            <div class="profile-cropper-content">
                <Cropper
                    ref="cropper"
                    classname="upload-example-cropper"
                    :src="photo"
                    :stencilProps="{
                        aspectRatio: 1
                    }"
                    :stencilComponent="$options.components.RectangleStencil"
                />
            </div>
            <div class="photo-upload-actions">
                <b-button variant="primary" size="sm" @click="$refs.photo.click()">
                    <input type="file" ref="photo" @change="choosePhoto" hidden accept="image/*">
                    Choose photo
                </b-button>
                <b-button variant="success" size="sm" v-if="photo" @click="uploadPhoto">
                    Upload
                </b-button>
            </div>
        </div>
    </b-card>
</template>

<script>
    import {Cropper, RectangleStencil} from 'vue-advanced-cropper'

    export default {
        name: "ChangePhoto",
        components: {
            Cropper, RectangleStencil
        },
        data() {
            return {
                photo: null,
            };
        },
        methods: {
            choosePhoto(event) {
                let input = event.target;
                if (input.files && input.files[0]) {
                    let reader = new FileReader();
                    reader.onload = (e) => {
                        this.photo = e.target.result;
                    };
                    reader.readAsDataURL(input.files[0]);
                }
            },
            uploadPhoto() {
                const {canvas} = this.$refs.cropper.getResult();
                let data = new FormData();
                data.append('photo', canvas.toDataURL('image/png'));
                this.$store.dispatch('auth/changePhoto', data);
                this.photo = null;
            }
        }
    }
</script>

<style scoped>
    .profile-upload-photo {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .photo-upload-actions {
        margin-top: 1rem;
    }
</style>
