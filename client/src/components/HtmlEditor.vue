<template>
    <Editor
          :init="{
            height: 500,
            menubar : false, 
            plugins: [
                'advlist autolink lists link charmap preview anchor visualblocks code fullscreen table paste'
            ],
            toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link'
          }"
          v-model="value"
        />
</template>

<script>
import Editor from '@tinymce/tinymce-vue'

export default {
    props: ['value'],
    name: 'HtmlEditor',
    components: {
        Editor
    }
}
</script>