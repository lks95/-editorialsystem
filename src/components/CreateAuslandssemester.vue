<template>
    <div>
        <form id="addForm" @submit.prevent="submit"  class="pb-2 mb-3 mr-3 border-bottom">

            <div class="form-group" :class="{'form-group--error': $v.bericht_title.$error}">
                <label for="bericht_titleInput">Titel:</label>
                <input type="text" class="form-control"  id="bericht_titleInput" v-model.trim="bericht_title"  @input="updateTitle($event.target.value)">
                <div class="error ml-2" v-if="!$v.bericht_title.required">Pflichtfeld</div>
                <div class="error ml-2" v-if="!$v.bericht_title.minLength">Titel muss mindestens {{$v.bericht_title.$params.minLength.min}} Zeichen enthalten.</div>
            </div>
            
            <div class="form-group" :class="{'form-group--error': $v.bericht_img.$error}">
                <label for="bericht_imgInput">Bild:</label>
                <input type="text" class="form-control" id="bericht_imgInput" v-model.trim="bericht_img" @input="updateImg($event.target.value)">
                <div class="error ml-2" v-if="!$v.bericht_img.required">Pflichtfeld</div>
            </div>

            <div class="form-group" :class="{'form-group--error': $v.bericht_text.$error}">
                <label for="bericht_textInput">Bericht:</label>
                <textarea class="form-control" id="bericht_textInput" rows="3" v-model.trim="bericht_text" @input="updateText($event.target.value)"></textarea>
                <div class="error ml-2" v-if="!$v.bericht_text.required">Pflichtfeld</div>
                <div class="error ml-2" v-if="!$v.bericht_text.minLength">Text muss mindestens {{$v.bericht_text.$params.minLength.min}} Zeichen enthalten.</div>
                <div class="error ml-2" v-if="!$v.bericht_text.maxLength">Text darf maximal {{$v.bericht_text.$params.maxLength.max}} Zeichen enthalten.</div>
            </div>
            
            <div class="form-group" :class="{'form-group--error': $v.bericht_author.$error}">
                <label for="bericht_authorInput">Autor:</label>
                <input type="text" class="form-control"  id="bericht_authorInput" v-model.trim="bericht_author"  @input="updateAuthor($event.target.value)">
                <div class="error ml-2" v-if="!$v.bericht_author.required">Pflichtfeld</div>
                <div class="error ml-2" v-if="!$v.bericht_author.minLength">Autor muss mindestens {{$v.bericht_author.$params.minLength.min}} Zeichen enthalten.</div>
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
    name: 'CreateAuslandssemester',
    data() {
        return{
            bericht_title: '',
            bericht_img: '',
            bericht_text: '',
            bericht_author: '',
            submitStatus: null,
        };
    },
    validations:{
        bericht_title: { required, minLength: minLength(3)},
        bericht_img: { required },
        bericht_text: { required, minLength: minLength(15), maxLength: maxLength(550) },
        bericht_author: { required, minLength: minLength(3)},
    },
    methods: {
        submit: function() {
            this.$v.$touch();
            if (this.$v.$invalid || this.$v.minLength || this.$v.maxLength) {
                this.submitStatus = 'ERROR';
            } else {
                let formData = {
                    bericht_title: this.bericht_title,
                    bericht_img: this.bericht_img,
                    bericht_text: this.bericht_text,
                    bericht_author: this.bericht_author
                };
                this.$emit("save", formData);
                this.submitStatus = 'OK';
            } 
        },
        updateTitle(value){
            this.bericht_title = value;
            this.$v.bericht_title.$touch();
        },
        updateText(value){
            this.bericht_text = value;
            this.$v.bericht_text.$touch();
        },
        updateAuthor(value){
            this.bericht_author = value;
            this.$v.bericht_author.$touch();
        },
        updateImg(value){
            this.bericht_img = value;
            this.$v.bericht_img.$touch();
        }
    }
}
</script>