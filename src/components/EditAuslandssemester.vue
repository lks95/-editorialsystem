<template>
    <div>
        <form id="addForm" @submit.prevent="requestAdd" class="pb-2 mb-3 mr-3 border-bottom">
            <div class="form-group">
                <label for="titleInput">Titel:</label>
                <input type="text" class="form-control" id="titleInput" :value="selectedItem.bericht_title" @input="updateTitle">
            </div>
            <div class="form-group">
                <label for="authorInput">Autor:</label>
                <input type="text" class="form-control" id="authorInput" :value="selectedItem.bericht_author" @input="updateAuthor">
            </div>
            <div class="form-group">
                <label for="imgInput">Bild:</label>
                <input type="text" class="form-control" id="imgInput" :value="selectedItem.bericht_img" @input="updateImg">
            </div>
            <div class="form-group">
                <label for="positionInput">Position Titel:</label>
                <input type="text" class="form-control" id="positionInput" :value="selectedItem.bericht_title_position" @input="updatePosition">
            </div>
            <div class="form-group">
                <label for="textInput">Bericht:</label>
                <textarea class="form-control" id="textInput" rows="3" :value="selectedItem.bericht_text" @input="updateText"></textarea>
            </div>
            <div class="d-flex flex-row-reverse">
                <button type="submit" class="btn btn-primary">Speichern</button>
                <button class="btn btn-outline-secondary mx-2" @click="$emit('cancel')">Abbrechen</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'EditAuslandssemester',
    props: ["selectedItem"],
    data() {
        return{
            bericht_title: '',
            bericht_author: '',
            bericht_img: '',
            bericht_text: '',
            bericht_title_position: ''
        };
    },
    methods: {
        requestAdd: function() {
            let formData = {
                bericht_title: this.bericht_title || this.selectedItem.bericht_title,
                bericht_img: this.bericht_img || this.selectedItem.bericht_img,
                bericht_text: this.bericht_text || this.selectedItem.bericht_text,
                bericht_author: this.bericht_author || this.selectedItem.bericht_author,
                bericht_title_position: this.bericht_title_position || this.selectedItem.bericht_title_position
            };
            this.$emit("save", formData);
        },
        updateTitle(e){
            this.bericht_title = e.target.value;
        },
        updateText(e){
            this.bericht_text = e.target.value;
        },
        updateAuthor(e){
            this.bericht_author = e.target.value;
        },
        updateImg(e){
            this.bericht_img = e.target.value;
        },
        updatePosition(e){
            this.bericht_title_position = e.target.value;
        }
    }
}
</script>