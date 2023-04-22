<template>
  <var-pull-refresh v-model="isRefresh" @refresh="refresh">
  <var-list
      loading-text="正在加载"
      :finished-text="finishedText"
      error-text="出错了"
      :finished="hasMore"
      :loading="loading"
      @load="loadMore">

      <PopularityItem v-for="item in popularityList" :key="item.id" :item="item" ></PopularityItem>

  </var-list>
  </var-pull-refresh>

</template>

<script>
import PopularityService from '../../service/popularity'
import PopularityItem from "./PopularityItem";

export default {
  name: "Popularity",
  components: {PopularityItem},
  data() {
    return {
      startID: 0,
      popularityList: [],
      loading: false,
      hasMore: true,
      isRefresh:false,
      finishedText:""
    }
  },
  mounted() {
    this.refresh()
  },
  methods: {
    async loadPopularity(isLoadMore) {
      this.loading = true
      let result = []
      if (isLoadMore) {
        result = await PopularityService.getPopularityWithStartId(this.startID)
        const tempPopularityList = result.data || [];
        this.popularityList.push(...tempPopularityList)
        this.startID = this.popularityList[this.popularityList.length - 1].id
      } else {
        result = await PopularityService.getPopularityDefault()
        this.popularityList = result.data
      }
      this.finishedText = "finishedText"
      this.loading = false
      this.isRefresh = false
      this.hasMore = (this.popularityList < result.count_total)
    },
    loadMore() {
      this.loadPopularity(true)
    },
    refresh(){
      this.loadPopularity(false)
    }
  }

}
</script>

<style scoped>

</style>