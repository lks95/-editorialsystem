<template>
    <div>
        <form id="addForm" @submit.prevent="requestAdd" class="pb-2 mb-3 mr-3 border-bottom">
            <div class="form-group">
                <label for="authorInput">Autor:</label>
                <input type="text" class="form-control" id="authorInput" :value="selectedItem.author" @input="updateAuthor">
            </div>
            <div class="form-group">
                <label for="imgInput">Bild:</label>
                <input type="text" class="form-control" id="imgInput" :value="selectedItem.img" @input="updateImg">
            </div>
            <div class="form-group">
                <label for="textInput">Bericht:</label>
                <textarea class="form-control" id="textInput" rows="3" :value="selectedItem.text" @input="updateText"></textarea>
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
    name: 'EditPraxissemester',
    props: ["selectedItem"],
    data() {
        return{
            author: '',
            img: '',
            text: ''
        };
    },
    methods: {
        requestAdd: function() {
            let formData = {
                img: this.img || this.selectedItem.img,
                text: this.text || this.selectedItem.text,
                author: this.author || this.selectedItem.author,
            };
            this.$emit("save", formData);
        },
        updateText(e){
            this.text = e.target.value;
        },
        updateAuthor(e){
            this.author = e.target.value;
        },
        updateImg(e){
            this.img = e.target.value;
        }
    }
}
</script>