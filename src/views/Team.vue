<template>
    <div>
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 mr-3 border-bottom">
             <LoadJSON title="file" @Download="confirmDownload()"  @update-cart="selectedFile"/>
        </div>
      <WingHeader title="Team" @selectArchive="selectArchive" @addNew="addItem" />
      <CreateTeam v-if="showForm" @save="saveNew" @cancel="cancelNew" />
      <LoadingSpinner v-if="!dataLoaded" />
      <draggable v-else-if="!displayArchive" v-model="team" group="team" @start="drag=true" @end="drag=false;" handle=".handle" @change="saveToBackend()">
        <div v-for="data in team" v-bind:key="data.tId" class="list-group-item">
          <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center handle">
            <div>
              <font-awesome-icon icon="grip-vertical" class="mr-3 text-muted"/>
              {{data.name}}
            </div>
            <div class="d-flex">
              <div>
                  <button v-b-toggle="'collapse-' + data.tId" variant="primary" class="btn btn-outline-primary mx-1">
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
          <b-collapse :id="'collapse-' + data.tId" class="border-top mt-3">
              <EditTeam :selectedItem="data" :selectedIndex="data.tId"  @save="updateItem" />
          </b-collapse>
        </div>
      </draggable>
      <draggable v-else v-model="archive" group="team-archive" @start="drag=true" @end="drag=false" @change="saveArchiveToBackend()">
        <div v-for="data in archive" v-bind:key="data.tId" class="list-group-item d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center drag-drop">
          <div>
            <font-awesome-icon icon="grip-vertical" class="mr-3 text-muted"/>
            {{data.name}}
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
import EditTeam from '../components/EditTeam'
import CreateTeam from '../components/CreateTeam'
import LoadingSpinner from '../components/LoadingSpinner'
import axios from "axios"
import LoadJSON from '../components/LoadJSON'

export default {
  name: 'Team',
  components: {
    WingHeader,
    CreateTeam,
    EditTeam,
    LoadingSpinner,
    draggable,
    LoadJSON,
  },
  data(){
    return{
        team: [],
        archive: [],
        displayArchive: false,
        showForm: false,
        selectedItem: {},
        tIndex: 0,
        dataLoaded: false
    }
  },
  computed: {
    dataToShow: function () {
            if(this.displayArchive === true){
                return this.archive;
            }
            return this.team;
        }
  },
  methods: {
     saveToBackend: function(){
       axios.post('http://localhost:5000/api/team', {"team": this.team})
       .then((res)=>{
         this.team = res.data.team;
       })
    },
    saveArchiveToBackend: function(){
       axios.post('http://localhost:5000/api/team/archive', {"team": this.archive})
       .then((res)=>{
         this.archive = res.data.team;
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
                this.team.splice(this.team.indexOf(item), 1);
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
                this.team.unshift(item);
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
                    this.team.splice(this.team.indexOf(item), 1);
                    this.saveToBackend();
                }
            }
        })
        .catch(err => {
            console.log(err);
        })
    },
    confirmDownload: function(){
        const data = JSON.stringify(this.team)
        const blob = new Blob([data], {type: 'text/plain'})
        const e = document.createEvent('MouseEvents'),
          a = document.createElement('a');
          a.download = "team.json";
          a.href = window.URL.createObjectURL(blob);
          a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
          e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
          a.dispatchEvent(e);
    },
   selectedFile(file) {
      console.log('show a file');
      console.log(file);
      
      let fileA = file;
      console.log('show this file');
      console.log(fileA);
      if(!fileA || fileA.type !== 'application/json') return;
     
      let reader = new FileReader();
      reader.readAsText(fileA, "UTF-8");
      console.log(reader);
      
      reader.onload =  evt => {
        let text = evt.target.result;
        try {
          this.team = JSON.parse(text);
           this.saveToBackend();       
           alert("File wurde gespeichert");
       
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
        newItem.tId = this.tIindex;
        this.tIndex++;
        this.team.unshift(newItem);
        this.displayArchive = false;
        this.showForm = false;
        this.selectedItem = {};
        this.saveToBackend();
    },
    cancelNew: function(){
        this.showForm = false;
    },
    updateItem: function(item){
      let foundIndex = this.team.findIndex(x => x.tId === item.tId);
      this.team[foundIndex].id = item.id;
      this.team[foundIndex].name = item.name;
      this.team[foundIndex].phone = item.phone;
      this.team[foundIndex].mail = item.mail;
      this.team[foundIndex].room = item.room;
      this.team[foundIndex].job_title = item.job_title;
      this.team[foundIndex].text = item.text;
      this.team[foundIndex].subject = item.subject;
      this.team[foundIndex].times = item.times;
      this.team[foundIndex].focus = item.focus;
      this.team[foundIndex].img = item.img;
      this.saveToBackend();
    }
  },
  mounted() {
    axios.get("http://localhost:5000/api/team").then(
      response =>
        (this.team = response.data.team.map(item => {
          item.tId = this.tIndex;
          this.tIndex++;
          return item;
        }),
        this.dataLoaded = true
        )
    );
    axios.get("http://localhost:5000/api/team/archive").then(
      response =>
        (this.archive = response.data.team.map(item => {
          item.tId = this.tIndex;
          this.tIndex++;
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