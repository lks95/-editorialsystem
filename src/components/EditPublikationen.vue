<template>
    <div>
        <form @submit.prevent="submit"  class="pb-2 mb-3 mr-3">

            <div class="form-group" :class="{'form-group--error': $v.publikation_title.$error}">
                <label :for="'titleInput-' + this.selectedIndex">Titel:</label>
                <input type="text" class="form-control"  :id="'titleInput-' + this.selectedIndex" v-model.trim="publikation_title"  @input="updateTitle($event.target.value)">
                <div class="error ml-2" v-if="!$v.publikation_title.required">Pflichtfeld</div>
                <div class="error ml-2 text-danger" v-if="!$v.publikation_title.minLength">Titel muss mindestens {{$v.publikation_title.$params.minLength.min}} Zeichen enthalten.</div>
            </div>

            <div class="form-group" :class="{'form-group--error': $v.publikation_subtitle.$error}">
                <label :for="'subtitleInput-' + this.selectedIndex">Untertitel:</label>
                <input type="text" class="form-control" :id="'subtitleInput-' + this.selectedIndex" v-model.trim="publikation_subtitle" @input="updateSubtitle($event.target.value)">
                <div class="error ml-2" v-if="!$v.publikation_subtitle.required">Pflichtfeld</div>
                <div class="error ml-2 text-danger" v-if="!$v.publikation_subtitle.minLength">Untertitel muss mindestens {{$v.publikation_subtitle.$params.minLength.min}} Zeichen enthalten.</div>
            </div>

            <div class="form-group" :class="{'form-group--error': $v.publikation_text.$error}">
                <label :for="'textInput-' + this.selectedIndex">Text:</label>
                <textarea class="form-control" :id="'textInput-' + this.selectedIndex" rows="3" v-model.trim="publikation_text" @input="updateText($event.target.value)"></textarea>
                <div class="error ml-2" v-if="!$v.publikation_text.required">Pflichtfeld</div>
                <div class="error ml-2 text-danger" v-if="!$v.publikation_text.minLength">Text muss mindestens {{$v.publikation_text.$params.minLength.min}} Zeichen enthalten.</div>
                <div class="error ml-2 text-danger" v-if="!$v.publikation_text.maxLength">Text darf maximal {{$v.publikation_text.$params.maxLength.max}} Zeichen enthalten.</div>
            </div>

            <div class="form-group" :class="{'form-group--error': $v.publikation_author.$error}">
                <label :for="'authorInput-' + this.selectedIndex">Autor:</label>
                <textarea class="form-control" :id="'authorInput-' + this.selectedIndex" rows="3" v-model.trim="publikation_author" @input="updateAuthor($event.target.value)"></textarea>
                <div class="error ml-2" v-if="!$v.publikation_author.required">Pflichtfeld</div>
                <div class="error ml-2 text-danger" v-if="!$v.publikation_author.minLength">Autor muss mindestens {{$v.publikation_author.$params.minLength.min}} Zeichen enthalten.</div>
            </div>

            <div class="form-group" :class="{'form-group--error': $v.publikation_betreuer.$error}">
                <label :for="'betreuerInput-' + this.selectedIndex">Betreuer:</label>
                <textarea class="form-control" :id="'betreuerInput-' + this.selectedIndex" rows="3" v-model.trim="publikation_betreuer" @input="updateBetreuer($event.target.value)"></textarea>
                <div class="error ml-2" v-if="!$v.publikation_betreuer.required">Pflichtfeld</div>
            </div>

            <div class="form-group" :class="{'form-group--error': $v.img.$error}">
                <label :for="'imgInput-' + this.selectedIndex">Bild:</label>
                <textarea class="form-control" :id="'imgInput-' + this.selectedIndex" rows="3" v-model.trim="img" @input="updateImg($event.target.value)"></textarea>
                <div class="error ml-2" v-if="!$v.img.required">Pflichtfeld</div>
            </div>

            <div class="form-group" :class="{'form-group--error': $v.pdf.$error}">
                <label :for="'pdfInput-' + this.selectedIndex">Pdf:</label>
                <textarea class="form-control" :id="'pdfInput-' + this.selectedIndex" rows="3" v-model.trim="pdf" @input="updatePdf($event.target.value)"></textarea>
                <div class="error ml-2" v-if="!$v.pdf.required">Pflichtfeld</div>
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
    import {maxLength, minLength, required} from "vuelidate/lib/validators";

    export default {
        name: "EditPublikationen",
        props: ["selectedItem", "selectedIndex"],
        data() {
            return{
                publikation_title: '',
                publikation_subtitle: '',
                publikation_text: '',
                publikation_author: '',
                publikation_betreuer: '',
                img: '',
                pdf: '',
                submitStatus: null,
            };
        },
        validations: {
            publikation_title: {required, minLength: minLength(3)},
            publikation_subtitle: {required, minLength: minLength(3)},
            publikation_text: {required, minLength: minLength(15), maxLength: maxLength(550)},
            publikation_author: {required, minLength: minLength(3)},
            publikation_betreuer: {required},
            img: {required},
            pdf: {required},
        },
        methods: {
            submit: function() {
                this.$v.$touch();
                if(this.$v.$invalid || this.$v.minLength || this.$v.maxLength){
                    this.submitStatus = 'ERROR';
                } else {
                    let formData = {
                        publikation_title: this.publikation_title || this.selectedItem.publikation_title,
                        publikation_subtitle: this.publikation_subtitle || this.selectedItem.publikation_subtitle,
                        publikation_text: this.publikation_text || this.selectedItem.publikation_text,
                        publikation_author: this.publikation_author || this.selectedItem.publikation_author,
                        publikation_betreuer: this.publikation_betreuer || this.selectedItem.publikation_betreuer,
                        img: this.img || this.selectedItem.img,
                        pdf: this.pdf || this.selectedItem.pdf,
                        pId: this.selectedIndex
                    };
                    this.$emit("save", formData);
                    this.submitStatus = 'OK';
                    this.$root.$emit('bv::toggle::collapse', 'collapse-' + this.selectedIndex);
                }
            },
            updateTitle(value){
                this.publikation_title = value;
                this.$v.publikation_title.$touch();
            },
            updateSubtitle(value){
                this.publikation_subtitle = value;
                this.$v.publikation_subtitle.$touch();
            },
            updateText(value){
                this.publikation_text = value;
                this.$v.publikation_text.$touch();
            },
            updateAuthor(value){
                this.publikation_author = value;
                this.$v.publikation_author.$touch();
            },
            updateBetreuer(value){
                this.publikation_betreuer = value;
                this.$v.publikation_betreuer.$touch();
            },
            updateImg(value){
                this.img = value;
                this.$v.img.$touch();
            },
            updatePdf(value){
                this.pdf = value;
                this.$v.pdf.$touch();
            },
            resetForm(){
                this.publikation_title= this.selectedItem.publikation_title;
                this.publikation_subtitle= this.selectedItem.publikation_subtitle;
                this.publikation_text= this.selectedItem.publikation_text;
                this.publikation_author= this.selectedItem.publikation_author;
                this.publikation_betreuer= this.selectedItem.publikation_betreuer;
                this.img= this.selectedItem.img;
                this.pdf= this.selectedItem.pdf;
                this.$root.$emit('bv::toggle::collapse', 'collapse-' + this.selectedIndex);
                this.submitStatus = 'OK';
            }
        },
        mounted(){
            this.publikation_title= this.selectedItem.publikation_title;
            this.publikation_subtitle= this.selectedItem.publikation_subtitle;
            this.publikation_text= this.selectedItem.publikation_text;
            this.publikation_author= this.selectedItem.publikation_author;
            this.publikation_betreuer= this.selectedItem.publikation_betreuer;
            this.img= this.selectedItem.img;
            this.pdf= this.selectedItem.pdf;
        }
    }
</script>