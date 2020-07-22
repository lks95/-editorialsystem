<template>
    <div>
        <form @submit.prevent="submit" class="pb-2 mb-3 mr-3 border-bottom">

            <div class="form-group" :class="{'form-group--error': $v.title.$error}">
                <label :for="'titleInput-' + this.selectedIndex">Titel</label>
                <input type="text" class="form-control" :id="'titleInput-' + this.selectedIndex" v-model.trim="title" @input="updateTitleTermin($event.target.value)">
                <div class="error ml-2" v-if="!$v.title.required">Pflichtfeld</div>
                <div class="error ml-2" v-if="!$v.title.minLength">Titel muss mindestens {{$v.title.$params.minLength.min}} Zeichen enthalten.</div>
            </div>

            <div class="form-group" :class="{'form-group--error': $v.headline.$error}">
                <label :for="'headlineInput-' + this.selectedIndex">Überschrift</label>
                <input type="text" class="form-control" :id="'headlineInput-' + this.selectedIndex" v-model.trim="headline" @input="updateHeadline($event.target.value)">
                <div class="error ml-2" v-if="!$v.headline.required">Pflichtfeld</div>
            </div>

            <div class="form-group" >
                <label :for="'descriptionInput-' + this.selectedIndex">Beschreibung</label>
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
                    :id="'descriptionInput-' + this.selectedIndex"
                />
                <div class="error ml-2" v-if="!$v.description.required">Pflichtfeld</div>
            </div>

            <div class="form-row" >
                <div class="form-group col-md-6">
                    <label :for="'startdateInput-' + this.selectedIndex">Start des Termins: (Datum)</label>
                    <input type="date" class="form-control" :id="'startdateInput-' + this.selectedIndex" v-model="date.start" @input="updateStartdate($event.target.value)">
                </div>
                <div class="form-group col-md-6">
                    <label :for="'enddateInput-' + this.selectedIndex">Ende des Termins: (Datum)</label>
                    <input type="date" class="form-control" :id="'enddateInput-' + this.selectedIndex" v-model.trim="date.end" @input="updateEnddate($event.target.value)">
                </div>
            </div>

            <div class="form-row">
                <div class="form-group col-md-6">
                    <label :for="'starttimeInput-' + this.selectedIndex">Beginn des Termins: (Uhrzeit)</label>
                    <input type="time" class="form-control" :id="'starttimeInput-' + this.selectedIndex" v-model.trim="time.start" @input="updateStarttime($event.target.valueAsDate)">
                </div>
                <div class="col">
                    <label :for="'endtimeInput-' + this.selectedIndex">Ende des Termins: (Uhrzeit)</label>
                    <input type="time" class="form-control" :id="'endtimeInput-' + this.selectedIndex" v-model.trim="time.end" @input="updateEndtime($event.target.value)">
                </div>
            </div>

            <div class="form-group" :class="{'form-group--error': $v.place.$error}">
                <label :for="'placeInput-' + this.selectedIndex">Ort</label>
                <input type="text" class="form-control" :id="'placeInput-' + this.selectedIndex" v-model.trim="place" @input="updatePlace($event.target.value)">
                <div class="error ml-2" v-if="!$v.place.required">Pflichtfeld</div>
            </div>

            <div class="form-group" :class="{'form-group--error': $v.contacts.$error}">
                <label :for="'contactsInput-' + this.selectedIndex">Kontakt:</label>
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
                <label >Link</label>
                 <label :for="'linksHrefInput-' + this.selectedIndex">Link eingeben</label>
                <input type="text" class="form-control" :id="'linksHrefInput-' + this.selectedIndex" v-model.trim="links.href" @input="updateLinksHref($event.target.value)">
                <label :for="'linksTextInput-' + this.selectedIndex">Beschreibender Text zu Link</label>
                <input type="text" class="form-control" :id="'linkstextInput-' + this.selectedIndex" v-model.trim="links.text" @input="updateLinksText($event.target.value)">
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
import Editor from '@tinymce/tinymce-vue'
import Multiselect from 'vue-multiselect'
import {minLength, required} from "vuelidate/lib/validators";

export default {
    name: 'EditTermine',
    props: ["selectedItem", "selectedIndex", "team"],
    components: {
        Editor,
        Multiselect
    },
    data() {
        return {
            title: '',
            headline: '',
            description: '',
            date:[{
                startdate: '',
                enddate: '',
            }],
            time:[{
                starttime: '',
                endtime: '',
            }],
            place: '',
            contacts: [],
            links: [{
                href: '',
                text: '',
            }],
            submitStatus: null,
        };
    },
    validations: {
        title: {required, minLength: minLength(3)},
        headline: {required},
        place: {required},
        contacts: {required},
    },
    methods: {
        submit: function() {
            this.$v.$touch();
            if(this.$v.$invalid || this.$v.minLength || this.$v.maxLength){
                this.submitStatus = 'ERROR';
            } else {
                let formData = {
                    title: this.title || this.selectedItem.title,
                    headline: this.headline || this.selectedItem.headline,
                    description: this.description || this.selectedItem.description,
                    startdate: this.startdate || this.selectedItem.startdate,
                    enddate: this.enddate || this.selectedItem.enddate,
                    starttime: this.starttime || this.selectedItem.starttime,
                    endtime: this.endtime || this.selectedItem.endtime,
                    place: this.place || this.selectedItem.place,
                    contacts: this.contacts || this.selectedItem.contacts,
                    links: this.links || this.selectedItem.links,
                    nId: this.selectedIndex
                };
                this.$emit("save", formData);
                this.submitStatus = 'OK';
                this.$root.$emit('bv::toggle::collapse', 'collapse-' + this.selectedIndex);
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
        updateLinksHref(value){
            this.links.href = value;
            this.$v.links.href.$touch();
        },
        updateLinksText(value){
            this.links.text = value;
            this.$v.links.text.$touch();
        },
        resetForm() {
            this.title = this.selectedItem.title;
            this.headline = this.selectedItem.headline;
            this.description = this.selectedItem.description;
            this.startdate = this.selectedItem.startdate;
            this.enddate = this.selectedItem.enddate;
            this.starttime = this.selectedItem.starttime;
            this.endtime = this.selectedItem.endtime;
            this.place = this.selectedItem.place;
            this.contacts = this.selectedItem.contacts;
            this.links = this.selectedItem.links;
            this.$root.$emit('bv::toggle::collapse', 'collapse-' + this.selectedIndex);
            this.submitStatus = 'OK';
        }
    },
    mounted() {
        this.title = this.selectedItem.title;
        this.headline = this.selectedItem.headline;
        this.description = this.selectedItem.description;
        this.startdate = this.selectedItem.date.start;
        this.enddate = this.selectedItem.date.end;
        this.starttime = this.selectedItem.time.start;
        this.endtime = this.selectedItem.time.end;
        this.place = this.selectedItem.place;
        this.contacts = this.selectedItem.contacts;
        this.links = this.selectedItem.links;
    }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>