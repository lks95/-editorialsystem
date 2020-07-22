<template>
    <div>
        <form id="addForm" @submit.prevent="submit"  class="pb-2 mb-3 mr-3 border-bottom">

            <div class="form-group" :class="{'form-group--error': $v.author.$error}">
                <label for="authorInput">Autor:</label>
                <input type="text" class="form-control"  id="authorInput" v-model.trim="author"  @input="updateAuthor($event.target.value)">
                <div class="error ml-2" v-if="!$v.author.required">Pflichtfeld</div>
                <div class="error ml-2 text-danger" v-if="!$v.author.minLength">Autor muss mindestens {{$v.author.$params.minLength.min}} Zeichen enthalten.</div>
            </div>

            <div class="form-group" :class="{'form-group--error': $v.img.$error}">
                <label for="imgInput">Bild:</label>
                <input type="text" class="form-control" id="imgInput" v-model.trim="img" @input="updateImg($event.target.value)">
                <div class="error ml-2" v-if="!$v.img.required">Pflichtfeld</div>
            </div>
            
            <div class="form-group" :class="{'form-group--error': $v.text.$error}">
                <label for="textInput">Bericht:</label>
                <textarea class="form-control" id="textInput" rows="3" v-model.trim="text" @input="updateText($event.target.value)"></textarea>
                <div class="error ml-2" v-if="!$v.text.required">Pflichtfeld</div>
                <div class="error ml-2 text-danger" v-if="!$v.text.minLength">Text muss mindestens {{$v.text.$params.minLength.min}} Zeichen enthalten.</div>
                <div class="error ml-2 text-danger" v-if="!$v.text.maxLength">Text darf maximal {{$v.text.$params.maxLength.max}} Zeichen enthalten.</div>
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
    name: 'CreatePraxissemester',
    data() {
        return{
            author: '',
            img: '',
            text: '',
            submitStatus: null,
        };
    },
    validations:{
        author: { required, minLength: minLength(3)},
        img: { required },
        text: { required, minLength: minLength(15), maxLength: maxLength(550) }
    },
    methods: {
        submit: function() {
            this.$v.$touch();
            if (this.$v.$invalid || this.$v.minLength || this.$v.maxLength) {
                this.submitStatus = 'ERROR';
            } else {
                let formData = {
                    img: this.img,
                    text: this.text,
                    author: this.author
                };
                this.$emit("save", formData);
                this.submitStatus = 'OK';
            } 
        },
        updateText(value){
            this.text = value;
            this.$v.text.$touch();
        },
        updateAuthor(value){
            this.author = value;
            this.$v.author.$touch();
        },
        updateImg(value){
            this.img = value;
            this.$v.img.$touch();
        }
    }
}
</script>