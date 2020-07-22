<template>
    <div>
        <form id="addTermineForm" @submit.prevent="submit" class="pb-2 mb-3 mr-3 border-bottom">

            <div class="form-group" :class="{'form-group-error': $v.title.$error}">
                <label for="titleInput">Titel:</label>
                <input type="text" class="form-control" id="titleInput" v-model.trim="title" @input="updateTitel($event.target.value)">
                <div class="error ml-2" v-if="!$v.title.required">Pflichtfeld</div>
                <div class="error ml-2 text-danger" v-if="!$v.title.minLength">Titel muss mindestens {{$v.title.$params.minLength.min}} Zeichen enthalten.</div>
                <div class="error ml-2 text-danger" v-if="!$v.title.maxLength">Titel darf maximal {{$v.title.$params.maxLength.max}} Zeichen enthalten.</div>
            </div>

            <div class="form-group" :class="{'form-group-error': $v.link.$error}">
                <label for="linkInput">Link:</label>
                <input type="text" class="form-control" id="linkInput" v-model.trim="link" @input="updateLink($event.target.value)">
                <div class="error ml-2" v-if="!$v.link.required">Pflichtfeld</div>
            </div>

            <div class="form-group" :class="{'form-group-error': $v.linkText.$error}">
                <label for="descriptionInput">Linktext:</label>
                <input type="text" class="form-control" id="descriptionInput" v-model.trim="linkText" @input="updateLinktext($event.target.value)">
                <div class="error ml-2" v-if="!$v.linkText.required">Pflichtfeld</div>
            </div>

            <div class="form-group" :class="{'form-group-error': $v.img.$error}">
                <label for="picInput">Bild:</label>
                <input type="text" class="form-control" id="picInput" v-model.trim="img" @input="updateImg($event.target.value)">
                <div class="error ml-2" v-if="!$v.img.required">Pflichtfeld</div>
            </div>

            <div class="form-group" :class="{'form-group-error': $v.text.$error}">
                <label for="textInput">Text:</label>
                <input type="text" class="form-control" id="textInput" v-model.trim="text" @input="updateText($event.target.value)">
                <div class="error ml-2" v-if="!$v.text.required">Pflichtfeld</div>
                <div class="error ml-2 text-danger" v-if="!$v.text.maxLength">Text darf maximal {{$v.text.$params.maxLength.max}} Zeichen enthalten.</div>
            </div>

            <div class="d-flex flex-row-reverse">
                <button type="submit" class="btn btn-primary">Speichern</button>
                <button class="btn btn-outline-secondary mx-2" @click="$emit('cancel')">Abbrechen</button>
                <p class="typo__p text-danger" v-if="submitStatus === 'ERROR'">Formular enthält noch Fehler.</p>
            </div>

        </form>
    </div>
</template>

<script>
import {required, minLength, maxLength} from 'vuelidate/lib/validators'

    export default {
        name: "CreateNews",
        data(){
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
                if(this.$v.$invalid || this.$v.minLength ||this.$v.maxLength){
                    this.submitStatus = 'ERROR';
                } else {
                    let formData = {
                        title: this.title,
                        link: this.link,
                        linkText: this.linkText,
                        img: this.img,
                        text: this.text,
                    };
                    this.$emit("save", formData);
                    this.submitStatus = 'OK';
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
            }
        }
    }
</script>
