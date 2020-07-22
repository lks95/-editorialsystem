<template>
    <div>
        <form @submit.prevent="submit"  class="pb-2 mb-3 mr-3">

            <div class="form-group" :class="{'form-group--error': $v.id.$error}">
                <label :for="'idInput-' + this.selectedIndex">Id:</label>
                <input type="text" class="form-control"  :id="'idInput-' + this.selectedIndex" v-model.trim="id"  @input="updateId($event.target.value)">
            </div>
            <div class="error" v-if="!$v.id.required">Field is required</div>

            <div class="form-group" :class="{'form-group--error': $v.name.$error}">
                <label :for="'nameInput-' + this.selectedIndex">Name:</label>
                <input type="text" class="form-control"  :id="'nameInput-' + this.selectedIndex" v-model.trim="name"  @input="updateName($event.target.value)">
            </div>
            <div class="error" v-if="!$v.name.required">Field is required</div>

            <div class="form-group">
                <label :for="'phoneInput-' + this.selectedIndex">Telefon:</label>
                <input type="tel" class="form-control"  :id="'phoneInput-' + this.selectedIndex" v-model.trim="phone"  @input="updatePhone($event.target.value)">
            </div>
            
            <div class="form-group" :class="{'form-group--error': $v.mail.$error}">
                <label :for="'mailInput-' + this.selectedIndex">Email:</label>
                <input type="mail" class="form-control"  :id="'mailInput-' + this.selectedIndex" v-model.trim="mail"  @input="updateMail($event.target.value)">
            </div>
            <div class="error" v-if="!$v.mail.required">Field is required</div>

            <div class="form-group" :class="{'form-group--error': $v.room.$error}">
                <label :for="'roomInput-' + this.selectedIndex">Raum:</label>
                <input type="text" class="form-control"  :id="'roomInput-' + this.selectedIndex" v-model.trim="room"  @input="updateRoom($event.target.value)">
            </div>
            <div class="error" v-if="!$v.room.required">Field is required</div>

            <div class="form-group" :class="{'form-group--error': $v.job_title.$error}">
                <label :for="'jobTitle-' + this.selectedIndex">Berufsbezeichung:</label>
                <input type="text" class="form-control"  :id="'jobTitleInput-' + this.selectedIndex" v-model.trim="job_title"  @input="updateJobTitle($event.target.value)">
            </div>
            <div class="error" v-if="!$v.job_title.required">Field is required</div>

            <div class="form-group" :class="{'form-group--error': $v.text.$error}">
                <label :for="'textInput-' + this.selectedIndex">Text:</label>
                <input type="text" class="form-control"  :id="'textInput-' + this.selectedIndex" v-model.trim="text"  @input="updateText($event.target.value)">
            </div>
            <div class="error" v-if="!$v.text.maxLength">Text must have at most {{$v.text.$params.maxLength.max}} letters.</div>

            <div class="form-group" :class="{'form-group--error': $v.subject.$error}">
                <label :for="'subjectInput-' + this.selectedIndex">Fachgebiete:</label>
                <input type="text" class="form-control"  :id="'subjectInput-' + this.selectedIndex" v-model.trim="subject"  @input="updateSubject($event.target.value)">
            </div>
            <div class="error" v-if="!$v.subject.maxLength">Subject must have at most {{$v.subject.$params.maxLength.max}} letters.</div>

            <div class="form-group">
                <label :for="'timesInput-' + this.selectedIndex">Sprechzeiten:</label>
                <input type="text" class="form-control"  :id="'timesInput-' + this.selectedIndex" v-model.trim="times"  @input="updateTimes($event.target.value)">
            </div>

            <div class="form-group">
                <label :for="'focusInput-' + this.selectedIndex">Studienschwerpunkt:</label>
                <select class="form-control"  :id="'focusInput-' + this.selectedIndex" v-model.trim="focus"  @input="updateFocus($event.target.value)">
                    <option value=""> </option>
                    <option value="imp">Industrial Media Production</option>
                    <option value="dp">Digital Publishing Technologies</option>
                    <option value="mdm">Media Design Management</option>
                </select>
            </div>

            <div class="form-group" :class="{'form-group--error': $v.img.$error}">
                <label :for="'imgInput-' + this.selectedIndex">Bild:</label>
                <input type="text" class="form-control"  :id="'imgInput-' + this.selectedIndex" v-model.trim="img"  @input="updateImg($event.target.value)">
            </div>
            <div class="error" v-if="!$v.img.required">Field is required</div>

            <div class="d-flex flex-row-reverse">
                <button type="submit" class="btn btn-primary">Speichern</button>
                <b-button class="mx-2" @click="resetForm">Abbrechen</b-button>
                <p class="typo__p text-danger" v-if="submitStatus === 'ERROR'">Please fill the form correctly.</p>
            </div>
        </form>
    </div>
</template>

<script>
import {required, maxLength} from 'vuelidate/lib/validators'

export default {
    name: 'CreatePraxissemester',
    props: ["selectedItem", "selectedIndex"],
    data() {
        return{
            id: '',
            name: '',
            phone: '',
            mail: '',
            room: '',
            job_title: '',
            text: '',
            subject: '',
            times: '',
            focus: '',
            img: '',
            submitStatus: null,
        };
    },
    validations:{
        id: { required},
        name: { required},
        phone: {},
        mail: { required},
        room: { required},
        job_title: { required},
        text: {maxLength: maxLength(150)},
        subject: {maxLength: maxLength(100)},
        times: {},
        focus: {},
        img: { required}
    },
    methods: {
        submit: function() {
            this.$v.$touch();
            if (this.$v.$invalid || this.$v.maxLength) {
                this.submitStatus = 'ERROR';
            } else {
                let formData = {
                    id: this.id,
                    name: this.name,
                    phone: this.phone,
                    mail: this.mail,
                    room: this.room,
                    job_title: this.job_title,
                    text: this.text,
                    subject: this.subject,
                    times: this.times,
                    focus: this.focus,
                    img: this.img,
                    tId: this.selectedIndex
                };
                this.$emit("save", formData);
                this.submitStatus = 'OK';
            }
            this.$root.$emit('bv::toggle::collapse', 'collapse-' + this.selectedIndex);
        },
        updateId(value){
            this.id = value;
            this.$v.id.$touch();
        },
        updateName(value){
            this.name = value;
            this.$v.name.$touch();
        },
        updatePhone(value){
            this.phone = value;
            this.$v.phone.$touch();
        },
        updateMail(value){
            this.mail = value;
            this.$v.mail.$touch();
        },
        updateRoom(value){
            this.room = value;
            this.$v.room.$touch();
        },
        updateJobTitle(value){
            this.job_title = value;
            this.$v.job_title.$touch();
        },
        updateText(value){
            this.text = value;
            this.$v.text.$touch();
        },
        updateSubject(value){
            this.subject = value;
            this.$v.subject.$touch();
        },
        updateTimes(value){
            this.times = value;
            this.$v.times.$touch();
        },
        updateFocus(value){
            this.focus = value;
        },
        updateImg(value){
            this.img = value;
            this.$v.img.$touch();
        },
        resetForm(){
            this.id= this.selectedItem.id;
            this.name= this.selectedItem.name;
            this.phone= this.selectedItem.phone;
            this.mail= this.selectedItem.mail;
            this.room= this.selectedItem.room;
            this.job_title= this.selectedItem.job_title;
            this.text= this.selectedItem.text;
            this.subject= this.selectedItem.subject;
            this.times= this.selectedItem.times;
            this.focus= this.selectedItem.focus;
            this.img= this.selectedItem.img;
            this.$root.$emit('bv::toggle::collapse', 'collapse-' + this.selectedIndex);
        }
    },
    mounted(){
        this.resetForm();
    }
}
</script>