<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 mr-3">
      <h2>Datei hochladen</h2>
        <div class="d-flex">
            <div class="btn-toolbar pl-3 mb-2 mb-md-0">
                <div class="row mr-2">
                    <input type="file"  class="btn btn-outline-primary mx-2" ref="myFile" />
                    <input type="submit" class="btn btn-primary" value="Datei hochladen" @click="Upload()" />
                    <b-button class="mx-1" @click="$emit('Download')" title="Datei herunterladen">
                        <b-icon icon="download" aria-hidden="true"></b-icon>
                    </b-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LoadJSON',
    props: [ 'file' ],
    methods:{
        Upload() {
            let file = this.$refs.myFile.files[0];
            this.$emit('update-cart', file);
        }
    }
}
</script>