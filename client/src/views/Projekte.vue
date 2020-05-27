<template>
    <div>
        <WingHeader title="Projekte" @selectArchive="selectArchive" @addNew="addItem" />
        <CreateProjekte v-if="showForm" @save="saveNew" @cancel="cancelNew" />
        <LoadingSpinner v-if="!dataLoaded" />
        <draggable v-else-if="!displayArchive" v-model="projekte" group="projekte" @start="drag=true" @end="drag=false;" handle=".handle" @change="saveToBackend()">
          <div v-for="data in projekte" v-bind:key="data.prId" class="list-group-item">
            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center handle">
              <div>
                <font-awesome-icon icon="grip-vertical" class="mr-3 text-muted"/>
                {{data.author}}
              </div>
              <div class="d-flex">
                <div>
                    <button v-b-toggle="'collapse-' + data.prId" variant="primary" class="btn btn-outline-primary mx-1">
                        <font-awesome-icon icon="edit" />
                    </button>
                    <button class="btn btn-outline-warning mx-1" @click="confirmArchive(data)" >
                        <font-awesome-icon icon="archive" />
                    </button>
                    <button class="btn btn-outline-danger mx-1" @click="confirmDelete(data)" >
                        <font-awesome-icon icon="trash" />
                    </button>
                </div>
              </div>
            </div>
            <b-collapse :id="'collapse-' + data.prId" class="border-top mt-3">
                <EditProjekte :selectedItem="data" :selectedIndex="data.prId"  @save="updateItem" />
            </b-collapse>
          </div>
        </draggable>
        <draggable v-else v-model="archive" group="projekte-archive" @start="drag=true" @end="drag=false" @change="saveArchiveToBackend()">
          <div v-for="data in archive" v-bind:key="data.prId" class="list-group-item d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center drag-drop">
            <div>
              <font-awesome-icon icon="grip-vertical" class="mr-3 text-muted"/>
              {{data.author}}
            </div>
            <div class="d-flex">
              <div>
                  <button class="btn btn-outline-warning mx-1" @click="restoreFromArchive(data)" >
                      <font-awesome-icon icon="undo" />
                  </button>
                  <button class="btn btn-outline-danger mx-1" @click="confirmDelete(data)" >
                      <font-awesome-icon icon="trash" />
                  </button>
                  
              </div>
            </div>
          </div>
        </draggable>
    </div>
</template>

<script>
import draggable from 'vuedraggable'
import WingHeader from '../components/WingHeader'
import EditProjekte from '../components/EditProjekte'
import CreateProjekte from '../components/CreateProjekte'
import LoadingSpinner from '../components/LoadingSpinner'
import axios from "axios"

export default {
  name: 'Projekte',
  components: {
    WingHeader,
    CreateProjekte,
    EditProjekte,
    LoadingSpinner,
    draggable
  },
  data(){
    return{
        projekte: [],
        archive: [],
        displayArchive: false,
        showForm: false,
        selectedItem: {},
        prIndex: 0,
        dataLoaded: false
    }
  },
  computed: {
    dataToShow: function () {
            if(this.displayArchive === true){
                return this.archive;
            }
            return this.projekte;
        }
  },
  methods: {
     saveToBackend: function(){
       axios.post('http://localhost:5000/api/projekte', {"berichte": this.projekte})
       .then((res)=>{
         this.projekte = res.data.berichte;
       })
    },
    saveArchiveToBackend: function(){
       axios.post('http://localhost:5000/api/projekte/archive', {"berichte": this.archive})
       .then((res)=>{
         this.archive = res.data.berichte;
       })
    },
    confirmArchive: function(item) {
        this.$bvModal.msgBoxConfirm('Ausgewähltes Element archivieren?', {
          title: 'Archivieren bestätigen',
          okVariant: 'warning',
          cancelTitle: 'Abbrechen',
          hideHeaderClose: true,
          centered: true
        })
          .then(value => {
              if(value){
                this.projekte.splice(this.projekte.indexOf(item), 1);
                this.archive.unshift(item);
                this.saveToBackend();
                this.saveArchiveToBackend();
              }
          })
          .catch(err => {
            console.log(err);
          })
    },
    restoreFromArchive: function(item){
        this.$bvModal.msgBoxConfirm('Ausgewähltes Element wiederherstellen?', {
          title: 'Wiederherstellung bestätigen',
          okVariant: 'warning',
          cancelTitle: 'Abbrechen',
          hideHeaderClose: true,
          centered: true
        })
          .then(value => {
              if(value){
                this.archive.splice(this.archive.indexOf(item), 1);
                this.projekte.unshift(item);
                this.saveToBackend();
                this.saveArchiveToBackend();
              }
          })
          .catch(err => {
            console.log(err);
          })
    },
    confirmDelete: function(item){
        this.$bvModal.msgBoxConfirm('Ausgewähltes Element unwiderruflich löschen?', {
          title: 'Löschen bestätigen',
          okVariant: 'danger',
          cancelTitle: 'Abbrechen',
          hideHeaderClose: true,
          centered: true
        })
        .then(value => {
            if(value){
                if(this.displayArchive){
                    this.archive.splice(this.archive.indexOf(item), 1);
                    this.saveArchiveToBackend();
                }else{
                    this.projekte.splice(this.projekte.indexOf(item), 1);
                    this.saveToBackend();
                }
            }
        })
        .catch(err => {
            console.log(err);
        })
    },
    selectArchive: function(archiveSelected){
        this.displayArchive = archiveSelected;
    },
    addItem: function(){
        this.showForm = true;
    },
    saveNew: function(newItem){
        newItem.prId = this.prIndex;
        this.prIndex++;
        this.projekte.unshift(newItem);
        this.displayArchive = false;
        this.showForm = false;
        this.selectedItem = {};
        this.saveToBackend();
    },
    cancelNew: function(){
        this.showForm = false;
    },
    updateItem: function(item){
      let foundIndex = this.projekte.findIndex(x => x.prId === item.prId);
      this.projekte[foundIndex].img = item.img;
      this.projekte[foundIndex].text = item.text;
      this.projekte[foundIndex].author = item.author;
      this.saveToBackend();
    }
  },
  mounted() {
    axios.get("http://localhost:5000/api/projekte").then(
      response =>
        (this.projekte = response.data.berichte.map(item => {
          item.prId = this.prIndex;
          this.prIndex++;
          return item;
        }),
        this.dataLoaded = true
        )
    );
    axios.get("http://localhost:5000/api/projekte/archive").then(
      response =>
        (this.archive = response.data.berichte.map(item => {
          item.prId = this.prIndex;
          this.prIndex++;
          return item;
        }))
    );
  }
}
</script>

<style scoped>
  .handle{
    cursor: move;
  }
</style>