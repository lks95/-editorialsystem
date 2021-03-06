<template>
    <div>
        <form id="addForm" @submit.prevent="submit"  class="pb-2 mb-3 mr-3">

            <div class="form-group" :class="{'form-group--error': $v.publikation_title.$error}">
                <label for="titleInput">Titel:</label>
                <input type="text" class="form-control"  id="titleInput" v-model.trim="publikation_title"  @input="updateTitle($event.target.value)">
                <div class="error ml-2" v-if="!$v.publikation_title.required">Pflichtfeld</div>
                <div class="error ml-2 text-danger" v-if="!$v.publikation_title.minLength">Titel muss mindestens {{$v.publikation_title.$params.minLength.min}} Zeichen enthalten.</div>
            </div>

            <div class="form-group" :class="{'form-group--error': $v.publikation_subtitle.$error}">
                <label for="subtitleInput">Untertitel:</label>
                <input type="text" class="form-control" id="subtitleInput" v-model.trim="publikation_subtitle" @input="updateSubtitle($event.target.value)">
                <div class="error ml-2" v-if="!$v.publikation_subtitle.required">Pflichtfeld</div>
                <div class="error ml-2 text-danger" v-if="!$v.publikation_subtitle.minLength">Untertitel muss mindestens {{$v.publikation_subtitle.$params.minLength.min}} Zeichen enthalten.</div>
            </div>

            <div class="form-group" :class="{'form-group--error': $v.publikation_text.$error}">
                <label for="textInput">Text:</label>
                <textarea class="form-control" id="textInput" rows="3" v-model.trim="publikation_text" @input="updateText($event.target.value)"></textarea>
                <div class="error ml-2" v-if="!$v.publikation_text.required">Pflichtfeld</div>
                <div class="error ml-2 text-danger" v-if="!$v.publikation_text.minLength">Text muss mindestens {{$v.publikation_text.$params.minLength.min}} Zeichen enthalten.</div>
                <div class="error ml-2 text-danger" v-if="!$v.publikation_text.maxLength">Text darf maximal {{$v.publikation_text.$params.maxLength.max}} Zeichen enthalten.</div>
            </div>

            <div class="form-group" :class="{'form-group--error': $v.publikation_author.$error}">
                <label for="authorInput">Autor:</label>
                <textarea class="form-control" id="authorInput" rows="3" v-model.trim="publikation_author" @input="updateAuthor($event.target.value)"></textarea>
                <div class="error ml-2" v-if="!$v.publikation_author.required">Pflichtfeld</div>
                <div class="error ml-2 text-danger" v-if="!$v.publikation_author.minLength">Autor muss mindestens {{$v.publikation_author.$params.minLength.min}} Zeichen enthalten.</div>
            </div>

            <div class="form-group" :class="{'form-group--error': $v.publikation_betreuer.$error}">
                <label for="betreuerInput">Betreuer:</label>
                <textarea class="form-control" id="betreuerInput" rows="3" v-model.trim="publikation_betreuer" @input="updateBetreuer($event.target.value)"></textarea>
                <div class="error ml-2" v-if="!$v.publikation_betreuer.required">Pflichtfeld</div>
            </div>

            <div class="form-group" :class="{'form-group--error': $v.img.$error}">
                <label for="imgInput">Bild:</label>
                <textarea class="form-control" id="imgInput" rows="3" v-model.trim="img" @input="updateImg($event.target.value)"></textarea>
                <div class="error ml-2" v-if="!$v.img.required">Pflichtfeld</div>
            </div>

            <div class="form-group" :class="{'form-group--error': $v.pdf.$error}">
                <label for="pdfInput">PDF:</label>
                <textarea class="form-control" id="pdfInput" rows="3" v-model.trim="pdf" @input="updatePdf($event.target.value)"></textarea>
                <div class="error ml-2" v-if="!$v.pdf.required">Pflichtfeld</div>
            </div>

            <div class="d-flex flex-row-reverse">
                <button type="submit" class="btn btn-primary">Speichern</button>
                <button class="btn btn-secondary mx-2" @click="$emit('cancel')">Abbrechen</button>
                <p class="typo__p text-danger" v-if="submitStatus === 'ERROR'">Formular enthält noch Fehler.</p>
            </div>

        </form>
    </div>
</template>

<script>
import {required, minLength, maxLength} from 'vuelidate/lib/validators'

export default {
        name: "CreatePublikationen",
        data() {
            return{
                publikation_title: '',
                publikation_subtitle: '',
                publikation_text: '',
                publikation_author: '',
                publikation_betreuer: '',
                img: '',
                pdf: '',
                submitStatus: null,
            };
        },
        validations:{
            publikation_title: {required, minLength: minLength(3)},
            publikation_subtitle: {required, minLength: minLength(3)},
            publikation_text: {required, minLength: minLength(15), maxLength: maxLength(550)},
            publikation_author: {required, minLength: minLength(3)},
            publikation_betreuer: {required},
            img: {required},
            pdf: {required},
        },
        methods: {
            submit: function() {
                this.$v.$touch();
                if(this.$v.$invalid || this.$v.minLength || this.$v.maxLength){
                    this.submitStatus = 'ERROR';
                } else {
                    let formData = {
                        publikation_title: this.publikation_title,
                        publikation_subtitle: this.publikation_subtitle,
                        publikation_text: this.publikation_text,
                        publikation_author: this.publikation_author,
                        publikation_betreuer: this.publikation_betreuer,
                        img: this.img || this.selectedItem.img,
                        pdf: this.pdf || this.selectedItem.pdf,
                    };
                    this.$emit("save", formData);
                    this.submitStatus = 'OK';
                }
            },
            updateTitle(value){
                this.publikation_title = value;
                this.$v.publikation_title.$touch();
            },
            updateSubtitle(value){
                this.publikation_subtitle = value;
                this.$v.publikation_subtitle.$touch();
            },
            updateText(value){
                this.publikation_text = value;
                this.$v.publikation_text.$touch();
            },
            updateAuthor(value){
                this.publikation_author = value;
                this.$v.publikation_author.$touch();
            },
            updateBetreuer(value){
                this.publikation_betreuer = value;
                this.$v.publikation_betreuer.$touch();
            },
            updateImg(value){
                this.img = value;
                this.$v.img.$touch();
            },
            updatePdf(value){
                this.pdf = value;
                this.$v.pdf.$touch();
            },
        }
    }
</script>