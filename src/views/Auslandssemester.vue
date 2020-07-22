<template>
    <div>
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 mr-3 border-bottom">
            <h2>Upload a File</h2>
            <div class="d-flex">
                <div class="btn-toolbar mb-2 mb-md-0">
                    <div class="btn-group mr-2">
                        <div id="app"  v-cloak>
                            <input type="file"  class="btn btn-outline-primary mx-2" ref="myFile" @change="selectedFile">
                            <input type="submit" class="btn btn-primary" value="Upload File" />
                        </div>  
                        <b-button class="btn btn-outline-danger mx-1" @click="confirmDownload()" title="Load file">
                        <b-icon icon="download" aria-hidden="true"></b-icon>
                        </b-button>
                    </div>
                </div>
            </div>
        </div>
        <WingHeader title="Auslandssemester" @selectArchive="selectArchive" @addNew="addItem" />
        <CreateAuslandssemester v-if="showForm" @save="saveNew" @cancel="cancelNew" />
        <LoadingSpinner v-if="!dataLoaded" />
        <draggable v-else-if="!displayArchive" v-model="auslandssemester" group="auslandssemester" @start="drag=true" @end="drag=false;" handle=".handle" @change="saveToBackend()">
          <div v-for="data in auslandssemester" v-bind:key="data.asId" class="list-group-item">
            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center handle">
              <div>
                <font-awesome-icon icon="grip-vertical" class="mr-3 text-muted"/>
                {{data.bericht_title}}
              </div>
              <div class="d-flex">
                <div>
                    <button v-b-toggle="'collapse-' + data.asId" variant="primary" class="btn btn-outline-primary mx-1">
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
            <b-collapse :id="'collapse-' + data.asId" class="border-top mt-3">
                <EditAuslandssemester :selectedItem="data" :selectedIndex="data.asId"  @save="updateItem" />
            </b-collapse>
          </div>
        </draggable>
        <draggable v-else v-model="archive" group="auslandssemester-archive" @start="drag=true" @end="drag=false" @change="saveArchiveToBackend()">
          <div v-for="data in archive" v-bind:key="data.asId" class="list-group-item d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center drag-drop">
            <div>
              <font-awesome-icon icon="grip-vertical" class="mr-3 text-muted"/>
              {{data.bericht_title}}
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
import EditAuslandssemester from '../components/EditAuslandssemester'
import CreateAuslandssemester from '../components/CreateAuslandssemester'
import LoadingSpinner from '../components/LoadingSpinner'
import axios from "axios"


export default {
  name: 'Auslandssemester',
  components: {
    WingHeader,
    EditAuslandssemester,
    CreateAuslandssemester,
    LoadingSpinner,
    draggable
  },
  data(){
    return{
        auslandssemester: [],
        archive: [],
        displayArchive: false,
        showForm: false,
        selectedItem: {},
        asIndex: 0,
        dataLoaded: false,
        file: [],
        FileR: null,
        }
  },
  computed: {
    dataToShow: function () {
            if(this.displayArchive === true){
                return this.archive;
            }
            return this.auslandssemester;
        }
  },
  methods: {
    saveToBackend: function(){
       axios.post('http://localhost:5000/api/auslandssemester', {"berichte": this.auslandssemester})
       .then((res)=>{
         this.auslandssemester = res.data.berichte;
       })
    },
    saveArchiveToBackend: function(){
       axios.post('http://localhost:5000/api/auslandssemester/archive', {"berichte": this.archive})
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
                this.auslandssemester.splice(this.auslandssemester.indexOf(item), 1);
                this.archive.unshift(item);
                this.saveToBackend();
                this.saveArchiveToBackend();
              }
          })
          .catch(err => {
            console.error(err);
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
                this.auslandssemester.unshift(item);
                this.saveToBackend();
                this.saveArchiveToBackend();
              }
          })
          .catch(err => {
            console.error(err);
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
                    this.auslandssemester.splice(this.auslandssemester.indexOf(item), 1);
                    this.saveToBackend();
                }
            }
        })
        .catch(err => {
            console.error(err);
        })
    },
    confirmDownload: function(){
        const data = JSON.stringify(this.auslandssemester)
        const blob = new Blob([data], {type: 'text/plain'})
        const e = document.createEvent('MouseEvents'),
          a = document.createElement('a');
          a.download = "auslandssemester.json";
          a.href = window.URL.createObjectURL(blob);
          a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
          e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
          a.dispatchEvent(e);
    },
   selectedFile() {
      let file = this.$refs.myFile.files[0];
      if(!file || file.type !== 'application/json') return;
      
     
      let reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      
      reader.onload =  evt => {
        let text = evt.target.result;
        try {
          this.auslandssemester = JSON.parse(text);
           this.saveToBackend();
           this.$refs.myFile.value = '';
       
        } catch(e) {
          alert("Sorry, your file doesn't appear to be valid JSON data.");
        }
      }
      
      reader.onerror = evt => {
        console.error(evt);
      }
      
    },
    selectArchive: function(archiveSelected){
        this.displayArchive = archiveSelected;
    },
    addItem: function(){
        this.showForm = true;
    },
    saveNew: function(newItem){
        newItem.asId = this.asIndex;
        this.asIndex++;
        this.auslandssemester.unshift(newItem);
        this.displayArchive = false;
        this.showForm = false;
        this.selectedItem = {};
        this.saveToBackend();
    },
    cancelNew: function(){
        this.showForm = false;
    },
    updateItem: function(item){
      let foundIndex = this.auslandssemester.findIndex(x => x.asId === item.asId);
      this.auslandssemester[foundIndex].bericht_title = item.bericht_title;
      this.auslandssemester[foundIndex].bericht_img = item.bericht_img;
      this.auslandssemester[foundIndex].bericht_text = item.bericht_text;
      this.auslandssemester[foundIndex].bericht_author = item.bericht_author;
      this.saveToBackend();
    }
  },
  mounted() {
    axios.get("http://localhost:5000/api/auslandssemester").then(
      response =>
        (this.auslandssemester = response.data.berichte.map(item => {
          item.asId = this.asIndex;
          this.asIndex++;
          return item;
        }),
         this.dataLoaded = true
         )
    );
    axios.get("http://localhost:5000/api/auslandssemester/archive").then(
      response =>
        (this.archive = response.data.berichte.map(item => {
          item.asId = this.asIndex;
          this.asIndex++;
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