<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 mr-3 border-bottom">
      <h1 class="h2">{{title}}</h1>
      <div>
        <div class="form-group my-3 py-3">
            <label>Detail media Src</label>
            <input class="form-control" :id="'detail_mediaInput'"  v-model="detail_media.detail_img_src"> 
            <label>Detail media Alt</label>
            <input class="form-control" :id="'detail_mediaInput'"  v-model="detail_media.detail_img_alt"> 
            <div class="d-flex">
                <div class="btn-toolbar mb-2 mb-md-0">
                    <div class="btn-group mr-2">
                        <button class="btn btn-outline-secondary" @click="$emit('addNewImg')"><font-awesome-icon icon="plus"/></button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    name: 'LoadJSON',
    props: [ 'Load' ],
};
</script>