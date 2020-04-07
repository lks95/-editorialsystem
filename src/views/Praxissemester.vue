<template>
    <div>
        <WingHeader title="Praxissemester" @selectArchive="selectArchive" @addNew="addItem" />
        <EditPraxissemester v-if="showForm" :selectedItem="selectedItem" @save="saveInput" @cancel="cancelInput" />
        <ul class="list-group">
            <li v-for="(data, index) in dataToShow" v-bind:key="data.psId" class="list-group-item d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
                {{data.author}}
                <div class="d-flex">
                  <div>
                      <button v-if="!displayArchive" class="btn btn-outline-primary mx-1" @click="editItem(data)">
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
                  <div class="btn-group mx-1" style="width:5em;" v-if(!displayArchive)>
                    <button v-if="!(index == 0)" class="btn btn-outline-primary" @click="arrayMove(index, index-1)"><font-awesome-icon icon="chevron-up" /></button>
                    <button v-if="!(index == dataToShow.length-1)" class="btn btn-outline-primary" @click="arrayMove(index, index+1)"><font-awesome-icon icon="chevron-down" /></button>
                  </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import WingHeader from '../components/WingHeader'
import EditPraxissemester from '../components/EditPraxissemester'
import axios from "axios"

export default {
  name: 'Praxissemester',
  components: {
    WingHeader,
    EditPraxissemester
  },
  data(){
    return{
        praxissemester: [],
        archive: [],
        displayArchive: false,
        showForm: false,
        selectedItem: {},
        psIndex: 0
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
    addItem: function(){
        this.showForm = true;
    },
    editItem: function(item){
        this.selectedItem = item;
        this.showForm = true;
    },
    saveInput: function(newItem){
        if(Object.keys(this.selectedItem).length === 0){
            newItem.psId = this.psIndex;
            this.psIndex++;
            this.praxissemester.push(newItem);
            this.displayArchive = false;
        }else{
            newItem.psId = this.selectedItem.psId;
            let foundIndex = this.praxissemester.findIndex(x => x.psId === newItem.psId);
            this.praxissemester[foundIndex] = newItem;
        }
        this.showForm = false;
        this.selectedItem = {};
    },
    cancelInput: function(){
        this.selectedItem = {};
        this.showForm = false;
    },
    arrayMove: function(old_index, new_index){
      this.praxissemester.splice(new_index, 0, this.praxissemester.splice(old_index, 1)[0]);
    }
  },
  mounted() {
    axios.get("./data/praxissemester.json").then(
      response =>
        (this.praxissemester = response.data.berichte.map(item => {
          item.psId = this.psIndex;
          this.psIndex++;
          return item;
        }))
    );
    axios.get("./data/archive/praxissemester.json").then(
      response =>
        (this.archive = response.data.berichte.map(item => {
          item.psId = this.psIndex;
          this.psIndex++;
          return item;
        }))
    );
  },
}
</script>