<template>
  <var-tabs
      sticky
      elevation
      color="#000000"
      active-color="#fff"
      v-model:active="active"
      inactive-color="hsla(0, 0%, 100%, .6)">

    <var-tab>新鲜事</var-tab>
    <var-tab>树洞</var-tab>
    <var-tab>无聊图</var-tab>
    <var-tab>妹子图</var-tab>
  </var-tabs>


  <var-tabs-items v-model:active="active">
    <var-tab-item>
      <News></News>
    </var-tab-item>
    <var-tab-item>
      <Popularity></Popularity>
    </var-tab-item>
    <var-tab-item>
      <Boring></Boring>
    </var-tab-item>
    <var-tab-item>
      <Girls></Girls>
    </var-tab-item>

  </var-tabs-items>
</template>

<script>

import News from "./news/News";
import Boring from "./boring/Boring";
import Girls from "./girls/Girls";
import Popularity from "./popularity/Popularity";
export default {
  name: "Home",
  components: {
    News,
    Boring,
    Girls,
    Popularity
  },
  data() {
    return {
      active: 0,

    }
  },
}
</script>

<style scoped>
@import "./../assets/css/common.css";
</style>