<template>
    <div>
        <form @submit.prevent="submit"  class="pb-2 mb-3 mr-3">
            <div class="form-group" :class="{'form-group--error': $v.bericht_title.$error}">
                <label :for="'bericht_titleInput-' + this.selectedIndex">Title:</label>
                <input type="text" class="form-control"  :id="'bericht_titleInput-' + this.selectedIndex" v-model.trim="bericht_title"  @input="updateTitle($event.target.value)">
            </div>
            <div class="error" v-if="!$v.bericht_title.required">Field is required</div>
            <div class="error" v-if="!$v.bericht_title.minLength">Title must have at least {{$v.bericht_title.$params.minLength.min}} letters.</div>
           
            
            <div class="form-group" :class="{'form-group--error': $v.bericht_img.$error}">
                <label :for="'bericht_imgInput-' + this.selectedIndex">Bild:</label>
                <input type="text" class="form-control" :id="'bericht_imgInput-' + this.selectedIndex" v-model.trim="bericht_img" @input="updateImg($event.target.value)">
            </div>
            <div class="error" v-if="!$v.bericht_img.required">Field is required</div>
            <div class="form-group" :class="{'form-group--error': $v.bericht_text.$error}">
                <label :for="'bericht_textInput-' + this.selectedIndex">Bericht:</label>
                <textarea class="form-control" :id="'bericht_textInput-' + this.selectedIndex" rows="3" v-model.trim="bericht_text" @input="updateText($event.target.value)"></textarea>
            </div>
            <div class="error" v-if="!$v.bericht_text.required">Field is required</div>
            <div class="error" v-if="!$v.bericht_text.minLength">Text must have at least {{$v.bericht_text.$params.minLength.min}} letters.</div>
            <div class="error" v-if="!$v.bericht_text.maxLength">Text must have at most {{$v.bericht_text.$params.maxLength.max}} letters.</div>
            
            <div class="form-group" :class="{'form-group--error': $v.bericht_author.$error}">
                <label :for="'bericht_authorInput-' + this.selectedIndex">Autor:</label>
                <input type="text" class="form-control"  :id="'bericht_authorInput-' + this.selectedIndex" v-model.trim="bericht_author"  @input="updateAuthor($event.target.value)">
            </div>
            <div class="error" v-if="!$v.bericht_author.required">Field is required</div>
            <div class="error" v-if="!$v.bericht_author.minLength">Author must have at least {{$v.bericht_author.$params.minLength.min}} letters.</div>
            
            
            <div class="d-flex flex-row-reverse">
                <button type="submit" class="btn btn-primary">Speichern</button>
                <b-button class="mx-2" @click="resetForm">Abbrechen</b-button>
                <p class="typo__p text-danger" v-if="submitStatus === 'ERROR'">Please fill the form correctly.</p>
            </div>
        </form>
    </div>
</template>

<script>
import {required, minLength, maxLength} from 'vuelidate/lib/validators'

export default {
    name: 'EditAuslandssemester',
    props: ["selectedItem", "selectedIndex"],
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
                    bericht_title: this.bericht_title || this.selectedItem.bericht_title,
                    bericht_img: this.bericht_img || this.selectedItem.bericht_img,
                    bericht_text: this.bericht_text || this.selectedItem.bericht_text,
                    bericht_author: this.bericht_author || this.selectedItem.bericht_author,
                    asId: this.selectedIndex
                };
                this.$emit("save", formData);
                this.submitStatus = 'OK';
                this.$root.$emit('bv::toggle::collapse', 'collapse-' + this.selectedIndex);
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
        resetForm(){
            this.bericht_title= this.selectedItem.bericht_title;
            this.bericht_img= this.selectedItem.bericht_img;
            this.bericht_text= this.selectedItem.bericht_text;
            this.bericht_author= this.selectedItem.bericht_author;
            this.$root.$emit('bv::toggle::collapse', 'collapse-' + this.selectedIndex);
        }
    },
    mounted(){
        this.bericht_title = this.selectedItem.bericht_title;
        this.bericht_img = this.selectedItem.bericht_img;
        this.bericht_text = this.selectedItem.bericht_text;
        this.bericht_author = this.selectedItem.bericht_author;
    }
}
</script>