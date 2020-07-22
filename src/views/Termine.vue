<template>
    <div>
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 mr-3 border-bottom">
             <LoadJSON title="file" @Download="confirmDownload()"  @update-cart="selectedFile"/>
        </div>
        <WingHeader title="Termine" @selectArchive="selectArchive" @addNew="addItem" />
        <CreateTermine v-if="showForm" @save="saveNew" @cancel="cancelNew" :team="team"/>
        <LoadingSpinner v-if="!dataLoaded" />
        <draggable v-else-if="!displayArchive" v-model="termine" group="termine" @start="drag=true" @end="drag=false" handle=".handle" @change="saveToBackend()">
            <div v-for="data in termine" v-bind:key="data.tid" class="list-group-item">
                <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center handle">
                    <div>
                        <font-awesome-icon icon="grip-vertical" class="mr-3 text-muted"/>
                        <b>{{data.headline}}</b>
                        <p></p>
                        {{data.date.start}}
                    </div>
                    <div class="d-flex">
                        <div>
                            <button v-b-toggle="'collapse-' + data.tid" variant="primary" class="btn btn-outline-primary mx-1">
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
                <b-collapse :id="'collapse-' + data.tid" class="border-top mt-3">
                    <EditTermine :selectedItem="data" :selectedIndex="data.tid" :team="team"  @save="updateItem" />
                </b-collapse>
                </div>
        </draggable>

        <draggable v-else v-model="archive" group="termine-archive" @start="drag=true" @end="drag=false" @change="saveArchiveToBackend()">
            <div v-for="data in archive" v-bind:key="data.tid" class="list-group-item d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center drag-drop">
                <div>
                    <font-awesome-icon icon="grip-vertical" class="mr-3 text-muted"/>
                    <b>{{data.headline}}</b>
                    <p></p>
                    {{data.date.start}}
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
import WingHeader from '../components/WingHeader'
import draggable from 'vuedraggable'
import LoadingSpinner from "../components/LoadingSpinner";
import CreateTermine from "../components/CreateTermine";
import axios from "axios";
import EditTermine from "../components/EditTermine";
import LoadJSON from '../components/LoadJSON'


export default {
  name: 'Termine',
  components: {
    WingHeader,
      LoadingSpinner,
      draggable,
      CreateTermine,
      EditTermine,
      LoadJSON,
  },
    data(){
      return{
         termine: [],
         archive: [],
         displayArchive: false,
         showForm: false,
         selectedItem: {},
         tIndex: 0,
         team:[],
         dataLoaded: false
      }
    },
    computed: {
      dataToShow: function (){
          if(this.displayArchive === true){
              return this.archive;
          }
          return this.termine;
      }
    },
    methods: {
        confirmDownload: function(){
        const data = JSON.stringify(this.Praxissemester)
        const blob = new Blob([data], {type: 'text/plain'})
        const e = document.createEvent('MouseEvents'),
          a = document.createElement('a');
          a.download = "dates.json";
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
          this.termine = JSON.parse(text);
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
      addItem: function(){
          this.showForm = true;
      },
      selectArchive: function(archiveSelected){
          this.displayArchive = archiveSelected;
      },
      saveNew: function(newItem){
          newItem.tid = this.tIndex;
          this.tIndex++;
          this.termine.unshift(newItem);
          this.displayArchive = false;
          this.showForm = false;
          this.selectedItem = {};
          this.saveToBackend();
      },
      cancelNew: function () {
          this.showForm = false;
      },
      saveToBackend: function(){
         axios.post('http://localhost:5000/api/dates', {"dates": this.termine})
             .then((res)=>{
                 this.termine = res.data.dates;
             })
      },
        saveArchiveToBackend: function(){
            axios.post('http://localhost:5000/api/dates/archive', {"dates": this.archive})
                .then((res)=>{
                    this.archive = res.data.dates;
                })
        },
        confirmArchive: function (item) {
          this.$bvModal.msgBoxConfirm('Element archivieren?', {
              title: 'Archivieren bestätigen',
              okVariant: 'warning',
              cancelTitle: 'Abbrechen',
              hideHeaderClose: true,
              centered: true
          }).then(value => {
                if(value){
                    this.termine.splice(this.termine.indexOf(item), 1);
                    this.archive.unshift(item);
                    this.saveToBackend();
                    this.saveArchiveToBackend();
                }
            })
                .catch(err => {
                    console.log(err);
                })
        },
        confirmDelete: function (item) {
          this.$bvModal.msgBoxConfirm('Element löschen?', {
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
                          this.termine.splice(this.termine.indexOf(item), 1);
                          this.saveToBackend();
                      }
                  }
              })
              .catch(err => {
                  console.log(err);
              })
        },
        updateItem: function (item) {
          let foundIndex = this.termine.findIndex(x => x.tid === item.tid);
            this.termine[foundIndex].title = item.title;
            this.termine[foundIndex].headline = item.headline;
            this.termine[foundIndex].description = item.description;
            this.termine[foundIndex].date = item.date;
            this.termine[foundIndex].time = item.time;
            this.termine[foundIndex].place = item.place;
            this.termine[foundIndex].contacts = item.contacts;
            this.termine[foundIndex].links = item.links;
            this.saveToBackend();
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
                        this.termine.unshift(item);
                        this.saveToBackend();
                        this.saveArchiveToBackend();
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        },
    },
    mounted() {
        axios.get("http://localhost:5000/api/dates").then(
            response =>
                (this.termine = response.data.dates.map(item => {
                        item.tid = this.tIndex;
                        this.tIndex++;
                        return item;
                    }),
                        this.dataLoaded = true
                )
        );
        axios.get("http://localhost:5000/api/dates/archive").then(
            response =>
                (this.archive = response.data.dates.map(item => {
                    item.tid = this.tIndex;
                    this.tIndex++;
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
