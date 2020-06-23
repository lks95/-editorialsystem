<template>
    <form id="addForm" @submit.prevent="submit"  class="pb-2 mb-3 mr-3 border-bottom">
        <div class="form-group" :class="{'form-group--error': $v.detail_media.$error}">
            <label for="detail_mediaInput">detail_media:</label>
            <ul>
                <li><label for="detail_img_srcInput">detail_img_src:</label>
                    <input type="text" class="form-control" id="detail_img_srcInput"  v-model.trim="detail_img_src" @input="updateDetailImgSrc($event.target.value)">
                </li>
                <li><label for="detail_img_altInput">detail_img_alt:</label>
                    <input type="text" class="form-control" id="detail_img_altInput"  v-model.trim="detail_img_alt" @input="updateDetailImgalt($event.target.value)">
                </li>
            </ul>
        </div>
        <div class="d-flex flex-row-reverse">
            <button type="submit" class="btn btn-primary" :disabled="submitStatus === 'PENDING'" >Speichern</button>
            <button class="btn btn-outline-secondary mx-2" @click="$emit('cancel')">Abbrechen</button>
            <p class="typo__p" v-if="submitStatus === 'ERROR'">Please fill the form correctly.</p>
            <p class="typo__p" v-if="submitStatus === 'PENDING'">Sending...</p>
        </div>
    </form>
</template>

<script>
import {required} from 'vuelidate/lib/validators'

export default {
     name: 'DetailMedia',
     data(){
         return{
             detail_media:[{
                detail_img_src: '',
                detail_img_alt: '',
            }],
            submitStatus: null, 
         };
     },
     validations:{
         detail_img_src: {required},
         detail_img_alt: {required},
     },
     methods: {
        submit: function() {
            this.$v.$touch()
            if (this.$v.$invalid || this.$v.minLength || this.$v.maxLength) {
                this.submitStatus = 'ERROR'
            } else {
                let formData = {
                    detail_img_src: this.detail_img_src,
                    detail_img_alt: this.detail_img_alt
                };
                this.$emit("save", formData);
                this.submitStatus = 'PENDING'
                setTimeout(() => {
                    this.submitStatus = 'OK'
                }, 500)
            } 
        },
        updateDetailImgSrc(value){
            this.detail_img_src = value;
            this.$v.detail_img_src.$touch();
        },
        updateDetailImgAlt(value){
            this.detail_img_alt = value;
            this.$v.detail_img_alt.$touch();
        },
     }
}

</script>