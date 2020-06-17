<template>
    <div>
        <form id="addForm" @submit.prevent="submit"  class="pb-2 mb-3 mr-3">
           <div class="form-group" :class="{'form-group--error': $v.study.$error}">
                <label for="studyInput">study:</label>
                <input type="text" class="form-control"  id="studyInput" v-model.trim="category"  @input="updateStudy($event.target.value)">
            </div>
             <div class="error" v-if="!$v.study.required">Field is required</div>

            <div class="form-group" :class="{'form-group--error': $v.category.$error}">
                <label for="categoryInput">category:</label>
                <input type="text" class="form-control"  id="categoryInput" v-model.trim="category"  @input="updateCategory($event.target.value)">
            </div>
             <div class="error" v-if="!$v.category.required">Field is required</div>
           
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
            
             <div class="form-group" :class="{'form-group--error': $v.intro_img_alt.$error}">
                <label for="intro_img_altInput">Bild Alternativtext:</label>
                <input type="text" class="form-control" id="intro_img_altInput" v-model.trim="intro_img_alt" @input="updateImgAlt($event.target.value)">
            </div>
            <div class="error" v-if="!$v.intro_img_alt.required">Field is required</div>

            <div class="form-group" :class="{'form-group--error': $v.detail_headline.$error}">
                <label for="detail_headlineInput">Detail Headline:</label>
                <input type="text" class="form-control" id="detail_headlineInput"  v-model.trim="detail_headline" @input="updateDetailHeadline($event.target.value)">
            </div>
            <div class="error" v-if="!$v.detail_headline.required">Field is required</div>
            <div class="error" v-if="!$v.detail_headline.minLength">Text must have at least {{$v.detail_headline.$params.minLength.min}} letters.</div>
           
           <div class="form-group" :class="{'form-group--error': $v.detail_header_img_src.$error}">
                <label for="detail_header_img_srcInput">detail_header_img_src:</label>
                <input type="text" class="form-control" id="detail_header_img_srcInput" v-model.trim="detail_header_img_src" @input="updateDetailHeaderImgSrc($event.target.value)">
            </div>
            <div class="error" v-if="!$v.detail_header_img_src.required">Field is required</div>

            <div class="form-group" :class="{'form-group--error': $v.detail_header_img_alt.$error}">
                <label for="detail_header_img_altInput">detail_header_img_alt:</label>
                <input type="text" class="form-control" id="detail_header_img_altInput" v-model.trim="detail_header_img_alt" @input="updateDetailHeaderImgAlt($event.target.value)">
            </div>
            <div class="error" v-if="!$v.detail_header_img_alt.required">Field is required</div>

            <div class="form-group" :class="{'form-group--error': $v.detail_header_intro.$error}">
                <label for="detail_header_introInput">detail_header_intro:</label>
                <input type="text" class="form-control" id="detail_header_introInput"  v-model.trim="detail_header_intro" @input="updateDetailHeaderIntro($event.target.value)">
            </div>
            <div class="error" v-if="!$v.detail_header_intro.required">Field is required</div>
            <div class="error" v-if="!$v.detail_header_intro.minLength">Text must have at least {{$v.detail_header_intro.$params.minLength.min}} letters.</div>
           
           <div class="form-group" :class="{'form-group--error': $v.detail_text.$error}">
                <label for="detail_textInput">detail_text:</label>
                <textarea class="form-control" id="detail_textInput" rows="3" v-model.trim="detail_text" @input="updateDetailText($event.target.value)"></textarea>
            </div>
            <div class="error" v-if="!$v.detail_text.required">Field is required</div>
            <div class="error" v-if="!$v.detail_text.minLength">Text must have at least {{$v.detail_text.$params.minLength.min}} letters.</div>
           
           <div class="form-group" :class="{'form-group--error': $v.date.$error}">
                <label for="dateInput">date:</label>
                <input class="form-control" id="dateInput" v-model.trim="date" @input="updateDate($event.target.value)">
            </div>
            <div class="error" v-if="!$v.date.required">Field is required</div>

            <div class="form-group" :class="{'form-group--error': $v.contacts.$error}">
                <label for="contactsInput">Kontakte:</label>
                <input class="form-control" id="contactsInput" v-model.trim="date" @input="updateContacts($event.target.value)">
            </div>
            <div class="error" v-if="!$v.contacts.required">Field is required</div>

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
    name: 'EditProjekte',
    props: ["selectedItem", "selectedIndex"],
    data() {
        return{
             study: '',
            category: '',
            intro_title: '',
            intro_text: '',
            intro_img_src: '',
            intro_img_alt: '',
            detail_headline: '',
            detail_header_img_src: '',
            detail_header_img_alt:'',
            detail_header_intro: '',
            detail_text: '',
            //detail_media: '',
            date: '',
            contacts: '',
            submitStatus: null,
        };
    },
    validations:{
        study: {required},
        category: {required},
        intro_title: { required, minLength: minLength(3)},
        intro_img_src: { required },
        intro_text: { required, minLength: minLength(15), maxLength: maxLength(550) },
        intro_img_alt: {required},
        detail_headline: {required, minLength: minLength(3)},
        detail_header_img_src: {required},
        detail_header_img_alt:{ required},
        detail_header_intro:{required, minLength: minLength(3)},
        detail_text:{required, minLength: minLength(3)},
        date:{required},
        contacts: {required },
    },
    methods: {
        submit: function() {
            this.$v.$touch()
            if (this.$v.$invalid || this.$v.minLength || this.$v.maxLength) {
                this.submitStatus = 'ERROR'
            } else {
                let formData = {
                    study: this.study || this.selectedItem.study,
                    category: this.category || this.selectedItem.category,
                    intro_title: this.intro_title || this.selectedItem.intro_title,
                    intro_img_src: this.intro_img_src || this.selectedItem.intro_img_src,
                    intro_text: this.intro_text || this.selectedItem.intro_text,
                    intro_img_alt: this.intro_img_alt || this.selectedItem.intro_img_alt,
                    detail_headline: this.detail_headline || this.selectedItem.detail_headline,
                    detail_header_img_src: this.detail_header_img_src || this.selectedItem.detail_header_img_src,
                    detail_header_img_alt: this.detail_header_img_alt || this.selectedItem.detail_header_img_alt,
                    detail_header_intro: this.detail_header_intro || this.selectedItem.detail_header_intro,
                    detail_text: this.detail_text || this.selectedItem.detail_text,
                    date: this.date || this.selectedItem.date,
                    contacts: this.contacts || this.selectedItem.img,

                    prId: this.selectedIndex
                };
                this.$emit("save", formData);
                this.submitStatus = 'PENDING'
                setTimeout(() => {
                    this.submitStatus = 'OK'
                }, 500)

            } 
            this.$root.$emit('bv::toggle::collapse', 'collapse-' + this.selectedIndex)
        },

        updateCategeory(value){
            this.category = value;
            this.$v.category.$touch();
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
        },
        updateImgAlt(value){
            this.intro_img_alt = value;
            this.$v.intro_img_alt.$touch();
        },
        updateDetailHeadline(value){
            this.detail_headline = value;
            this.$v.detail_headline.$touch();
        },
        updateDetailHeaderImgSrc(value){
            this.detail_header_img_src = value;
            this.$v.detail_header_img_src.$touch();
        },
        updateDetailHeaderImgAlt(value){
            this.detail_header_img_alt = value;
            this.$v.detail_header_img_alt.$touch();
        },
        updateDetailHeaderIntro(value){
            this.detail_header_intro = value;
            this.$v.detail_header_intro.$touch();
        },
        updateDetailText(value){
            this.detail_text = value;
            this.$v.detail_text.$touch();
        },
        updateDate(value){
            this.date = value;
            this.$v.date.$touch();
        },
        updateContacts(value){
            this.contacts = value;
            this.$v.contacts.$touch();
        },
        resetForm(){
            this.study= this.selectedItem.study;
            this.category= this.selectedItem.category;
            this.intro_title= this.selectedItem.intro_title;
            this.intro_img_src= this.selectedItem.intro_img_src;
            this.intro_text= this.selectedItem.intro_text;
            this.intro_img_alt = this.selectedItem.intro_img_alt;
            this.detail_headline= this.selectedItem.detail_headline;
            this.detail_header_img_src= this.selectedItem.detail_header_img_src;
            this.detail_header_img_alt= this.selectedItem.detail_header_img_alt;
            this.detail_header_intro = this.selectedItem.detail_header_intro;
            this.detail_text= this.selectedItem.detail_text
            //detail_media: '',
            this.date = this.selectedItem.date;
            this.contacts = this.selectedItem.contacts;
        }
    },
    mounted(){
         this.study= this.selectedItem.study;
            this.category= this.selectedItem.category;
            this.intro_title= this.selectedItem.intro_title;
            this.intro_img_src= this.selectedItem.intro_img_src;
            this.intro_text= this.selectedItem.intro_text;
            this.intro_img_alt = this.selectedItem.intro_img_alt;
            this.detail_headline= this.selectedItem.detail_headline;
            this.detail_header_img_src= this.selectedItem.detail_header_img_src;
            this.detail_header_img_alt= this.selectedItem.detail_header_img_alt;
            this.detail_header_intro = this.selectedItem.detail_header_intro;
            this.detail_text= this.selectedItem.detail_text
            //detail_media: '',
            this.date = this.selectedItem.date;
            this.contacts = this.selectedItem.contacts;
    }
}
</script>