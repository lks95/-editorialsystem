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
        <WingHeader title="Projekte" @selectArchive="selectArchive" @addNew="addItem" />
        <CreateProjekte v-if="showForm" @save="saveNew" @cancel="cancelNew" :team="team"/>
        <LoadingSpinner v-if="!dataLoaded" />
        <draggable v-else-if="!displayArchive" v-model="projekte" group="projekte" @start="drag=true" @end="drag=false;" handle=".handle" @change="saveToBackend()">
          <div v-for="data in projekte" v-bind:key="data.prId" class="list-group-item">
            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center handle">
              <div>
                <font-awesome-icon icon="grip-vertical" class="mr-3 text-muted"/>
                {{data.intro_title}}
                <br/>
                {{data.date}}
                <br/>
                {{data.study}}
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
                <EditProjekte :selectedItem="data" :selectedIndex="data.prId" :team="team"  @save="updateItem" />
            </b-collapse>
          </div>
        </draggable>
        <draggable v-else v-model="archive" group="projekte-archive" @start="drag=true" @end="drag=false" @change="saveArchiveToBackend()">
          <div v-for="data in archive" v-bind:key="data.prId" class="list-group-item d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center drag-drop">
            <div>
              <font-awesome-icon icon="grip-vertical" class="mr-3 text-muted"/>
               {{data.intro_title}}
                <div> </div>
                {{data.date}}
                <div> </div>
                {{data.study}}
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
        team: [],
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
       axios.post('http://localhost:5000/api/projects', {"projects": this.projekte})
       .then((res)=>{
         this.projekte = res.data.projects;
       })
    },
    saveArchiveToBackend: function(){
       axios.post('http://localhost:5000/api/projects/archive', {"projects": this.archive})
       .then((res)=>{
         this.archive = res.data.projects;
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
    confirmDownload: function(){
        const data = JSON.stringify(this.projekte)
        const blob = new Blob([data], {type: 'text/plain'})
        const e = document.createEvent('MouseEvents'),
          a = document.createElement('a');
          a.download = "projekte.json";
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
          this.projekte = JSON.parse(text);
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
      this.projekte[foundIndex].study = item.study;
      this.projekte[foundIndex].category = item.category;
      this.projekte[foundIndex].intro_title = item.intro_title;
      this.projekte[foundIndex].intro_text = item.intro_text;
      this.projekte[foundIndex].intro_img_src = item.intro_img_src;
      this.projekte[foundIndex].intro_img_alt = item.intro_img_alt;
      this.projekte[foundIndex].detail_headline = item.detail_headline;
      this.projekte[foundIndex].detail_header_img_src = item.detail_header_img_src;
      this.projekte[foundIndex].detail_header_img_alt = item.detail_header_img_alt;
      this.projekte[foundIndex].detail_header_intro = item.detail_header_intro;
      this.projekte[foundIndex].detail_text = item.detail_text;
      this.projekte[foundIndex].date = item.date;
      this.projekte[foundIndex].contacts = item.contacts;
      this.projekte[foundIndex].detail_media = item.detail_media;

      this.saveToBackend();
    }
  },
  mounted() {
    axios.get("http://localhost:5000/api/projects").then(
      response =>
        (this.projekte = response.data.projects.map(item => {
          item.prId = this.prIndex;
          this.prIndex++;
          return item;
        }),
        this.dataLoaded = true
        )
    );
    axios.get("http://localhost:5000/api/projects/archive").then(
      response =>
        (this.archive = response.data.projects.map(item => {
          item.prId = this.prIndex;
          this.prIndex++;
          return item;
        }))
    );
    axios.get("http://localhost:5000/api/team").then(
      response =>{ 
          this.team = response.data.team.map(t => t.id);
      }
    );  
  }
}
</script>

<style scoped>
  .handle{
    cursor: move;
  }
</style>