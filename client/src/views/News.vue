<template>
    <WingHeader title="News" @selectArchive="selectArchive" @addNew="addItem"/>
</template>

<script>
import WingHeader from '../components/WingHeader'
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
      saveToBackend: function(){

      }
  }
}
</script>