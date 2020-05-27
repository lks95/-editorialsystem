<template>
    <div>
        <form id="addTermineForm" @submit.prevent="submit" class="pb-2 mb-3 mr-3 border-bottom">
            <div class="form-group" :class="{'form-group--error': $v.title.$error}">
                <label for="titleInput">Titel:</label>
                <input type="text" class="form-control" id="titleInput" v-model.trim="title" @input="updateHeadline($event.target.value)">
            </div>

            <div class="form-group" :class="{'form-group--error': $v.headline.$error}">
                <label for="headlineInput">Headline:</label>
                <input type="text" class="form-control" id="headlineInput" v-model.trim="headline" @input="updateTitleTermin($event.target.value)">
            </div>

            <div class="form-group" :class="{'form-group--error': $v.description.$error}">
                <label for="headlineInput">Beschreibung:</label>
                <input type="text" class="form-control" id="descriptionInput" v-model.trim="description" @input="updateDescription($event.target.value)">
            </div>

            <div class="form-group" :class="{'form-group--error': $v.time.$error}">
                <label for="timeInput">Zeit:</label>
                <input type="text" class="form-control" id="timeInput" v-model.trim="time" @input="updateTime($event.target.value)">
            </div>

            <div class="form-group" :class="{'form-group--error': $v.place.$error}">
                <label for="placeInput">Place:</label>
                <input type="text" class="form-control" id="placeInput" v-model.trim="place" @input="updatePlace($event.target.value)">
            </div>

            <div class="form-group" :class="{'form-group--error': $v.contact.$error}">
                <label for="contactInput">Kontakt:</label>
                <input type="text" class="form-control" id="contactInput" v-model.trim="contact" @input="updateContact($event.target.value)">
            </div>

            <div class="form-group" :class="{'form-group--error': $v.links.$error}">
                <label for="linkInput">Links:</label>
                <input type="text" class="form-control" id="linkInput" v-model.trim="links" @input="updatePlace($event.target.value)">
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
                date: '',
                time: '',
                place: '',
                contact: '',
                links: '',
                submitStatus: null,
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
                        date: this.date,
                        time: this.time,
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
            updateTime(value){
                this.time = value;
                this.$v.time.$touch();
            },
            updateDate(value){
                this.date = value;
                this.$v.date.$touch();
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
            }

        }
    }
</script>

<style scoped>

</style>