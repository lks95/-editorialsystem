<template>
    <div>
        <form id="addForm" @submit.prevent="submit"  class="pb-2 mb-3 mr-3 border-bottom">
            <div class="form-group" :class="{'form-group--error': $v.intro_title.$error}">
                <label for="intro_titleInput">Title:</label>
                <input type="text" class="form-control"  id="intro_titleInput" v-model.trim="intro_title"  @input="updateTitle($event.target.value)">
            </div>
            <div class="error" v-if="!$v.intro_title.required">Field is required</div>
            <div class="error" v-if="!$v.intro_title.minLength">Author must have at least {{$v.intro_title.$params.minLength.min}} letters.</div>
            <div class="form-group" :class="{'form-group--error': $v.intro_img_src.$error}">
                <label for="intro_img_srcInput">Bildname:</label>
                <input type="text" class="form-control" id="intro_img_srcInput" v-model.trim="intro_img_src" @input="updateImgSrc($event.target.value)">
            </div>
            <div class="error" v-if="!$v.intro_img_src.required">Field is required</div>
            <div class="form-group" :class="{'form-group--error': $v.intro_text.$error}">
                <label for="intro_textInput">Bericht:</label>
                <textarea class="form-control" id="intro_textInput" rows="3" v-model.trim="intro_text" @input="updateText($event.target.value)"></textarea>
            </div>
            <div class="error" v-if="!$v.intro_text.required">Field is required</div>
            <div class="error" v-if="!$v.intro_text.minLength">Text must have at least {{$v.intro_text.$params.minLength.min}} letters.</div>
            <div class="error" v-if="!$v.intro_text.maxLength">Text must have at most {{$v.intro_text.$params.maxLength.max}} letters.</div>
            
            <div class="d-flex flex-row-reverse">
                <button type="submit" class="btn btn-primary" :disabled="submitStatus === 'PENDING'" >Speichern</button>
                <button class="btn btn-outline-secondary mx-2" @click="$emit('cancel')">Abbrechen</button>
                <p class="typo__p" v-if="submitStatus === 'ERROR'">Please fill the form correctly.</p>
                <p class="typo__p" v-if="submitStatus === 'PENDING'">Sending...</p>
            </div>
        </form>
    </div>
</template>

<script>
import {required, minLength, maxLength} from 'vuelidate/lib/validators'

export default {
    name: 'CreateProjekte',
    data() {
        return{
           // study: '',
           // category: '',
            intro_title: '',
            intro_text: '',
            intro_img_src: '',
           // intro_img_alt: '',
           // detail_headline: '',
            //detail_header_img_src: '',
           // detail_header_img_alt:'',
           // detail_header_intro: '',
           // detail_text: '',
           // detail_media: '',
           // date: '',
           // contacts: '',
            submitStatus: null,
        };
    },
    validations:{
        intro_title: { required, minLength: minLength(3)},
        intro_img_src: { required },
        intro_text: { required, minLength: minLength(15), maxLength: maxLength(550) }
    },
    methods: {
        submit: function() {
            this.$v.$touch()
            if (this.$v.$invalid || this.$v.minLength || this.$v.maxLength) {
                this.submitStatus = 'ERROR'
            } else {
                let formData = {
                    intro_title: this.intro_title,
                    intro_img_src: this.img,
                    intro_text: this.text,
                };
                this.$emit("save", formData);
                this.submitStatus = 'PENDING'
                setTimeout(() => {
                    this.submitStatus = 'OK'
                }, 500)
            } 
        },
        updateText(value){
            this.intro_text = value;
            this.$v.intro_text.$touch();
        },
        updateTitle(value){
            this.intro_title = value;
            this.$v.intro_title.$touch();
        },
        updateImgSrc(value){
            this.intro_img_src = value;
            this.$v.intro_img_src.$touch();
        }
    }
}
</script>