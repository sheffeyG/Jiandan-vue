<template>
  <var-pull-refresh v-model="isRefresh" @refresh="refresh">
    <var-list loading-text="正在加载" :finished-text="finishedText" error-text="出错了" :finished="hasMore" :error="error"
      :loading="loading" @load="loadMore">
      <NewsItem v-for="(item, index) in news" :news="item" :key="index" :last-one="index === news.length - 1"
        @click="toDetail(item)"></NewsItem>
    </var-list>
  </var-pull-refresh>
</template>

<script>


import NewsItem from "./NewsItem";
import NewsService from '../../service/news'
import TimeUtils from '@/utils/time.js'

export default {
  name: "News",
  components: {
    NewsItem
  },

  data() {
    return {
      pageNumber: 1,
      news: [],
      loading: false,
      hasMore: true,
      isRefresh: false,
      error: false,
      finishedText: ''
    }
  },
  mounted() {
    this.refresh()
  },

  methods: {
    async loadNewsList(isLoadMore) {

      this.loading = true
      if (isLoadMore) {
        this.pageNumber += 1;
      } else {
        this.pageNumber = 1;
      }
      const res = await NewsService.getNewsList(this.pageNumber)
      if (res.status === 'ok') {
        if (this.pageNumber === 1) {
          this.news = res.posts
        } else {
          const tempNews = res.posts || [];
          this.news.push(...tempNews)
        }
        this.finishedText = "到底了"
      } else {
        this.error = true
        console.log("加载出错")
      }
      this.loading = false
      this.isRefresh = false
      this.hasMore = (this.news < res.count_total)

    },
    loadMore() {
      this.loadNewsList(true)
    },
    refresh() {
      this.loadNewsList(false)
    },
    toDetail(item) {
      console.log("详情")
      this.$router.push({
        name: "newsDetail",
        params: {
          imgUrl: item.custom_fields.thumb_c[0],
          excerpt: item.excerpt,
          newsId: item.id,
          title: item.title,
          author: item.author.name,
          time: TimeUtils.formatTime(item.date)
        }
      })
    }
  }


}
</script>

<style></style>