<template>
  <var-image-preview
      closeable
      :images="previewImageList"
      v-model:show="showPreview"
      @close="handleCloseEvent"
  />
</template>

<script>
import {useRoute} from "vue-router";

export default {
  name: "PreviewImageList",
  data() {
    return {
      showPreview: false,
      previewImageList: []
    }
  },
  mounted() {
    console.log("开始预览图片")
    const route = useRoute()
    this.previewImageList = route.params.imageList
    this.showPreview = true
  },

  methods: {

    handleCloseEvent: function () {
      // const router = useRouter()
      console.log("预览图片返回")
      this.$router.back()

    }
  }
}
</script>

<style scoped>

</style>