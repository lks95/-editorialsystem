<template>
    <div>
        <WingHeader title="Praxissemester" @selectArchive="selectArchive" @addNew="addNewForm" />
        <EditPraxissemester v-if="showForm" @add="addItem" @cancelEdit="cancelInput" :selectedItem="selectedItem" />
        <ul class="list-group">
            <li v-for="data in dataToShow" v-bind:key="data.author" class="list-group-item d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
                {{data.author}}
                <div>
                    <button class="btn btn-outline-primary mx-1" @click="editItem(data)">
                        <font-awesome-icon icon="edit" />
                    </button>
                    <button v-if="!displayArchive" class="btn btn-outline-warning mx-1" @click="confirmArchive(data)" >
                        <font-awesome-icon icon="archive" />
                    </button>
                    <button v-if="displayArchive" class="btn btn-outline-warning mx-1" @click="restoreFromArchive(data)" >
                        <font-awesome-icon icon="undo" />
                    </button>
                    <button class="btn btn-outline-danger mx-1" @click="confirmDelete(data)" >
                        <font-awesome-icon icon="trash" />
                    </button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import WingHeader from '../components/WingHeader'
import EditPraxissemester from '../components/EditPraxissemester'
import json from '../json/praxissemester.json'
import archive_json from '../json/archive/praxissemester.json'

export default {
  name: 'Praxissemester',
  components: {
    WingHeader,
    EditPraxissemester
  },
  data(){
    return{
        praxissemester: json.berichte,
        archive: archive_json.berichte,
        displayArchive: false,
        showForm: false,
        selectedItem: {},
        isNewItem: true
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
                this.archive.push(item);
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
                this.praxissemester.push(item);
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
    addItem: function(newItem){
        if(this.isNewItem){
            this.praxissemester.push(newItem);
        }
        this.showForm = false;
        this.selectedItem = {};
        this.isNewItem = true;
    },
    addNewForm: function(){
        this.showForm = true;
    },
    cancelInput: function(){
        this.selectedItem = {};
        this.showForm = false;
        this.isNewItem = true;
    },
    editItem: function(item){
        this.isNewItem = false;
        this.selectedItem = item;
        this.showForm = true;
    }
  }
}
</script>