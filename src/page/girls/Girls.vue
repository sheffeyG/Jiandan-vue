<template>
  <var-pull-refresh v-model="isRefresh" @refresh="refresh">
    <var-list
        loading-text="正在加载"
        :finished-text="finishedText"
        error-text="出错了"
        :finished="hasMore"
        :loading="loading"
        @load="loadMore">
        <GirlsItem v-for="item in girlsList" :key="item.id" :item="item"></GirlsItem>
    </var-list>
</var-pull-refresh>

</template>

<script>

import GirlsItem from "./GirlsItem";
import GirlsService from "../../service/girls"

export default {
  name: "Girls",
  components: {
    GirlsItem
  },
  data() {
    return {
      girlsList: [],
      loading: false,
      startID: 0,
      hasMore: true,
      isRefresh:false,
      images:[],
      closeShow:false,
      finishedText:""
    }
  },
  mounted() {
    this.refresh()
  },

  methods: {
    async loadGirlsPic(isLoadMore) {

      this.loading = true
      let result = []
      if (isLoadMore) {
        result = await GirlsService.getGirlsWithStartId(this.startID)
        const tempGirlsList = result.data || [];
        this.girlsList.push(...tempGirlsList)
        this.startID = this.girlsList[this.girlsList.length - 1].id
      } else {
        result = await GirlsService.getGirlsDefault()
        this.girlsList = result.data
      }
      console.log("妹子图",this.girlsList)
      this.finishedText = "到底了"
      this.loading = false
      this.isRefresh = false
      this.hasMore = (this.girlsList < result.count_total)

    },
    loadMore() {
      this.loadGirlsPic(true)
    },
    refresh(){
      this.loadGirlsPic(false)
    },
  }

}
</script>

<style scoped>

</style>