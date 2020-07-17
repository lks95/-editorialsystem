<template>
    <div>
        <form @submit.prevent="submit"  class="pb-2 mb-3 mr-3">

            <div class="form-group">
                <label :for="'titleInput-' + this.selectedIndex">Titel:</label>
                <input type="text" class="form-control"  :id="'titleInput-' + this.selectedIndex" v-model.trim="publikation_title"  @input="updateTitle($event.target.value)">
            </div>

            <div class="form-group">
                <label :for="'subtitleInput-' + this.selectedIndex">Untertitel:</label>
                <input type="text" class="form-control" :id="'subtitleInput-' + this.selectedIndex" v-model.trim="publikation_subtitle" @input="updateSubtitle($event.target.value)">
            </div>

            <div class="form-group">
                <label :for="'textInput-' + this.selectedIndex">Text:</label>
                <textarea class="form-control" :id="'textInput-' + this.selectedIndex" rows="3" v-model.trim="publikation_title" @input="updateText($event.target.value)"></textarea>
            </div>

            <div class="form-group">
                <label :for="'authorInput-' + this.selectedIndex">Author:</label>
                <textarea class="form-control" :id="'authorInput-' + this.selectedIndex" rows="3" v-model.trim="publikation_author" @input="updateAuthor($event.target.value)"></textarea>
            </div>

            <div class="form-group">
                <label :for="'betreuerInput-' + this.selectedIndex">Betreuer:</label>
                <textarea class="form-control" :id="'betreuerInput-' + this.selectedIndex" rows="3" v-model.trim="publikation_betreuer" @input="updateBetreuer($event.target.value)"></textarea>
            </div>

            <div class="form-group">
                <label :for="'imgInput-' + this.selectedIndex">Bild:</label>
                <textarea class="form-control" :id="'imgInput-' + this.selectedIndex" rows="3" v-model.trim="img" @input="updateImg($event.target.value)"></textarea>
            </div>

            <div class="form-group">
                <label :for="'pdfInput-' + this.selectedIndex">Pdf:</label>
                <textarea class="form-control" :id="'pdfInput-' + this.selectedIndex" rows="3" v-model.trim="pdf" @input="updatePdf($event.target.value)"></textarea>
            </div>

            <div class="d-flex flex-row-reverse">
                <button type="submit" class="btn btn-primary" :disabled="submitStatus === 'PENDING'" >Speichern</button>
                <b-button class="mx-2" @click="resetForm">Abbrechen</b-button>
                <p class="typo__p" v-if="submitStatus === 'ERROR'">Please fill the form correctly.</p>
                <p class="typo__p" v-if="submitStatus === 'PENDING'">Sending...</p>
            </div>
        </form>
    </div>
</template>

<script>
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
        methods: {
            submit: function() {
                this.$v.$touch()

                    let formData = {
                        publikation_title: this.publikation_title || this.selectedItem.publikation_title,
                        publikation_subtitle: this.publikation_subtitle || this.selectedItem.publikation_subtitle,
                        publikation_text: this.publikation_text || this.selectedItem.publikation_text,
                        publikation_author: this.publikation_author || this.selectedItem.publikation_author,
                        publikation_betreuer: this.publikation_betreuer || this.selectedItem.publikation_betreuer,
                        img: this.img || this.selectedItem.img,
                        pdf: this.pdf || this.selectedItem.pdf,
                        pId: this.selectedIndex
                    }
                    this.$emit("save", formData);
                    this.submitStatus = 'PENDING'
                    setTimeout(() => {
                        this.submitStatus = 'OK'
                    }, 500);
                this.$root.$emit('bv::toggle::collapse', 'collapse-' + this.selectedIndex);
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

<style scoped>

</style>