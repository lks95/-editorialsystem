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
        <WingHeader title="Praxissemester" @selectArchive="selectArchive" @addNew="addItem" />
        <CreatePraxissemester v-if="showForm" @save="saveNew" @cancel="cancelNew" />
        <LoadingSpinner v-if="!dataLoaded" />
        <draggable v-else-if="!displayArchive" v-model="praxissemester" group="praxissemester" @start="drag=true" @end="drag=false;" handle=".handle" @change="saveToBackend()">
          <div v-for="data in praxissemester" v-bind:key="data.psId" class="list-group-item">
            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center handle">
              <div>
                <font-awesome-icon icon="grip-vertical" class="mr-3 text-muted"/>
                {{data.author}}
              </div>
              <div class="d-flex">
                <div>
                    <button v-b-toggle="'collapse-' + data.psId" variant="primary" class="btn btn-outline-primary mx-1">
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
            <b-collapse :id="'collapse-' + data.psId" class="border-top mt-3">
                <EditPraxissemester :selectedItem="data" :selectedIndex="data.psId"  @save="updateItem" />
            </b-collapse>
          </div>
        </draggable>
        <draggable v-else v-model="archive" group="praxissemester-archive" @start="drag=true" @end="drag=false" @change="saveArchiveToBackend()">
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
import CreatePraxissemester from '../components/CreatePraxissemester'
import LoadingSpinner from '../components/LoadingSpinner'
import axios from "axios"

export default {
  name: 'Praxissemester',
  components: {
    WingHeader,
    CreatePraxissemester,
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
  methods: {
     saveToBackend: function(){
       axios.post('http://localhost:5000/api/praxissemester', {"berichte": this.praxissemester})
       .then((res)=>{
         this.praxissemester = res.data.berichte;
       })
    },
    saveArchiveToBackend: function(){
       axios.post('http://localhost:5000/api/praxissemester/archive', {"berichte": this.archive})
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
                this.praxissemester.splice(this.praxissemester.indexOf(item), 1);
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
                this.praxissemester.unshift(item);
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
                    this.praxissemester.splice(this.praxissemester.indexOf(item), 1);
                    this.saveToBackend();
                }
            }
        })
        .catch(err => {
            console.log(err);
        })
    },
    confirmDownload: function(){
        const data = JSON.stringify(this.Praxissemester)
        const blob = new Blob([data], {type: 'text/plain'})
        const e = document.createEvent('MouseEvents'),
          a = document.createElement('a');
          a.download = "Praxissemester.json";
          a.href = window.URL.createObjectURL(blob);
          a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
          e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
          a.dispatchEvent(e);
    },
    selectedFile() {
      console.log('selected a file');
      console.log(this.$refs.myFile.files[0]);
      
      let file = this.$refs.myFile.files[0];
      if(!file || file.type !== 'application/json') return;
      
     
      let reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      
      reader.onload =  evt => {
        let text = evt.target.result;
        try {
          this.Praxissemester = JSON.parse(text);
           this.saveToBackend();
       
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
        newItem.psId = this.psIndex;
        this.psIndex++;
        this.praxissemester.unshift(newItem);
        this.displayArchive = false;
        this.showForm = false;
        this.selectedItem = {};
        this.saveToBackend();
    },
    cancelNew: function(){
        this.showForm = false;
    },
    updateItem: function(item){
      let foundIndex = this.praxissemester.findIndex(x => x.psId === item.psId);
      this.praxissemester[foundIndex].img = item.img;
      this.praxissemester[foundIndex].text = item.text;
      this.praxissemester[foundIndex].author = item.author;
      this.saveToBackend();
    }
  },
  mounted() {
    axios.get("http://localhost:5000/api/praxissemester").then(
      response =>
        (this.praxissemester = response.data.berichte.map(item => {
          item.psId = this.psIndex;
          this.psIndex++;
          return item;
        }),
        this.dataLoaded = true
        )
    );
    axios.get("http://localhost:5000/api/praxissemester/archive").then(
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
  .handle{
    cursor: move;
  }
</style>