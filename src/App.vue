<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script>

export default {
  name: "App",
}
</script>

<style>
@import "./assets/css/common.css";


.bottom-nav-item img {
  width: 16px;
  height: 16px;
}
</style>
