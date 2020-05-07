<template>
    <div>
        <WingHeader title="Praxissemester" @selectArchive="selectArchive" @addNew="addItem" />
        <EditPraxissemester v-if="showForm" :selectedItem="selectedItem" @save="saveInput" @cancel="cancelInput" />
        
        
        <LoadingSpinner v-if="!dataLoaded" />
        <draggable v-else-if="!displayArchive" v-model="praxissemester" group="praxissemester" @start="drag=true" @end="drag=false">
          <div v-for="data in praxissemester" v-bind:key="data.psId" class="list-group-item d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center drag-drop">
            <div>
              <font-awesome-icon icon="grip-vertical" class="mr-3 text-muted"/>
              {{data.author}}
            </div>
            <div class="d-flex">
              <div>
                  <button class="btn btn-outline-primary mx-1" @click="editItem(data)">
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
        </draggable>
        <draggable v-else v-model="archive" group="praxissemester-archive" @start="drag=true" @end="drag=false">
          <div v-for="data in archive" v-bind:key="data.psId" class="list-group-item d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center drag-drop">
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
import EditPraxissemester from '../components/EditPraxissemester'
import LoadingSpinner from '../components/LoadingSpinner'
import axios from "axios"
//import { Editor } from 'tiptap'
//import {Heading} from 'tiptap-extensions'


export default {
  name: 'Praxissemester',
  components: {
    WingHeader,
    EditPraxissemester,
    LoadingSpinner,
    draggable

    

  },
  data(){
    return{
        praxissemester: [],
        archive: [],
        displayArchive: false,
        showForm: false,
        selectedItem: {},
        psIndex: 0,
        dataLoaded: false
    }
  },
  


  computed: {
    dataToShow: function () {
            if(this.displayArchive === true){
                return this.archive;
            }
            return this.praxissemester;
        }
  },

  /*const: editor = new Editor({
  // other options omitted for brevity
  extensions: [
    // The editor will accept paragraphs and headline elements as part of its document schema.
    new Heading({
      levels: [1,2,3],
    }),
  ],
  }),*/

  methods: {

     saveJson: function(j){
       const postJson =j;
        this.$http.post('http://localhost:2019/WingSever/save',postJson);
    },

    archivJson: function(j){
        this.$http.post('http://localhost:2019/WingSever/save',{
            archivJson: j,
        });
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
                this.praxissemester.splice(this.praxissemester.indexOf(item), 1);

                this.archive.unshift(item);

                //saveJson(this.praxissemester);
                //this.archive.push(item);
                //archivJson(this.archivJson);

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
                this.praxissemester.unshift(item);
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
                }else{
                    this.praxissemester.splice(this.praxissemester.indexOf(item), 1);
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
    editItem: function(item){
        this.selectedItem = item;
        this.showForm = true;
    },
    /*saveInput: function(newItem){
        if(Object.keys(this.selectedItem).length === 0){
            newItem.psId = this.psIndex;
            this.psIndex++;
            this.praxissemester.unshift(newItem);
            this.displayArchive = false;
        }else{
            newItem.psId = this.selectedItem.psId;
            let foundIndex = this.praxissemester.findIndex(x => x.psId === newItem.psId);
            this.praxissemester[foundIndex] = newItem;
        }
        this.showForm = false;
        this.selectedItem = {};
    },*/
    cancelInput: function(){
        this.selectedItem = {};
        this.showForm = false;
    }
  },
  mounted() {
    axios.get("./data/praxissemester.json").then(
      response =>
        (this.praxissemester = response.data.berichte.map(item => {
          item.psId = this.psIndex;
          this.psIndex++;
          return item;
        }),
        this.dataLoaded = true
        )
    );
    axios.get("./data/archive/praxissemester.json").then(
      response =>
        (this.archive = response.data.berichte.map(item => {
          item.psId = this.psIndex;
          this.psIndex++;
          return item;
        }))
    );
  }
}
</script>

<style scoped>
  .drag-drop{
    cursor: move;
  }
</style>