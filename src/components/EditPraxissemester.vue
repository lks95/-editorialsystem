<template>
    <div>
        <form id="addForm" @submit.prevent="requestAdd" class="pb-2 mb-3 mr-3 border-bottom">
            <div class="form-group">
                <label for="authorInput">Autor:</label>
                <input type="text" class="form-control" id="authorInput" v-model="formData.author">
            </div>
            <div class="form-group">
                <label for="imgInput">Bild:</label>
                <input type="text" class="form-control" id="imgInput" v-model="formData.img">
            </div>
            <div class="form-group">
                <label for="textInput">Bericht:</label>
                <textarea class="form-control" id="textInput" rows="3" v-model="formData.text"></textarea>
            </div>
            <div class="d-flex flex-row-reverse">
                <button type="submit" class="btn btn-primary">Speichern</button>
                <button class="btn btn-outline-secondary mx-2" @click="$emit('cancelEdit')">Abbrechen</button>
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
            formData: [],
        };
    },
    methods: {
        requestAdd: function() {
            this.formData = {
                img: this.formData.img,
                text: this.formData.text,
                author: this.formData.author
            };
            this.$emit("add", this.formData);
            this.formData = [];
        }
    },
    mounted(){
        this.formData = this.selectedItem;
    }
}
</script>