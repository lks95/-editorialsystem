<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 mr-3 border-bottom">
      <h1 class="h2">{{title}}</h1>
      <div class="d-flex">
        <div class="btn-toolbar mb-2 mb-md-0">
          <div class="btn-group mr-2">
            <button class="btn btn-outline-secondary" @click="$emit('addNew')"><font-awesome-icon icon="plus"/></button>
            
          </div>
        </div>
          <div>
            <select class="form-control ml-3" v-model="selected" @change="select">
                  <option value="beitraege">Beiträge</option>
                  <option value="archiv">Archiv</option>
            </select>
          </div>
      </div>
    </div>
</template>

<script>
export default {
    name: 'WingHeader',
    props: [ 'title' ],
    methods: {
      select: function(){
        let archiveSelected = false;
        if(this.selected === 'beitraege'){
          archiveSelected = false;
        }else{
          archiveSelected = true;
        }
        this.$emit("selectArchive", archiveSelected);
      }
    },
    data(){
      return {
        selected: 'beitraege'
      }
    }
}
</script>