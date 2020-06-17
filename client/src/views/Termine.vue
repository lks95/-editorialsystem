<template>
    <div>
        <WingHeader title="Termine" @selectArchive="selectArchive" @addNew="addItem" />
        <CreateTermine v-if="showForm" @save="saveNew" @cancel="cancelNew"/>
        <LoadingSpinner v-if="!dataLoaded" />
        <draggable v-else-if="!displayArchive" v-model="termine" group="termine" @start="drag=true" @end="drag=false" handle=".handle">
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
                    <EditTermine :selectedItem="data" :selectedIndex="data.tid"  @save="updateItem" />
                </b-collapse>
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



export default {
  name: 'Termine',
  components: {
    WingHeader,
      LoadingSpinner,
      draggable,
      CreateTermine,
      EditTermine
  },
    data(){
      return{
         termine: [],
         archive: [],
         displayArchive: false,
         showForm: false,
         selectedItem: {},
         tIndex: 0,
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
      },
      cancelNew: function () {
          this.showForm = false;
      },
      saveToBackend: function(){
         axios.post('http://localhost:5000/api/termine', {"dates": this.termine})
             .then((res)=>{
                 this.termine = res.data.dates;
             })
      },
        saveArchiveToBackend: function(){
            axios.post('http://localhost:5000/api/termine/archive', {"dates": this.termine})
                .then((res)=>{
                    this.archive = res.data.berichte;
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
                        this.news.unshift(item);
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
        axios.get("http://localhost:5000/api/termine").then(
            response =>
                (this.termine = response.data.dates.map(item => {
                        item.tid = this.tIndex;
                        this.tIndex++;
                        return item;
                    }),
                        this.dataLoaded = true
                )
        );
        axios.get("http://localhost:5000/api/termine/archive").then(
            response =>
                (this.archive = response.data.dates.map(item => {
                    item.tid = this.tIndex;
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
