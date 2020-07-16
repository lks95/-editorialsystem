<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 mr-3 border-bottom">
      <h1 class="h2">{{Media}}</h1>
      <div class="d-flex">
        <div class="btn-toolbar mb-2 mb-md-0">
          <div class="btn-group mr-2">
            <button class="btn btn-outline-secondary" @click="$emit('addNewImg')"><b-icon icon="plus"></b-icon></button>  
          </div>
          <div class="btn-group mr-2">
            <button class="btn btn-outline-secondary" @click="$emit('popdNewImg')"><b-icon icon="dash"/></button>  
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    name: 'LoadMedia',
    props: [ 'Media' ],
};
</script>