<template>
    <div>
        <WingHeader title="Auslandssemester" @selectArchive="selectArchive" @addNew="addItem" />
        <EditAuslandssemester v-if="showForm" :selectedItem="selectedItem" @save="saveInput" @cancel="cancelInput" />
        <ul class="list-group">
            <li v-for="(data, index) in dataToShow" v-bind:key="data.asId" class="list-group-item d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
                <div>
                    <div>
                        {{data.bericht_title}}
                    </div>
                    <div>
                        <small clas="text-muted">
                            {{data.bericht_author}}
                        </small>
                    </div>
                </div>
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
                  <div class="btn-group mx-1" style="width:5em;" v-if="!displayArchive">
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
import EditAuslandssemester from '../components/EditAuslandssemester'
import axios from "axios"

export default {
  name: 'Auslandssemester',
  components: {
    WingHeader,
    EditAuslandssemester
  },
  data(){
    return{
        auslandssemester: [],
        archive: [],
        displayArchive: false,
        showForm: false,
        selectedItem: {},
        asIndex: 0
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
                this.auslandssemester.unshift(item);
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
                    this.auslandssemester.splice(this.auslandssemester.indexOf(item), 1);
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
            this.asIndex++;
            this.auslandssemester.unshift(newItem);
            this.displayArchive = false;
        }else{
            newItem.asId = this.selectedItem.asId;
            let foundIndex = this.auslandssemester.findIndex(x => x.asId === newItem.asId);
            this.auslandssemester[foundIndex] = newItem;
        }
        this.showForm = false;
        this.selectedItem = {};
    },
    cancelInput: function(){
        this.selectedItem = {};
        this.showForm = false;
    },
    arrayMove: function(old_index, new_index){
      this.auslandssemester.splice(new_index, 0, this.auslandssemester.splice(old_index, 1)[0]);
    }
  },
  mounted() {
    axios.get("./data/auslandssemester.json").then(
      response =>
        (this.auslandssemester = response.data.berichte.map(item => {
          item.asId = this.asIndex;
          this.asIndex++;
          return item;
        }))
    );
    axios.get("./data/archive/auslandssemester.json").then(
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