<template>
    <div>
        <form @submit.prevent="submit"  class="pb-2 mb-3 mr-3">
           <div class="form-group" :class="{'form-group--error': $v.study.$error}">
                <label for="studyInput">Studiengang</label>
                <multiselect id="studyInput" v-model="study" :options="studyOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="Pick a study"></multiselect>
            </div>
             <div class="error" v-if="!$v.study.required">Field is required</div>

            <div class="form-group" :class="{'form-group--error': $v.category.$error}">
                <label for="categoryInput">Kategorie</label>
                <multiselect id="categoryInput" v-model="category" :multiple="true" :options="kategoryOptions" :searchable="false" :close-on-select="false" :show-labels="false" placeholder="Pick a category"></multiselect>
            </div>
            <div class="error" v-if="!$v.category.required">Field is required</div>
           
            <div class="form-group" :class="{'form-group--error': $v.intro_title.$error}">
                <label :for="'intro_titleInput-' + this.selectedIndex">Title:</label>
                <input type="text" class="form-control"  :id="'intro_titleInput-' + this.selectedIndex" v-model.trim="intro_title"  @input="updateTitle($event.target.value)">
            </div>
            <div class="error" v-if="!$v.intro_title.required">Field is required</div>
            <div class="error" v-if="!$v.intro_title.minLength">Author must have at least {{$v.intro_title.$params.minLength.min}} letters.</div>
            
            <div class="form-group" :class="{'form-group--error': $v.intro_img_src.$error}">
                <label :for="'intro_img_srcInput-' + this.selectedIndex">Bildname:</label>
                <input type="text" class="form-control" :id="'intro_img_srcInput-' + this.selectedIndex" v-model.trim="intro_img_src" @input="updateImgSrc($event.target.value)">
            </div>
            <div class="error" v-if="!$v.intro_img_src.required">Field is required</div>
            
            <div class="form-group" :class="{'form-group--error': $v.intro_text.$error}">
                <label :for="'intro_textInput-' + this.selectedIndex">Bericht:</label>
                <textarea class="form-control" :id="'intro_textInput-' + this.selectedIndex" rows="3" v-model.trim="intro_text" @input="updateText($event.target.value)"></textarea>
            </div>
            <div class="error" v-if="!$v.intro_text.required">Field is required</div>
            <div class="error" v-if="!$v.intro_text.minLength">Text must have at least {{$v.intro_text.$params.minLength.min}} letters.</div>
            <div class="error" v-if="!$v.intro_text.maxLength">Text must have at most {{$v.intro_text.$params.maxLength.max}} letters.</div>
            
             <div class="form-group" :class="{'form-group--error': $v.intro_img_alt.$error}">
                <label :for="'intro_img_altInput-' + this.selectedIndex">Bild Alternativtext:</label>
                <input type="text" class="form-control" :id="'intro_img_altInput-' + this.selectedIndex" v-model.trim="intro_img_alt" @input="updateImgAlt($event.target.value)">
            </div>
            <div class="error" v-if="!$v.intro_img_alt.required">Field is required</div>

            <div class="form-group" :class="{'form-group--error': $v.detail_headline.$error}">
                <label :for="'detail_headlineInput-' + this.selectedIndex">Detail Headline:</label>
                <input type="text" class="form-control" :id="'detail_headlineInput-' + this.selectedIndex"  v-model.trim="detail_headline" @input="updateDetailHeadline($event.target.value)">
            </div>
            <div class="error" v-if="!$v.detail_headline.required">Field is required</div>
            <div class="error" v-if="!$v.detail_headline.minLength">Text must have at least {{$v.detail_headline.$params.minLength.min}} letters.</div>
           
           <div class="form-group" :class="{'form-group--error': $v.detail_header_img_src.$error}">
                <label :for="'detail_header_img_srcInput-' + this.selectedIndex">detail_header_img_src:</label>
                <input type="text" class="form-control" :id="'detail_header_img_srcInput-' + this.selectedIndex" v-model.trim="detail_header_img_src" @input="updateDetailHeaderImgSrc($event.target.value)">
            </div>
            <div class="error" v-if="!$v.detail_header_img_src.required">Field is required</div>

            <div class="form-group" :class="{'form-group--error': $v.detail_header_img_alt.$error}">
                <label :for="'detail_header_img_altInput-' + this.selectedIndex">detail_header_img_alt:</label>
                <input type="text" class="form-control" :id="'detail_header_img_altInput-' + this.selectedIndex" v-model.trim="detail_header_img_alt" @input="updateDetailHeaderImgAlt($event.target.value)">
            </div>
            <div class="error" v-if="!$v.detail_header_img_alt.required">Field is required</div>

            <div class="form-group" :class="{'form-group--error': $v.detail_header_intro.$error}">
                <label :for="'detail_header_introInput-' + this.selectedIndex">detail_header_intro:</label>
                <input type="text" class="form-control" :id="'detail_header_introInput-' + this.selectedIndex"  v-model.trim="detail_header_intro" @input="updateDetailHeaderIntro($event.target.value)">
            </div>
            <div class="error" v-if="!$v.detail_header_intro.required">Field is required</div>
            <div class="error" v-if="!$v.detail_header_intro.minLength">Text must have at least {{$v.detail_header_intro.$params.minLength.min}} letters.</div>
           
           <div class="form-group" :class="{'form-group--error': $v.detail_text.$error}">
                <label :for="'detail_textInput-' + this.selectedIndex">detail_text:</label>
                <Editor
                    :init="{
                        height: 500,
                        menubar : false, 
                        plugins: [
                            'advlist autolink lists link charmap preview anchor visualblocks code fullscreen table paste'
                        ],
                        toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link'
                    }"
                    v-model.trim="detail_text"
                    @input="updateDetailText($event.target.value)"
                    :id="'detail_textInput-' + this.selectedIndex"
                    />
            </div>
            <div class="error" v-if="!$v.detail_text.required">Field is required</div>
            <div class="error" v-if="!$v.detail_text.minLength">Text must have at least {{$v.detail_text.$params.minLength.min}} letters.</div>
           
           <div class="form-group" :class="{'form-group--error': $v.contacts.$error}">
                <label for="contactsInput">Kontakt:</label>
                <multiselect 
                    v-model="contacts" 
                    deselect-label="Kontakt entfernen"
                    select-label="Kontakt auswählen"
                    selected-label="Ausgewählt"
                    placeholder="Bitte Kontakte auswählen" 
                    :multiple="true"
                    :options="team"
                    :searchable="true" 
                    :allow-empty="true"
                >
                </multiselect>
            </div>
            <div class="error" v-if="!$v.contacts.required">Field is required</div>

            <div class="form-group" :class="{'form-group--error': $v.date.$error}">
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label :for="'dateInput-' + this.selectedIndex">Datum</label>
                        <input type="date" class="form-control" :id="'dateInput-' + this.selectedIndex" v-model.trim="date" @input="updateDate($event.target.value)">
                    </div>
                </div>
            </div>
            <div class="error" v-if="!$v.date.required">Field is required</div>

            <div class="form-group" >
            <label for="detail_mediaInput">Weitere Bilder</label>
                <div class="form-group bm-3 mp-3">
                    
                    <div >
                        <div class="form-group my-3 py-3" v-for=" (media, index) in detail_media" :key="index">
                        <label>Detail media Src</label>
                        <input class="form-control" :id="'detail_mediaInput'"  v-model="media.detail_img_src" @input="updateDetailImgSrcI($event.target.value, index)"> 
                        <label>Detail media Alt</label>
                        <input class="form-control" :id="'detail_mediaInput'"  v-model="media.detail_img_alt" @input="updateDetailImgAltI($event.target.value, index)"> 
                    </div>
                    <LoadMedia title="Media" @addNewImg="addItemImg"  @popdNewImg="popItemImg"/>
                    </div>
                </div>
            </div>

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
import Editor from '@tinymce/tinymce-vue'
import Multiselect from 'vue-multiselect'
//import DetailMedia from './DetailMedia'
import LoadMedia from './LoadMedia'

export default {
    name: 'EditProjekte',
    props: ["selectedItem", "selectedIndex", "team"],
    components: {
        Editor,
        Multiselect,
        //DetailMedia,
        LoadMedia,
    },
    data() {
        return{
            study: '',
            studyOptions:['','imp','dp','mdm'],
            category: [],
            kategoryOptions: ['App','Web','Design', 'CMS', 'Print' , 'Social Media', 'Marketing'],
            intro_title: '',
            intro_text: '',
            intro_img_src: '',
            intro_img_alt: '',
            detail_headline: '',
            detail_header_img_src: '',
            detail_header_img_alt:'',
            detail_header_intro: '',
            detail_text: '',
            detail_media:[
            ],
            date: '',
            contacts: [],
            tIndex: 0,
            submitStatus: null,
            showFormImg: false,
            imgIndex: 0,
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
        //detail_img_src: {required},
        //detail_img_alt: {required},
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
                    detail_media: this.detail_media,
                    prId: this.selectedIndex
                };
                this.$emit("save", formData);
                this.submitStatus = 'PENDING'
                setTimeout(() => {
                    this.submitStatus = 'OK'
                }, 500);
            this.$root.$emit('bv::toggle::collapse', 'collapse-' + this.selectedIndex);
            } 
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
        updateDetailImgSrcI(value, index){
            this.detail_media.detail_img_src[index] = value;
            this.$v.detail_media.detail_img_src[index].$touch();
        },
        updateDetailImgAltI(value,index){
            this.detail_media.detail_img_alt[index] = value;
            this.$v.detail_media.detail_img_alt[index].$touch();
        },
        addItemImg: function(){
            this.detail_media.push({detail_img_src: '', detail_img_alt:'',})
        },
        popItemImg: function(){
            this.detail_media.pop()
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
            this.detail_text= this.selectedItem.detail_text;
            this.detail_media= this.selectedItem.detail_media;
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
            this.detail_text= this.selectedItem.detail_text;
            this.detail_media= this.selectedItem.detail_media;
            if(this.detail_media[0] ==null){
                this.detail_media.push({detail_img_src: '', detail_img_alt:''});
            }
            this.date = this.selectedItem.date;
            this.contacts = this.selectedItem.contacts;
    }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
