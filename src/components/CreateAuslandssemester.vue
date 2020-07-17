<template>
    <div>
        <form id="addForm" @submit.prevent="submit"  class="pb-2 mb-3 mr-3 border-bottom">
            <div class="form-group" :class="{'form-group--error': $v.bericht_title.$error}">
                <label for="bericht_titleInput">Title:</label>
                <input type="text" class="form-control"  id="bericht_titleInput" v-model.trim="bericht_title"  @input="updateTitle($event.target.value)">
            </div>
            <div class="error" v-if="!$v.bericht_title.required">Field is required</div>
            <div class="error" v-if="!$v.bericht_title.minLength">Title must have at least {{$v.bericht_title.$params.minLength.min}} letters.</div>
            
            <div class="form-group" :class="{'form-group--error': $v.bericht_img.$error}">
                <label for="bericht_imgInput">Bild:</label>
                <input type="text" class="form-control" id="bericht_imgInput" v-model.trim="bericht_img" @input="updateImg($event.target.value)">
            </div>
            <div class="error" v-if="!$v.bericht_img.required">Field is required</div>

            <div class="form-group" :class="{'form-group--error': $v.bericht_text.$error}">
                <label for="bericht_textInput">Bericht:</label>
                <textarea class="form-control" id="bericht_textInput" rows="3" v-model.trim="bericht_text" @input="updateText($event.target.value)"></textarea>
            </div>
            <div class="error" v-if="!$v.bericht_text.required">Field is required</div>
            <div class="error" v-if="!$v.bericht_text.minLength">Text must have at least {{$v.bericht_text.$params.minLength.min}} letters.</div>
            <div class="error" v-if="!$v.bericht_text.maxLength">Text must have at most {{$v.bericht_text.$params.maxLength.max}} letters.</div>
            
            <div class="form-group" :class="{'form-group--error': $v.bericht_author.$error}">
                <label for="bericht_authorInput">Autor:</label>
                <input type="text" class="form-control"  id="bericht_authorInput" v-model.trim="bericht_author"  @input="updateAuthor($event.target.value)">
            </div>
            <div class="error" v-if="!$v.bericht_author.required">Field is required</div>
            <div class="error" v-if="!$v.bericht_author.minLength">Author must have at least {{$v.bericht_author.$params.minLength.min}} letters.</div>
            

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
            this.$v.$touch()
            if (this.$v.$invalid || this.$v.minLength || this.$v.maxLength) {
                this.submitStatus = 'ERROR'
            } else {
                let formData = {
                    bericht_title: this.bericht_title,
                    bericht_img: this.bericht_img,
                    bericht_text: this.bericht_text,
                    bericht_author: this.bericht_author
                };
                this.$emit("save", formData);
                this.submitStatus = 'PENDING'
                setTimeout(() => {
                    this.submitStatus = 'OK'
                }, 500)
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