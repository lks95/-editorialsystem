<template>
    <div>
        <WingHeader title="Auslandssemester"/>
        <ul class="list-group">
            <li v-for="data in praxissemester" v-bind:key="data.bericht_author" class="list-group-item d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
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
                <div>
                    <button class="btn btn-outline-primary mx-1">
                        <font-awesome-icon icon="edit" />
                    </button>
                    <button class="btn btn-outline-warning mx-1">
                        <font-awesome-icon icon="archive" />
                    </button>
                    <button class="btn btn-outline-danger mx-1">
                        <font-awesome-icon icon="trash" />
                    </button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import WingHeader from '../components/WingHeader'
import json from '../json/auslandssemester.json'
export default {
  name: 'Auslandssemester',
  components: {
    WingHeader
  },
  data(){
          console.log(json.berichte);
      return{
          praxissemester: json.berichte
      }
  }
}
</script>