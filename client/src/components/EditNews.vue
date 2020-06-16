<template>
    <div>
        <form id="addTermineForm" @submit.prevent="submit" class="pb-2 mb-3 mr-3 border-bottom">
            <div class="form-group" :class="{'form-group--error': $v.title.$error}">
                <label for="titleInput">Titel:</label>
                <input type="text" class="form-control" id="titleInput" v-model.trim="title" @input="updateTitel($event.target.value)">
            </div>

            <div class="form-group" :class="{'form-group--error': $v.link.$error}">
                <label for="linkInput">Link:</label>
                <input type="text" class="form-control" id="linkInput" v-model.trim="link" @input="updateLink($event.target.value)">
            </div>

            <div class="form-group" :class="{'form-group--error': $v.linktext.$error}">
                <label for="descriptionInput">Linktext:</label>
                <input type="text" class="form-control" id="descriptionInput" v-model.trim="linkText" @input="updateLinktext($event.target.value)">
            </div>

            <div class="form-group" :class="{'form-group--error': $v.place.$error}">
                <label for="placeInput">Bild:</label>
                <input type="image" class="form-control" id="placeInput" v-model.trim="img" @input="updateImg($event.target.value)">
            </div>

            <div class="form-group" :class="{'form-group--error': $v.contact.$error}">
                <label for="textInput">Text:</label>
                <input type="text" class="form-control" id="textInput" v-model.trim="text" @input="updateText($event.target.value)">
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
        name: 'EditNews',
        props: ["selectedItem", "selectedIndex"],
        data() {
            return{
                title: '',
                link: '',
                linkText: '',
                img: '',
                text: '',
                submitStatus: null,
            };
        },
        methods: {
            submit: function() {
                this.$v.$touch()
                let formData = {
                        title: this.title || this.selectedItem.title,
                        link: this.link || this.selectedItem.link,
                        linkText: this.linkText || this.selectedItem.linkText,
                        img: this.img || this.selectedItem.img,
                        text: this.text || this.selectedItem.text,
                        nId: this.selectedIndex
                    };
                    this.$emit("save", formData);
                    this.submitStatus = 'PENDING'
                    setTimeout(() => {
                        this.submitStatus = 'OK'
                    }, 500)
                this.$root.$emit('bv::toggle::collapse', 'collapse-' + this.selectedIndex)
            },

            updateTitel(value){
                this.title = value;
                this.$v.title.$touch();
            },
            updateLinktext(value){
                this.linkText = value;
                this.$v.linkText.$touch();
            },
            updateLink(value){
                this.link = value;
                this.$v.link.$touch();
            },
            updateImg(value){
                this.img = value;
                this.$v.img.$touch();
            },
            updateText(value){
                this.text = value;
                this.$v.text.$touch();
            },

            resetForm(){
                this.title = this.selectedItem.title;
                this.link = this.selectedItem.link;
                this.linkText = this.selectedItem.linkText;
                this.img = this.selectedItem.img;
                this.text = this.selectedItem.text;
            }
        },
        mounted() {
            this.title = this.selectedItem.title;
            this.link = this.selectedItem.link;
            this.linkText = this.selectedItem.linkText;
            this.img = this.selectedItem.img;
            this.text = this.selectedItem.text;
        }
    }
</script>

<style scoped>

</style>