<template>
    <div>
        <form id="addForm" @submit.prevent="submit"  class="pb-2 mb-3 mr-3 border-bottom">

            <div class="form-group" :class="{'form-group--error': $v.id.$error}">
                <label for="idInput">Id:</label>
                <input type="text" class="form-control"  id="idInput" v-model.trim="id"  @input="updateId($event.target.value)">
            </div>
            <div class="error" v-if="!$v.id.required">Field is required</div>

            <div class="form-group" :class="{'form-group--error': $v.name.$error}">
                <label for="nameInput">Name:</label>
                <input type="text" class="form-control"  id="nameInput" v-model.trim="name"  @input="updateName($event.target.value)">
            </div>
            <div class="error" v-if="!$v.name.required">Field is required</div>

            <div class="form-group">
                <label for="phoneInput">Telefon:</label>
                <input type="tel" class="form-control"  id="phoneInput" v-model.trim="phone"  @input="updatePhone($event.target.value)">
            </div>
            
            <div class="form-group" :class="{'form-group--error': $v.mail.$error}">
                <label for="mailInput">Email:</label>
                <input type="mail" class="form-control"  id="mailInput" v-model.trim="mail"  @input="updateMail($event.target.value)">
            </div>
            <div class="error" v-if="!$v.mail.required">Field is required</div>

            <div class="form-group" :class="{'form-group--error': $v.room.$error}">
                <label for="roomInput">Raum:</label>
                <input type="text" class="form-control"  id="roomInput" v-model.trim="room"  @input="updateRoom($event.target.value)">
            </div>
            <div class="error" v-if="!$v.room.required">Field is required</div>

            <div class="form-group" :class="{'form-group--error': $v.job_title.$error}">
                <label for="jobTitle">Berufsbezeichung:</label>
                <input type="text" class="form-control"  id="jobTitleInput" v-model.trim="job_title"  @input="updateJobTitle($event.target.value)">
            </div>
            <div class="error" v-if="!$v.job_title.required">Field is required</div>

            <div class="form-group" :class="{'form-group--error': $v.text.$error}">
                <label for="textInput">Text:</label>
                <input type="text" class="form-control"  id="textInput" v-model.trim="text"  @input="updateText($event.target.value)">
            </div>
            <div class="error" v-if="!$v.text.maxLength">Text must have at most {{$v.text.$params.maxLength.max}} letters.</div>

            <div class="form-group" :class="{'form-group--error': $v.subject.$error}">
                <label for="subjectInput">Fachgebiete:</label>
                <input type="text" class="form-control"  id="subjectInput" v-model.trim="subject"  @input="updateSubject($event.target.value)">
            </div>
            <div class="error" v-if="!$v.subject.maxLength">Subject must have at most {{$v.subject.$params.maxLength.max}} letters.</div>

            <div class="form-group">
                <label for="timesInput">Sprechzeiten:</label>
                <input type="text" class="form-control"  id="timesInput" v-model.trim="times"  @input="updateTimes($event.target.value)">
            </div>

            <div class="form-group">
                <label for="focusInput">Studienschwerpunkt:</label>
                <select class="form-control"  id="focusInput" v-model.trim="focus"  @input="updateFocus($event.target.value)">
                    <option value="" selected> </option>
                    <option value="imp">Industrial Media Production</option>
                    <option value="dp">Digital Publishing Technologies</option>
                    <option value="mdm">Media Design Management</option>
                </select>
            </div>

            <div class="form-group" :class="{'form-group--error': $v.img.$error}">
                <label for="imgInput">Bild:</label>
                <input type="text" class="form-control"  id="imgInput" v-model.trim="img"  @input="updateImg($event.target.value)">
            </div>
            <div class="error" v-if="!$v.img.required">Field is required</div>

            <div class="d-flex flex-row-reverse">
                <button type="submit" class="btn btn-primary" :disabled="submitStatus === 'PENDING'" >Speichern</button>
                <button class="btn btn-outline-secondary mx-2" @click="$emit('cancel')">Abbrechen</button>
                <p class="typo__p" v-if="submitStatus === 'ERROR'">Please fill the form correctly.</p>
                <p class="typo__p" v-if="submitStatus === 'PENDING'">Sending...</p>
            </div>
        </form>
    </div>
</template>

<script>
import {required, maxLength} from 'vuelidate/lib/validators'

export default {
    name: 'CreatePraxissemester',
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
        mail: { required},
        room: { required},
        job_title: { required},
        text: {maxLength: maxLength(150)},
        subject: {maxLength: maxLength(100)},
        img: { required}
    },
    methods: {
        submit: function() {
            this.$v.$touch()
            if (this.$v.$invalid || this.$v.maxLength) {
                this.submitStatus = 'ERROR'
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
                };
                this.$emit("save", formData);
                this.submitStatus = 'PENDING'
                setTimeout(() => {
                    this.submitStatus = 'OK'
                }, 500)
            } 
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
            this.$v.focus.$touch();
        },
        updateImg(value){
            this.img = value;
            this.$v.img.$touch();
        },
    }
}
</script>