<template>
    <div>
        <form id="addTermineForm" @submit.prevent="submit" class="pb-2 mb-3 mr-3 border-bottom">

        </form>
    </div>
</template>

<script>
    export default {
        name: "CreateTermine",
        data() {
            return {
                title: '',
                headline: '',
                description: '',
                date: '',
                time: '',
                place: '',
                contact: '',
                links: '',
                submitStatus: null,
            };
        },
        validations: {},
        methods: {
            submit: function () {
                this.$v.$touch()
                if(this.$v.$invalid()){
                    this.submitStatus = 'ERROR at submitting'
                } else {
                    let formData = {
                        title: this.title,
                        headline: this.headline,
                        description: this.description,
                        date: this.date,
                        time: this.time,
                        place: this.place,
                        contact: this.contact,
                        links: this.links
                    };
                    this.$emit("save", formData);
                    this.submitStatus = 'PENDING'
                    setTimeout(() => {
                        this.submitStatus = 'OK'
                    }, 500)
                }
            },

            updateTitleTermin(value){
                this.title = value;
                this.$v.title.$touch();
            },
            updateHeadline(value){
                this.headline = value;
                this.$v.headline.$touch();
            },
            updateDescription(value){
                this.description = value;
                this.$v.description.$touch();
            },
            updateTime(value){
                this.time = value;
                this.$v.time.$touch();
            },
            updateDate(value){
                this.date = value;
                this.$v.date.$touch();
            },
            updatePlace(value){
                this.place = value;
                this.$v.place.$touch();
            },
            updateContact(value){
                this.contact = value;
                this.$v.contact.$touch();
            },
            updateLinks(value){
                this.links = value;
                this.$v.links.$touch();
            }

        }
    }
</script>

<style scoped>

</style>