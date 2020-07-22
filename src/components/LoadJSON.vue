<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 mr-3 border-bottom">
      <h1 class="h2">{{file}}</h1>
      <h2>Upload a File</h2>
            <div class="d-flex">
                <div class="btn-toolbar mb-2 mb-md-0">
                  
                    <div class="btn-group mr-2">
                        <div id="app"  v-cloak>
                            <input type="file"  class="btn btn-outline-primary mx-2" ref="myFile" />
                            <input type="submit" class="btn btn-primary" value="Upload File" @click="Upload()" />
                        </div>  
                        <b-button class="btn btn-outline-danger mx-1" @click="$emit('Download')" title="Load file">
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
        console.log('selected a file');
        console.log(this.$refs.myFile.files[0]);
      
      let file = this.$refs.myFile.files[0];
  this.$emit('update-cart', file);
}
   }
}
</script>