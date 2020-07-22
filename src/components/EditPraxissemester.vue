<template>
    <div>
        <form @submit.prevent="submit"  class="pb-2 mb-3 mr-3">
        
            <div class="form-group" :class="{'form-group--error': $v.author.$error}">
                <label :for="'authorInput-' + this.selectedIndex" >Autor:</label>
                <input type="text" class="form-control"  :id="'authorInput-' + this.selectedIndex" v-model.trim="author"  @input="updateAuthor($event.target.value)">
                <div class="error ml-2" v-if="!$v.author.required">Pflichtfeld</div>
                <div class="error ml-2 text-danger" v-if="!$v.author.minLength">Autor muss mindestens {{$v.author.$params.minLength.min}} Zeichen enthalten.</div>
            </div>
            
            <div class="form-group" :class="{'form-group--error': $v.img.$error}">
                <label :for="'imgInput-' + this.selectedIndex">Bild:</label>
                <input type="text" class="form-control" :id="'imgInput-' + this.selectedIndex" v-model.trim="img" @input="updateImg($event.target.value)">
                <div class="error ml-2" v-if="!$v.img.required">Pflichtfeld</div>
            </div>
            
            <div class="form-group" :class="{'form-group--error': $v.text.$error}">
                <label :for="'textInput-' + this.selectedIndex">Bericht:</label>
                <textarea class="form-control" :id="'textInput-' + this.selectedIndex" rows="3" v-model.trim="text" @input="updateText($event.target.value)"></textarea>
                <div class="error ml-2" v-if="!$v.text.required">Pflichtfeld</div>
                <div class="error ml-2 text-danger" v-if="!$v.text.minLength">Text muss mindestens {{$v.text.$params.minLength.min}} Zeichen enthalten.</div>
                <div class="error ml-2 text-danger" v-if="!$v.text.maxLength">Text darf maximal {{$v.text.$params.maxLength.max}} Zeichen enthalten.</div>
            </div>
            
            <div class="d-flex flex-row-reverse">
                <button type="submit" class="btn btn-primary">Speichern</button>
                <b-button class="mx-2" @click="resetForm">Abbrechen</b-button>
                <p class="typo__p text-danger" v-if="submitStatus === 'ERROR'">Formular enthält noch Fehler.</p>
            </div>
        
        </form>
    </div>
</template>

<script>
import {required, minLength, maxLength} from 'vuelidate/lib/validators'

export default {
    name: 'EditPraxissemester',
    props: ["selectedItem", "selectedIndex"],
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
                    img: this.img || this.selectedItem.img,
                    text: this.text || this.selectedItem.text,
                    author: this.author || this.selectedItem.author,
                    psId: this.selectedIndex
                };
                this.$emit("save", formData);
                this.submitStatus = 'OK';
            this.$root.$emit('bv::toggle::collapse', 'collapse-' + this.selectedIndex);
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
        },
        resetForm(){
            this.author= this.selectedItem.author;
            this.img= this.selectedItem.img;
            this.text= this.selectedItem.text;
            this.$root.$emit('bv::toggle::collapse', 'collapse-' + this.selectedIndex);
            this.submitStatus = 'OK';
        }
    },
    mounted(){
        this.author = this.selectedItem.author;
        this.img = this.selectedItem.img;
        this.text = this.selectedItem.text;
    }
}
</script>