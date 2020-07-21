<template>
    <div>
        <form id="addTermineForm" @submit.prevent="submit" class="pb-2 mb-3 mr-3 border-bottom">
            <div class="form-group" :class="{'form-group--error': $v.title.$error}">
                <label for="titleInput">Titel:</label>
                <input type="text" class="form-control" id="titleInput" v-model.trim="title" @input="updateTitleTermin($event.target.value)">
            </div>
            <div class="error" v-if="!$v.title.required">Field is required</div>
            <div class="error" v-if="!$v.title.minLength">Title must have at least {{$v.title.$params.minLength.min}} letters.</div>

            <div class="form-group" :class="{'form-group--error': $v.headline.$error}">
                <label for="headlineInput">Headline:</label>
                <input type="text" class="form-control" id="headlineInput" v-model.trim="headline" @input="updateHeadline($event.target.value)">
            </div>
            <div class="error" v-if="!$v.headline.required">Field is required</div>

            <div class="form-group" :class="{'form-group--error': $v.description.$error}">
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
            </div>
            <div class="error" v-if="!$v.description.required">Field is required</div>
            <div class="error" v-if="!$v.description.maxLength">Text must have at most {{$v.description.$params.maxLength.max}} letters.</div>

            <div class="form-row">
                <div class="col" :class="{'form-group--error': $v.startdate.$error}">
                    <label for="startdateInput">Start des Termins: (Datum)</label>
                    <input type="date" class="form-control" id="startdateInput" v-model.trim="startdate" @input="updateStartdate($event.target.value)">
                </div>
                <div class="col">
                    <label for="enddateInput">Ende des Termins: (Datum)</label>
                    <input type="date" class="form-control" id="enddateInput" v-model.trim="enddate" @input="updateEnddate($event.target.value)">
                </div>
            </div>
            <div class="error" v-if="!$v.startdate.required">Startdate is required</div>


            <div class="form-row">
                <div class="col">
                    <label for="starttimeInput">Beginn des Termins: (Uhrzeit)</label>
                    <input type="time" class="form-control" id="starttimeInput" v-model.trim="starttime" @input="updateStarttime($event.target.value)">
                </div>
                <div class="col">
                    <label for="endtimeInput">Ende des Termins: (Uhrzeit)</label>
                    <input type="time" class="form-control" id="endtimeInput" v-model.trim="endtime" @input="updateEndtime($event.target.value)">
                </div>
            </div>


            <div class="form-group" :class="{'form-group--error': $v.place.$error}">
                <label for="placeInput">Ort:</label>
                <input type="text" class="form-control" id="placeInput" v-model.trim="place" @input="updatePlace($event.target.value)">
            </div>
            <div class="error" v-if="!$v.place.required">Field is required</div>

            <div class="form-group" :class="{'form-group--error': $v.contact.$error}">
                <label for="contactInput">Kontakt:</label>
                <multiselect 
                    v-model="contact" 
                    id="contactInput"
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
            <div class="error" v-if="!$v.contact.required">Field is required</div>

            <!--          <div class="form-group">
                            <label for="detail_mediaInput">Links</label>
                            <div>
                                <div class="form-group my-3 py-3" v-for=" (media, index) in detail_media" :key="index">
                                    <label>href</label>
                                    <input class="form-control" :id="'detail_mediaInput'"  v-model="media.detail_img_src" @input="updateDetailImgSrcI($event.target.value, index)">
                                    <label>Text</label>
                                    <input class="form-control" :id="'detail_mediaInput'"  v-model="media.detail_img_alt" @input="updateDetailImgAltI($event.target.value, index)">
                                </div>
                                <LoadMedia title="Media" @addNewImg="addItemImg"  @popdNewImg="popItemImg"/>
                            </div>
                        </div>
                    <div>
</div>-->


            <div class="d-flex flex-row-reverse">
                <button type="submit" class="btn btn-primary" :disabled="submitStatus === 'PENDING'">Speichern</button>
                <button class="btn btn-outline-primary mx-2" @click="$emit('cancel')">Abbrechen</button>
                <p class="typo__p" v-if="submitStatus === 'ERROR'">Fill Form correctly</p>
                <p class="typo__p" v-if="submitStatus === 'PENDING'">Sendet...</p>
            </div>

        </form>
    </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
import Multiselect from 'vue-multiselect'
//import LoadMedia from "./LoadMedia";
import {required, minLength, maxLength} from 'vuelidate/lib/validators'

    export default {
        name: "CreateTermine",
        props: ["team"],
        components: {
            Editor,
            Multiselect,
            //LoadMedia
        },
        data() {
            return {
                title: '',
                headline: '',
                description: '',
                startdate: '',
                enddate: '',
                starttime: '',
                endtime: '',
                place: '',
                contact: [],
                links: '',
                submitStatus: null,
                detail_media: [],
            };
        },
        validations: {
            title: {required, minLength: minLength(3)},
            headline: {required, minLength: minLength(3)},
            description: {required, maxLength: maxLength(300)},
            date: {required},
            time: {required},
            startdate: {required},
            enddate: {required},
            starttime: {required},
            endtime: {required},
            place: {required},
            contact: {required},
            links: {required}
        },
        methods: {
            submit: function () {
                this.$v.$touch()
                if(this.$v.$invalid || this.$v.minLength || this.$v.maxLength){
                    this.submitStatus = 'ERROR'
                } else {
                    let formData = {
                        title: this.title,
                        headline: this.headline,
                        description: this.description,
                        startdate: this.startdate,
                        enddate: this.enddate,
                        startime: this.starttime,
                        endtime: this.endtime,
                        place: this.place,
                        contacts: this.contacts,
                        links: this.links
                    };
                    this.$emit("save", formData);
                    this.submitStatus = 'PENDING'
                    setTimeout(() => {
                        this.submitStatus = 'OK'
                    }, 500)
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
                this.startdate = value;
                this.$v.startdate.$touch();
            },
            updateEnddate(value){
                this.enddate = value;
                this.$v.enddate.$touch();
            },
            updateStarttime(value){
                this.starttime = value;
                this.$v.starttime.$touch();
            },
            updateEndtime(value){
                this.endtime = value;
                this.$v.endtime.$touch();
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

        },
        mounted(){
            if(this.detail_media[0] ==null || this.detail_media[0] ==undefined){
                this.detail_media.push({detail_img_src: '', detail_img_alt:'',});
            }
        }
    }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>