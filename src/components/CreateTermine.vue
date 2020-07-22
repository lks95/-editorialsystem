<template>
    <div>
        <form id="addTermineForm" @submit.prevent="submit" class="pb-2 mb-3 mr-3 border-bottom">
            
            <div class="form-group" :class="{'form-group--error': $v.title.$error}">
                <label for="titleInput">Titel:</label>
                <input type="text" class="form-control" id="titleInput" v-model.trim="title" @input="updateTitleTermin($event.target.value)">
                <div class="error ml-2" v-if="!$v.title.required">Pflichtfeld</div>
                <div class="error ml-2" v-if="!$v.title.minLength">Titel muss mindestens {{$v.title.$params.minLength.min}} Zeichen enthalten.</div>
            </div>

            <div class="form-group" :class="{'form-group--error': $v.headline.$error}">
                <label for="headlineInput">Headline:</label>
                <input type="text" class="form-control" id="headlineInput" v-model.trim="headline" @input="updateHeadline($event.target.value)">
                <div class="error ml-2" v-if="!$v.headline.required">Pflichtfeld</div>
            </div>

            <div class="form-group" >
                <label for="descriptionInput">Beschreibung:</label>
                <Editor
                    :init="{
                        height: 500,
                        menubar : false, 
                        plugins: [
                            'advlist autolink lists link charmap preview anchor visualblocks code fullscreen table paste'
                        ],
                        toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link'
                    }"
                    v-model.trim="description"
                />
                <div class="error ml-2" v-if="!$v.description.required">Pflichtfeld</div>
                <div class="error ml-2" v-if="!$v.description.maxLength">Text darf maximal {{$v.description.$params.maxLength.max}} Zeichen enthalten.</div>
            </div>

            <div class="form-row">
                <div class="col" >
                    <label for="startdateInput">Start des Termins: (Datum)</label>
                    <input type="date" class="form-control" id="startdateInput" v-model.trim="date.start" @input="updateStartdate($event.target.value)">
                </div>
                <div class="col">
                    <label for="enddateInput">Ende des Termins: (Datum)</label>
                    <input type="date" class="form-control" id="enddateInput" v-model.trim="date.end" @input="updateEnddate($event.target.value)">
                </div>
            </div>

            <div class="form-row">
                <div class="col">
                    <label for="starttimeInput">Beginn des Termins: (Uhrzeit)</label>
                    <input type="time" class="form-control" id="starttimeInput" v-model.trim="time.start" @input="updateStarttime($event.target.value)">
                </div>
                <div class="col">
                    <label for="endtimeInput">Ende des Termins: (Uhrzeit)</label>
                    <input type="time" class="form-control" id="endtimeInput" v-model.trim="time.end" @input="updateEndtime($event.target.value)">
                </div>
            </div>
           

            <div class="form-group" :class="{'form-group--error': $v.place.$error}">
                <label for="placeInput">Ort:</label>
                <input type="text" class="form-control" id="placeInput" v-model.trim="place" @input="updatePlace($event.target.value)">
                <div class="error ml-2" v-if="!$v.place.required">Pflichtfeld</div>
            </div>

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
                <div class="error ml-2" v-if="!$v.contact.required">Pflichtfeld</div>
            </div>
            <div class="error" v-if="!$v.contacts.required">Field is required</div>

            <div class="form-group" >
                <label for='linksInput'>Link</label>
                <div>
                    <label >Link eingeben</label>
                    <input type="text" class="form-control" :id='linksHrefInput' v-model.trim="links.href" @input="updateLinksHref($event.target.value)">
                    <label >Beschreibender Text zu Link</label>
                    <input type="text" class="form-control" :id='linkstextInput' v-model.trim="links.text" @input="updateLinksText($event.target.value)">
                </div>
            </div>

            <div class="d-flex flex-row-reverse">
                <button type="submit" class="btn btn-primary">Speichern</button>
                <button class="btn btn-primary mx-2" @click="$emit('cancel')">Abbrechen</button>
                <p class="typo__p text-danger" v-if="submitStatus === 'ERROR'">Formular enthält noch Fehler.</p>
            </div>

        </form>
    </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
import Multiselect from 'vue-multiselect'

import {required, minLength/*, maxLength*/} from 'vuelidate/lib/validators'

    export default {
        name: "CreateTermine",
        props: ["team"],
        components: {
            Editor,
            Multiselect,
            
        },
        data() {
            return {
                title: '',
                headline: '',
                description: '',
                date:[{
                    start: '',
                    end: '',
                }],
                time:[{
                    start: '',
                    end: '',
                }],
                place: '',
                contacts: [],
                links: [{
                    href: '',
                    text: '',
                }],
                submitStatus: null,
                detail_media: [],
            };
        },
        validations: {
            title: {required, minLength: minLength(3)},
            headline: {required},
            place: {required},
            contacts: {required},
        },
        methods: {
            submit: function () {
                this.$v.$touch();
                if(this.$v.$invalid || this.$v.minLength || this.$v.maxLength){
                    this.submitStatus = 'ERROR';
                } else {
                    let formData = {
                        title: this.title,
                        headline: this.headline,
                        description: this.description,
                        date: this.date,
                        time: this.time,
                        place: this.place,
                        contacts: this.contacts,
                        links: this.links
                    };
                    this.$emit("save", formData);
                    this.submitStatus = 'OK';
                }
            },

            updateTitleTermin(value){
                this.title = value;
                this.$v.title.$touch();
            },
            updateHeadline(value){
                this.headline = value;
                this.$v.headline.$touch();
            },
            updateStartdate(value){
                
                this.date.start = value;
                console.log(this.date.start)
                this.$v.date.start.$touch();
            },
            updateEnddate(value){
                this.date.end = value;
                this.$v.date.end.$touch();
            },
            updateStarttime(value){
                this.time.start = value;
                this.$v.time.start.$touch();
            },
            updateEndtime(value){
                this.time.end = value;
                this.$v.time.end.$touch();
            },
            updatePlace(value){
                this.place = value;
                this.$v.place.$touch();
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
                this.detail_media.push({detail_img_src: '', detail_img_alt:'',});
            },
            popItemImg: function(){
                this.detail_media.pop();
            },
            updateLinksHref(value){
            this.links.href = value;
            this.$v.links.href.$touch();
            },
            updateLinksText(value){
                this.links.text = value;
                this.$v.links.text.$touch();
            },

        },
        mounted(){
            if(this.detail_media[0] ==null || this.detail_media[0] ==undefined){
                this.detail_media.push({detail_img_src: '', detail_img_alt:'',});
            }
        }
    }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>