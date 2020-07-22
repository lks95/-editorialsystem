<template>
    <div>
        <form @submit.prevent="submit" class="pb-2 mb-3 mr-3 border-bottom">

            <div class="form-group" :class="{'form-group--error': $v.title.$error}">
                <label :for="'titleInput-' + this.selectedIndex">Titel</label>
                <input type="text" class="form-control" :id="'titleInput-' + this.selectedIndex" v-model.trim="title">
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
            </div>

            <div class="form-row" >
                <div class="form-group col-md-6" >
                    <label :for="`startdateInput-${selectedIndex}`">Start des Termins: (Datum)</label>
                    <input type="date" class="form-control" :id="`startdateInput-${selectedIndex}`" v-model="date.start" @input="updateStartdate($event.target.value)">
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
                <div class="error ml-2" v-if="!$v.contacts.required">Pflichtfeld</div>
            </div>

            <div class="form-group" >
                <label for='linksInput'>Link</label>
                <div class="form-group my-3 py-3" v-for=" (link, index) in links" :key="index">
                    <label :for="`linksHrefInput-${selectedIndex}-${index}`">Link eingeben</label>
                    <input type="text" class="form-control" :for="`linksHrefInput-${selectedIndex}-${index}`" v-model.trim="link.href" @input="updateLinksHref($event.target.value, index)">
                    <label :for="`linkstextInput-${selectedIndex}-${index}`">Beschreibender Text zu Link</label>
                    <input type="text" class="form-control" :id="`linkstextInput-${selectedIndex}-${index}`" v-model.trim="link.text" @input="updateLinksText($event.target.value, index)">
                </div>
                    <LoadLink title="Link" @addLink="addLink"  @popLink="popLink"/>
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
import LoadLink from './LoadLink'

export default {
    name: 'EditTermine',
    props: ["selectedItem", "selectedIndex", "team"],
    components: {
        Editor,
        Multiselect,
        LoadLink,
    },
    data() {
        return {
            title: '',
            headline: '',
            description: '',
            date:{
                start: '',
                end: '',
            },
            time:{
                start: '',
                end: '',
            },
            place: '',
            contacts: [],
            links: [],
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
                    date: this.date || this.selectedItem.date,
                    time: this.time || this.selectedItem.time,
                    place: this.place || this.selectedItem.place,
                    contacts: this.contacts || this.selectedItem.contacts,
                    links: this.links || this.selectedItem.links,
                    tid: this.selectedIndex
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
            console.log('1'+value);
            console.log(''+this.start);
            console.log('3'+this.date.start);
            
            this.date.start = value;
        },
        updateEnddate(value){
            this.date.end = value;
        },
        updateStarttime(value){
            this.start = value;
        },
        updateEndtime(value){
            this.end = value;
        },
        updatePlace(value){
            this.place = value;
            this.$v.place.$touch();
        },
        updateContacts(value){
            this.contacts = value;
            this.$v.contacts.$touch();
        },
        updateLinksHref(value, index){
            this.links[index].href = value;
        },
        updateLinksText(value, index){
            this.links[index].text = value;
           
        },
        resetForm() {
            this.title = this.selectedItem.title;
            this.headline = this.selectedItem.headline;
            this.description = this.selectedItem.description;
            this.date.start = this.selectedItem.date.start;
            this.date.end = this.selectedItem.enddate;
            this.time.start = this.selectedItem.time.start;
            this.time.end = this.selectedItem.time.end;
            this.place = this.selectedItem.place;
            this.contacts = this.selectedItem.contacts;
            this.links = this.selectedItem.links;
            this.$root.$emit('bv::toggle::collapse', 'collapse-' + this.selectedIndex);
            this.submitStatus = 'OK';
            },
            addLink: function(){
                this.links.push({ href: '', text: '', });
            },
            popLink: function(){
                this.links.pop();
            }, 
    },
    mounted() {
        this.title = this.selectedItem.title;
        this.headline = this.selectedItem.headline;
        this.description = this.selectedItem.description;
        this.date.start = this.selectedItem.date.start;
        this.date.end = this.selectedItem.date.end;
        this.time.start = this.selectedItem.time.start;
        this.time.end = this.selectedItem.time.end;
        this.place = this.selectedItem.place;
        this.contacts = this.selectedItem.contacts;
        this.links = this.selectedItem.links;
        if(this.links[0] ==null || this.links[0] ==undefined){
                this.links.push({ href: '', text: '', });
            }
    }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>