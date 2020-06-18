<template>
    <div>
        <form id="addTermineForm" @submit.prevent="submit" class="pb-2 mb-3 mr-3 border-bottom">
            <div class="form-group">
                <label for="titleInput">Titel:</label>
                <input type="text" class="form-control" id="titleInput" v-model.trim="title" @input="updateTitel($event.target.value)">
            </div>

            <div class="form-group">
                <label for="linkInput">Link:</label>
                <input type="text" class="form-control" id="linkInput" v-model.trim="link" @input="updateLink($event.target.value)">
            </div>

            <div class="form-group">
                <label for="descriptionInput">Linktext:</label>
                <input type="text" class="form-control" id="descriptionInput" v-model.trim="linkText" @input="updateLinktext($event.target.value)">
            </div>

            <label>Bild:</label>
            <div class="input-group">

                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroupFileAddon01">Upload</span>
                </div>
                <div class="custom-file">
                    <input v-on:change="img" @input="updateImg($event.target.value)" type="file" class="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01" >
                    <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
                </div>
            </div>

            <div class="form-group">
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
        name: "CreateNews",
        data(){
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
                        title: this.title,
                        link: this.link,
                        linkText: this.linkText,
                        img: this.img,
                        text: this.text,
                    };
                    this.$emit("save", formData);
                    this.submitStatus = 'PENDING'
                    setTimeout(() => {
                        this.submitStatus = 'OK'
                    }, 500)
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
            }
        }
    }
</script>
