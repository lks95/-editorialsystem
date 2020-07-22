<template>
    <div>
        <form @submit.prevent="submit" class="pb-2 mb-3 mr-3 border-bottom">
            <div class="form-group" :class="{'form-group-error': $v.title.$error}">
                <label :for="'titleInput-' + this.selectedIndex">Titel:</label>
                <input type="text" class="form-control" :id="'titleInput-' + this.selectedIndex" v-model.trim="title" @input="updateTitel($event.target.value)">
            </div>
            <div class="error" v-if="!$v.title.required">Field is required</div>
            <div class="error" v-if="!$v.title.minLength">Title must have at least {{$v.title.$params.minLength.min}} letters.</div>
            <div class="error" v-if="!$v.title.maxLength">Title must have at most {{$v.title.$params.maxLength.max}} letters.</div>

            <div class="form-group" :class="{'form-group-error': $v.link.$error}">
                <label :for="'linkInput-' + this.selectedIndex">Link:</label>
                <input type="text" class="form-control" :id="'linkInput-' + this.selectedIndex" v-model.trim="link" @input="updateLink($event.target.value)">
            </div>
            <div class="error" v-if="!$v.link.required">Field is required</div>

            <div class="form-group" :class="{'form-group-error': $v.linkText.$error}">
                <label :for="'descriptionInput-' + this.selectedIndex">Linktext:</label>
                <input type="text" class="form-control" :id="'descriptionInput-' + this.selectedIndex" v-model.trim="linkText" @input="updateLinktext($event.target.value)">
            </div>
            <div class="error" v-if="!$v.linkText.required">Field is required</div>

            <div class="form-group" :class="{'form-group-error': $v.img.$error}">
                <label :for="'placeInput-' + this.selectedIndex">Bild:</label>
                <input type="image" class="form-control" :id="'placeInput-' + this.selectedIndex" v-model.trim="img" @input="updateImg($event.target.value)">
            </div>
            <div class="error" v-if="!$v.img.required">Field is required</div>

            <div class="form-group" :class="{'form-group-error': $v.text.$error}">
                <label :for="'textInput-' + this.selectedIndex">Text:</label>
                <input type="text" class="form-control" :id="'textInput-' + this.selectedIndex" v-model.trim="text" @input="updateText($event.target.value)">
            </div>
            <div class="error" v-if="!$v.text.required">Field is required</div>
            <div class="error" v-if="!$v.text.maxLength">Text must have at most {{$v.text.$params.maxLength.max}} letters.</div>

            <div class="d-flex flex-row-reverse">
                <button type="submit" class="btn btn-primary">Speichern</button>
                <b-button class="mx-2" @click="resetForm">Abbrechen</b-button>
                <p class="typo__p text-danger" v-if="submitStatus === 'ERROR'">Fill Form correctly</p>
            </div>

        </form>
    </div>
</template>
<script>
import {maxLength, minLength, required} from "vuelidate/lib/validators";

    export default {
        name: 'EditNews',
        props: ["selectedItem", "selectedIndex"],
        data() {
            return{
                title: '',
                link: '',
                linkText: '',
                img: '',
                text: '',
                submitStatus: null,
            };
        },
        validations:{
            title: {required, minLength: minLength(3), maxLength: maxLength(60)},
            link: {required},
            linkText: {required},
            img: {required},
            text: {required, maxLength: maxLength(300)}
        },
        methods: {
            submit: function() {
                this.$v.$touch();
                if (this.$v.$invalid || this.$v.minLength || this.$v.maxLength) {
                    this.submitStatus = 'ERROR';
                } else {
                    let formData = {
                        title: this.title || this.selectedItem.title,
                        link: this.link || this.selectedItem.link,
                        linkText: this.linkText || this.selectedItem.linkText,
                        img: this.img || this.selectedItem.img,
                        text: this.text || this.selectedItem.text,
                        nId: this.selectedIndex
                    };
                    this.$emit("save", formData);
                    this.submitStatus = 'OK';
                this.$root.$emit('bv::toggle::collapse', 'collapse-' + this.selectedIndex);
                }
            },

            updateTitel(value){
                this.title = value;
                this.$v.title.$touch();
            },
            updateLinktext(value){
                this.linkText = value;
                this.$v.linkText.$touch();
            },
            updateLink(value){
                this.link = value;
                this.$v.link.$touch();
            },
            updateImg(value){
                this.img = value;
                this.$v.img.$touch();
            },
            updateText(value){
                this.text = value;
                this.$v.text.$touch();
            },

            resetForm(){
                this.title = this.selectedItem.title;
                this.link = this.selectedItem.link;
                this.linkText = this.selectedItem.linkText;
                this.img = this.selectedItem.img;
                this.text = this.selectedItem.text;
                this.$root.$emit('bv::toggle::collapse', 'collapse-' + this.selectedIndex);
            }
        },
        mounted() {
            this.title = this.selectedItem.title;
            this.link = this.selectedItem.link;
            this.linkText = this.selectedItem.linkText;
            this.img = this.selectedItem.img;
            this.text = this.selectedItem.text;
        }
    }
</script>

<style scoped>

</style>