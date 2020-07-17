<template>
    <div>
        <form @submit.prevent="submit" class="pb-2 mb-3 mr-3 border-bottom">

            <div class="form-group" >
                <label :for="'titleInput-' + this.selectedIndex">Titel</label>
                <input type="text" class="form-control" :id="'titleInput-' + this.selectedIndex" v-model.trim="title" @input="updateHeadline($event.target.value)">
            </div>

            <div class="form-group">
                <label :for="'headlineInput-' + this.selectedIndex">Überschrift</label>
                <input type="text" class="form-control" :id="'headlineInput-' + this.selectedIndex" v-model.trim="headline" @input="updateTitleTermin($event.target.value)">
            </div>

            <div class="form-group">
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
                    @input="updateDescription($event.target.value)"
                    :id="'descriptionInput-' + this.selectedIndex"
                />
            </div>

            <div class="form-row">
                <div class="form-group col-md-6">
                    <label :for="'starttimeInput-' + this.selectedIndex">Beginn des Termins</label>
                    <input type="time" class="form-control" :id="'starttimeInput-' + this.selectedIndex" v-model.trim="starttime" @input="updateStarttime($event.target.valueAsDate)">
                </div>
                <div class="form-group col-md-6">
                    <label :for="'endtimeInput-' + this.selectedIndex">Ende des Termins</label>
                    <input type="time" class="form-control" :id="'endtimeInput-' + this.selectedIndex" v-model.trim="endtime" @input="updateEndtime($event.target.value)">
                </div>
                <div class="form-group col-md-6">
                    <label :for="'startdateInput-' + this.selectedIndex">Start des Termins</label>
                    <input type="date" class="form-control" :id="'startdateInput-' + this.selectedIndex" v-model="startdate" @input="updateStartdate($event.target.value)">
                </div>
                <div class="form-group col-md-6">
                    <label :for="'enddateInput-' + this.selectedIndex">Ende des Termins</label>
                    <input type="date" class="form-control" :id="'enddateInput-' + this.selectedIndex" v-model.trim="enddate" @input="updateEnddate($event.target.value)">
                </div>
            </div>

            <div class="form-group">
                <label :for="'placeInput-' + this.selectedIndex">Ort</label>
                <input type="text" class="form-control" :id="'placeInput-' + this.selectedIndex" v-model.trim="place" @input="updatePlace($event.target.value)">
            </div>

            <div class="form-group">            
                <label :for="'contactInput-' + this.selectedIndex">Kontakt:</label>
                <multiselect 
                    v-model="contact" 
                    :id="'contactInput-' + this.selectedIndex"
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


            <div class="form-group">
                <label :for="'linkInput-' + this.selectedIndex">Links</label>
                <div class="d-flex">
                    <input type="text" class="form-control mr-1" :id="'linkInput-' + this.selectedIndex" v-model.trim="links" @input="updateLinks($event.target.value)">
                    <button size="sm" class="btn btn-secondary">
                        <b-icon icon="plus-circle"></b-icon>
                    </button>
                </div>
                <!--
                <label for="linkInput">Links:</label>
                <input type="text" class="form-control" id="linkInput" v-model.trim="links" @input="updateLinks($event.target.value)">-->
            </div>

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
            startdate: '',
            enddate: '',
            starttime: '',
            endtime: '',
            place: '',
            contact: [],
            links: '',
            submitStatus: null,
        };
    },

    methods: {
        submit: function() {
            this.$v.$touch()

            let formData = {
                title: this.title || this.selectedItem.title,
                headline: this.headline || this.selectedItem.headline,
                description: this.description || this.selectedItem.description,
                startdate: this.startdate || this.selectedItem.startdate,
                enddate: this.enddate || this.selectedItem.enddate,
                starttime: this.starttime || this.selectedItem.starttime,
                endtime: this.endtime || this.selectedItem.endtime,
                place: this.place || this.selectedItem.place,
                contact: this.contact || this.selectedItem.contact,
                links: this.links  || this.selectedItem.links,
                nId: this.selectedIndex
            };
            this.$emit("save", formData);
            this.submitStatus = 'PENDING'
            setTimeout(() => {
                this.submitStatus = 'OK'
            }, 500)

            this.$root.$emit('bv::toggle::collapse', 'collapse-' + this.selectedIndex)
        },
        updateTitleTermin(value){
             this.title = value;
             this.$v.title.$touch();
        },
        updateHeadline(value){
             this.headline = value;
             this.$v.headline.$touch();
        },
        updateDescription(value){
            this.description = value;
            this.$v.description.$touch();
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
        updateContact(value){
            this.contact = value;
            this.$v.contact.$touch();
        },
        updateLinks(value){
            this.links = value;
            this.$v.links.$touch();
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
            this.contact = this.selectedItem.contact;
            this.links = this.selectedItem.links
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
        this.contact = this.selectedItem.contact;
        this.links = this.selectedItem.links;
    }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>