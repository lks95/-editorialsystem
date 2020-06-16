<template>
    <div>
        <WingHeader title="News" @selectArchive="selectArchive" @addNew="addItem" />
        <CreateNews v-if="showForm" @save="saveNew" @cancel="cancelNew"/>
        <LoadingSpinner v-if="!dataLoaded" />
        <draggable v-else-if="!displayArchive" v-model="termine" group="termine" @start="drag=true" @end="drag=false" handle=".handle">
            <div v-for="data in termine" v-bind:key="data.tid" class="list-group-item">
                <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center handle">
                    <div>
                        <font-awesome-icon icon="grip-vertical" class="mr-3 text-muted"/>
                        {{data.news}}
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
                <b-collapse :id="'collapse-' + data.nId" class="border-top mt-3">
                    <EditNews :selectedItem="data" :selectedIndex="data.nId"  @save="updateItem" />
                </b-collapse>

            </div>
        </draggable>
    </div>
</template>

<script>
import WingHeader from '../components/WingHeader'
import draggable from 'vuedraggable'
import axios from "axios";
import CreateNews from "../components/CreateNews";
import LoadingSpinner from "../components/LoadingSpinner";
import EditNews from "../components/EditNews";

export default {
  name: 'News',
  components: {
    WingHeader,
      CreateNews,
      EditNews,
      LoadingSpinner,
      draggable
  },
  data(){
      return{
          news: [],
          archive: [],
          displayArchive: false,
          showForm: false,
          selectedItem: {},
          nIndex: 0,
          dataLoaded: false
      }
  },
  computed: {
      dataToShow: function(){
          if(this.displayArchive === true){
              return this.archive;
          }
          return this.news;
      }
  },
  methods: {
      addItem: function(){
          this.showForm = true;
      },
      saveNew: function(newItem){
          newItem.nId = this.nIndex;
          this.nIndex++;
          this.news.unshift(newItem);
          this.displayArchive = false;
          this.showForm = false;
          this.selectedItem = {};
          this.saveToBackend();
      },
      cancelNew: function(){
          this.showForm = false;
      },
      updateItem: function(item){
          let foundIndex = this.news.findIndex(x => x.nId === item.nId);
          this.news[foundIndex].title = item.title;
          this.news[foundIndex].link = item.link;
          this.news[foundIndex].img = item.img;
          this.text[foundIndex].img = item.text;
          this.saveToBackend();
      },
      selectArchive: function(archiveSelected){
          this.displayArchive = archiveSelected;
      },

      saveToBackend: function(){
          axios.post('http://localhost:5000/api/news', {"news": this.news})
              .then((res)=>{
                  this.news = res.data.news;
              })
      },
      saveArchiveToBackend: function(){
          axios.post('http://localhost:5000/api/news/archive', {"news": this.news})
              .then((res)=>{
                  this.news = res.data.news;
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
                          this.news.splice(this.news.indexOf(item), 1);
                          this.saveToBackend();
                      }
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
                      this.news.unshift(item);
                      this.saveToBackend();
                      this.saveArchiveToBackend();
                  }
              })
              .catch(err => {
                  console.log(err);
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
                      this.news.splice(this.news.indexOf(item), 1);
                      this.archive.unshift(item);
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
        axios.get("http://localhost:5000/api/news").then(
            response =>
                (this.news = response.data.news.map(item => {
                        item.nId = this.nIndex;
                        this.nIndex++;
                        return item;
                    }),
                        this.dataLoaded = true
                )
        );
        axios.get("http://localhost:5000/api/news/archive").then(
            response =>
                (this.archive = response.data.news.map(item => {
                    item.nId = this.nIndex;
                    this.nIndex++;
                    return item;
                }))
        );
  }
}
</script>