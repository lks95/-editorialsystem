<template>
    <div>
        <form id="addTermineForm" @submit.prevent="submit" class="pb-2 mb-3 mr-3 border-bottom">
            <div class="form-group">
                <label for="titleInput">Titel:</label>
                <input type="text" class="form-control" id="titleInput" v-model.trim="title" @input="updateHeadline($event.target.value)">
            </div>

            <div class="form-group">
                <label for="headlineInput">Headline:</label>
                <input type="text" class="form-control" id="headlineInput" v-model.trim="headline" @input="updateTitleTermin($event.target.value)">
            </div>

            <div class="form-group">
                <label for="descriptionInput">Beschreibung:</label>
                <input type="text" class="form-control" id="descriptionInput" v-model.trim="description" @input="updateDescription($event.target.value)">
            </div>

            <div class="form-row">
                <div class="col">
                    <label for="startdateInput">Start des Termins:</label>
                    <input type="date" class="form-control" id="startdateInput" v-model.trim="startdate" @input="updateStartdate($event.target.value)">
                </div>
                <div class="col">
                    <label for="enddateInput">Ende des Termins:</label>
                    <input type="date" class="form-control" id="enddateInput" v-model.trim="enddate" @input="updateEnddate($event.target.value)">
                </div>
            </div>

            <div class="form-row">
                <div class="col">
                    <label for="starttimeInput">Beginn des Termins:</label>
                    <input type="time" class="form-control" id="starttimeInput" v-model.trim="starttime" @input="updateStarttime($event.target.value)">
                </div>
                <div class="col">
                    <label for="endtimeInput">Ende des Termins:</label>
                    <input type="time" class="form-control" id="endtimeInput" v-model.trim="endtime" @input="updateEndtime($event.target.value)">
                </div>
            </div>

            <div class="form-group">
                <label for="placeInput">Ort:</label>
                <input type="text" class="form-control" id="placeInput" v-model.trim="place" @input="updatePlace($event.target.value)">
            </div>

            <div class="form-group">
                <label for="contactInput">Kontakt:</label>
                <input type="text" class="form-control" id="contactInput" v-model.trim="contact" @input="updateContact($event.target.value)">
            </div>

<div>
    <table class="table">
        <thead>
            <tr>
                    <div class="form-group">
                        <label for="linkInput">Links:</label>
                        <div class="d-flex">
                            <input class="form-control mr-1" id="linkInput" v-model.trim="links" @input="updateLinks($event.target.value)">
                            <button class="btn btn-secondary" onclick="addLink()">+</button>
                        </div>
                    </div>
            </tr>
        </thead>
        <tbody>

        <tr v-for="(row, index) in linkrows" :key="index.id">
                    <td>
                        <input type="text" v-model="row.links">
                    </td>
                    <td>
                        <a v-on:click="removeLink(index)" style="cursor: pointer">-</a>
                    </td>
        </tr>


        </tbody>
    </table>
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
    export default {
        name: "CreateTermine",
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
                contact: '',
                links: '',
                submitStatus: null,
                linkrows: []
            };
        },
        validations: {},
        methods: {
            submit: function () {
                this.$v.$touch()
                if(this.$v.$invalid()){
                    this.submitStatus = 'ERROR at submitting'
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
                        contact: this.contact,
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
            addLink: function(){
                // eslint-disable-next-line no-unused-vars
                let elem = document.createElement('div');
                this.linkrows.push({
                    link: ""
                });
            },
            removeLink: function(index){
                this.linkrows.splice(index, 1);
            },


        }
    }
</script>

<style scoped>

</style>