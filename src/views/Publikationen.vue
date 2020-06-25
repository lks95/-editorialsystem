<template>
    <div>
        <WingHeader title="Publikationen" @selectArchive="selectArchive" @addNew="addItem" />
        <CreatePublikationen v-if="showForm" @save="saveNew" @cancel="cancelNew" />
        <LoadingSpinner v-if="!dataLoaded" />
        <draggable v-else-if="!displayArchive" v-model="publikationen" group="publikationen" @start="drag=true" @end="drag=false;" handle=".handle" @change="saveToBackend()">
            <div v-for="data in publikationen" v-bind:key="data.pId" class="list-group-item">
                <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center handle">
                    <div>
                        <font-awesome-icon icon="grip-vertical" class="mr-3 text-muted"/>
                        {{data.publikation_title}}
                    </div>
                    <div class="d-flex">
                        <div>
                            <button v-b-toggle="'collapse-' + data.pId" variant="primary" class="btn btn-outline-primary mx-1">
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
                <b-collapse :id="'collapse-' + data.pId" class="border-top mt-3">
                    <EditPublikationen :selectedItem="data" :selectedIndex="data.pId"  @save="updateItem" />
                </b-collapse>
            </div>
        </draggable>
        <draggable v-else v-model="archive" group="publikationen-archive" @start="drag=true" @end="drag=false" @change="saveArchiveToBackend()">
            <div v-for="data in archive" v-bind:key="data.pId" class="list-group-item d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center drag-drop">
                <div>
                    <font-awesome-icon icon="grip-vertical" class="mr-3 text-muted"/>
                    {{data.publikation_title}}
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
import axios from "axios";
import EditPublikationen from "../components/EditPublikationen";
import CreatePublikationen from "../components/CreatePublikationen";
import LoadingSpinner from "../components/LoadingSpinner";
import draggable from 'vuedraggable'

export default {
  name: 'Publikationen',
  components: {
    WingHeader,
    CreatePublikationen,
    EditPublikationen,
    LoadingSpinner,
    draggable
  },
  data(){
      return{
          publikationen: [],
          archive: [],
          displayArchive: false,
          showForm: false,
          selectedItem: {},
          pIndex: 0,
          dataLoaded: false
      }
  },
    computed: {
        dataToShow: function () {
            if(this.displayArchive === true){
                return this.archive;
            }
            return this.publikationen;
        }
    },
    methods: {
        saveToBackend: function(){
            axios.post('http://localhost:5000/api/publikationen', {"publikationen": this.publikationen})
                .then((res)=>{
                    this.publikationen = res.data.publikationen;
                })
        },
        saveArchiveToBackend: function(){
            axios.post('http://localhost:5000/api/publikationen/archive', {"publikationen": this.archive})
                .then((res)=>{
                    this.archive = res.data.publikationen;
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
                        this.publikationen.splice(this.publikationen.indexOf(item), 1);
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
                        this.publikationen.unshift(item);
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
                            this.publikationen.splice(this.publikationen.indexOf(item), 1);
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
            newItem.pId = this.pIndex;
            this.psIndex++;
            this.publikationen.unshift(newItem);
            this.displayArchive = false;
            this.showForm = false;
            this.selectedItem = {};
            this.saveToBackend();
        },
        cancelNew: function(){
            this.showForm = false;
        },
        updateItem: function(item){
            let foundIndex = this.publikationen.findIndex(x => x.pId === item.pId);
            this.publikationen[foundIndex].publikation_title = item.publikation_title;
            this.publikationen[foundIndex].publikation_subtitle = item.publikation_subtitle;
            this.publikationen[foundIndex].publikation_text = item.publikation_text;
            this.publikationen[foundIndex].publikation_author = item.publikation_author;
            this.publikationen[foundIndex].publikation_betreuer = item.publikation_betreuer;
            this.publikationen[foundIndex].img = item.img;
            this.publikationen[foundIndex].pdf = item.pdf;
            this.saveToBackend();
        }
    },
    mounted() {
        axios.get("http://localhost:5000/api/publikationen").then(
            response =>
                (this.publikationen = response.data.publikationen.map(item => {
                        item.pId = this.pIndex;
                        this.pIndex++;
                        return item;
                    }),
                        this.dataLoaded = true
                )
        );
        axios.get("http://localhost:5000/api/publikationen/archive").then(
            response =>
                (this.archive = response.data.publikationen.map(item => {
                    item.pId = this.pIndex;
                    this.pIndex++;
                    return item;
                }))
        );
    }
}
</script>