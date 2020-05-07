<template>
    <div>
        <form id="addForm" @submit.prevent="submit"  class="pb-2 mb-3 mr-3">
            <div class="form-group" :class="{'form-group--error': $v.author.$error}">
                <label for="authorInput">Autor:</label>
                <input type="text" class="form-control"  id="authorInput" v-model.trim="author"  @input="updateAuthor($event.target.value)">
            </div>
            <div class="error" v-if="!$v.author.required">Field is required</div>
            <div class="error" v-if="!$v.author.minLength">Author must have at least {{$v.author.$params.minLength.min}} letters.</div>
            <div class="error" v-if="!$v.author.maxLength">Author must have at most {{$v.author.$params.maxLength.max}} letters.</div>
            <div class="form-group" :class="{'form-group--error': $v.img.$error}">
                <label for="imgInput">Bild:</label>
                <input type="text" class="form-control" id="imgInput" v-model.trim="img" @input="updateImg($event.target.value)">
            </div>
            <div class="error" v-if="!$v.img.required">Field is required</div>
            <div class="form-group" :class="{'form-group--error': $v.text.$error}">
                <label for="textInput">Bericht:</label>
                <textarea class="form-control" id="textInput" rows="3" v-model.trim="text" @input="updateText($event.target.value)"></textarea>
            </div>
            <div class="error" v-if="!$v.text.required">Field is required</div>
            <div class="error" v-if="!$v.text.minLength">Text must have at least {{$v.text.$params.minLength.min}} letters.</div>
            <div class="error" v-if="!$v.text.maxLength">Text must have at most {{$v.text.$params.maxLength.max}} letters.</div>
            
            <div class="d-flex flex-row-reverse">
                <button type="submit" class="btn btn-primary" :disabled="submitStatus === 'PENDING'" >Speichern</button>
                <b-button class="mx-2" v-b-toggle="'collapse-' + selectedIndex" @click="resetForm">Abbrechen</b-button>
                <p class="typo__p" v-if="submitStatus === 'ERROR'">Please fill the form correctly.</p>
                <p class="typo__p" v-if="submitStatus === 'PENDING'">Sending...</p>
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
        text: { required, minLength: minLength(15), maxLength: maxLength(150) }
    },
    methods: {
        submit: function() {
            this.$v.$touch()
            if (this.$v.$invalid || this.$v.minLength || this.$v.maxLength) {
                this.submitStatus = 'ERROR'
            } else {
                let formData = {
                    img: this.img || this.selectedItem.img,
                    text: this.text || this.selectedItem.text,
                    author: this.author || this.selectedItem.author,
                    psId: this.selectedIndex
                };
                this.$emit("save", formData);
                this.submitStatus = 'PENDING'
                setTimeout(() => {
                    this.submitStatus = 'OK'
                }, 500)

            } 
            this.$root.$emit('bv::toggle::collapse', 'collapse-' + this.selectedIndex)
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
        }
    },
    mounted(){
        this.author = this.selectedItem.author;
        this.img = this.selectedItem.img;
        this.text = this.selectedItem.text;
    }
}
</script>