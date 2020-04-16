<template>
    <div>
        <form id="addForm" @submit.prevent="submit" class="pb-2 mb-3 mr-3 border-bottom">
            <div class="form-group" :class="{'form-group--error': $v.bericht_title.$error}">
                <label for="titleInput">Titel:</label>
                <input type="text" class="form-control" id="titleInput" v-model.trim="bericht_title" @input="updateTitle($event.target.value)">
            </div>
            <div class="error" v-if="!$v.bericht_title.required">Field is required</div>
            <div class="error" v-if="!$v.bericht_title.minLength">Title must have at least {{$v.bericht_title.$params.minLength.min}} letters.</div>
            <div class="error" v-if="!$v.bericht_title.maxLength">Title must have at most {{$v.bericht_title.$params.maxLength.max}} letters.</div>
            
            <div class="form-group" :class="{'form-group--error': $v.bericht_author.$error}">
                <label for="authorInput">Autor:</label>
                <input type="text" class="form-control" id="authorInput" v-model.trim="bericht_author" @input="updateAuthor($event.target.value)">
            </div>
            <div class="error" v-if="!$v.bericht_author.required">Field is required</div>
            <div class="error" v-if="!$v.bericht_author.minLength">Author must have at least {{$v.bericht_author.$params.minLength.min}} letters.</div>
            <div class="error" v-if="!$v.bericht_author.maxLength">Author must have at most {{$v.bericht_author.$params.maxLength.max}} letters.</div>
            
            <div class="form-group" :class="{'form-group--error': $v.bericht_img.$error}">
                <label for="imgInput">Bild:</label>
                <input type="text" class="form-control" id="imgInput" v-model.trim="bericht_img" @input="updateImg($event.target.value)">
            </div>
            <div class="error" v-if="!$v.bericht_img.required">Field is requiretextd</div>
            
            <div class="form-group" :class="{'form-group--error': $v.bericht_title_position.$error}">
                <label for="positionInput">Position Titel:</label>
                <input type="text" class="form-control" id="positionInput" v-model.trim="bericht_title_position" @input="updatePosition($event.target.value)">
            </div>
            <div class="error" v-if="!$v.bericht_title_position.required">Field is required</div>
            <div class="error" v-if="!$v.bericht_title_position.minLength">Position Title must have at least {{$v.bericht_title_position.$params.minLength.min}} letters.</div>
            <div class="error" v-if="!$v.bericht_title_position.maxLength">Position Title must have at most {{$v.bericht_title_position.$params.maxLength.max}} letters.</div>
            
            <div class="form-group" :class="{'form-group--error': $v.bericht_text.$error}">
                <label for="textInput">Bericht:</label>
                <textarea class="form-control" id="textInput" rows="3" v-model.trim="bericht_text" @input="updateText($event.target.value)"></textarea>
            </div>
            <div class="error" v-if="!$v.bericht_text.required">Field is required</div>
            <div class="error" v-if="!$v.bericht_text.minLength">Text must have at least {{$v.bericht_text.$params.minLength.min}} letters.</div>
            <div class="error" v-if="!$v.bericht_text.maxLength">Text must have at most {{$v.bericht_text.$params.maxLength.max}} letters.</div>
            
            <div class="d-flex flex-row-reverse">
                <button type="submit" class="btn btn-primary" :disabled="submitStatus === 'PENDING'">Speichern</button>
                <p class="typo__p" v-if="submitStatus === 'ERROR'">Please fill the form correctly.</p>
                <p class="typo__p" v-if="submitStatus === 'PENDING'">Sending...</p>
                <button class="btn btn-outline-secondary mx-2" @click="$emit('cancel')">Abbrechen</button>
            </div>
        </form>
    </div>
</template>

<script>
import {required, minLength, maxLength} from 'vuelidate/lib/validators'

export default {
    name: 'EditAuslandssemester',
    props: ["selectedItem"],
    data() {
        return{
            bericht_title: '',
            bericht_author: '',
            bericht_img: '',
            bericht_text: '',
            bericht_title_position: '',
            submitStatus: null,
        };
    },
    validations:{
        bericht_title: { required, minLength: minLength(3), maxLength: maxLength(25)},
        bericht_author: { required, minLength: minLength(3), maxLength: maxLength(25)},
        bericht_img: { required },
        bericht_text: { required, minLength: minLength(15), maxLength: maxLength(50) },
        bericht_title_position: { required, minLength: minLength(5), maxLength: maxLength(30) },
    },
    
    methods: {
         submit: function() {
            console.log('submit!')
            this.$v.$touch()
            if (this.$v.$invalid || this.$v.minLength || this.$v.maxLength) {
                this.submitStatus = 'ERROR'
            } else {
                let formData = {
                bericht_title: this.bericht_title || this.selectedItem.bericht_title,
                bericht_img: this.bericht_img || this.selectedItem.bericht_img,
                bericht_text: this.bericht_text || this.selectedItem.bericht_text,
                bericht_author: this.bericht_author || this.selectedItem.bericht_author,
                bericht_title_position: this.bericht_title_position || this.selectedItem.bericht_title_position
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
        },
        updatePosition(value){
            this.bericht_title_position = value;
            this.$v.bericht_title_position.$touch();
        }
    }
}
</script>