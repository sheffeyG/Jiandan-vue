<template>
  <div class="container">


    <img class="top-img" :src="imgUrl" alt="顶部图片" />
    <div class="title">{{ title }}</div>
    <div class="author-and-time">
      <label class="author">
        {{ author }}
      </label>
      <label class="time">
        {{ time }}
      </label>

    </div>
    <div class="excerpt">{{ excerpt }}</div>
    <hr />
    <div class="detail" v-html="detail"></div>
    <div class="var-elevation--2 bottom-area">
      <img :src="backIcon" @click="goBack" class="back" alt="" />
      <img :src="commentIcon" @click="gotoCommentList" class="comment-list" alt="" />
      <img :src="moreIcon" @click="showActionDialog" class="more-icon" alt="" />
    </div>
    <var-popup position="bottom" v-model:show="showMoreActionPopup">
      <div class="block">
        <var-cell icon="heart" title="收藏" @click="collect" />
        <var-cell icon="fire" title="分享" @click="share" />
      </div>
    </var-popup>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import NewsService from '../../service/news'
import { Snackbar } from "@varlet/ui";

const backIcon = require('../../assets/images/back.svg')
const moreIcon = require('../../assets/images/more.svg')
const commentIcon = require('../../assets/images/comment.svg')
export default {
  name: "NewsDetail",

  data() {
    return {
      showMoreActionPopup: false,
      imgUrl: "",
      excerpt: "",
      title: "",
      newsId: "",
      author: null,
      detail: "",
      time: "",
      backIcon,
      moreIcon,
      commentIcon
    }
  },
  mounted() {

    const route = useRoute()
    this.parseParams(route.params)
    this.getNewsDetail()
  },
  methods: {
    async getNewsDetail() {
      const result = await NewsService.getNewsDetail(this.newsId)
      this.detail = result.post.content
      console.log(result)
    },
    goBack() {
      this.$router.back()
    },
    parseParams(params) {
      this.imgUrl = params.imgUrl
      this.excerpt = params.excerpt
      this.newsId = params.newsId
      this.title = params.title
      this.author = params.author
      this.time = params.time
      console.log(this.newsId)
    },
    showActionDialog() {
      this.showMoreActionPopup = true
    },
    collect() {
      this.showMoreActionPopup = false
      Snackbar({
        content: "点击收藏，但是作者并没有实现该功能",
        position: 'bottom'
      })
    },
    share() {
      this.showMoreActionPopup = false
      Snackbar({
        content: "点击收藏，但是作者并没有实现该功能",
        position: 'bottom'
      })
    },
    gotoCommentList() {
      this.$router.push({
        name: 'newsCommentList',
        params: {
          newsId: this.newsId
        }
      })
    }
  }
}
</script>

<style scoped>
hr {
  margin-left: 36px;
  margin-right: 36px;
}

.container {
  background: #fafafa;
  width: 100%;
}


.top-img {
  width: 100%;
  height: 180px;
}

.title {
  font-size: 24px;
  color: #333333;
  text-align: center;
}

.author-and-time {
  margin-top: 10px;
  text-align: center;
}

.author {
  font-size: 16px;
  color: #333333;
}

.time {
  font-size: 16px;
  color: #999999;
  margin-left: 10px;
}

.excerpt {
  margin-top: 10px;
  font-size: 18px;
  color: #999999;
  text-align: center;
}

.detail {
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 40px;
  display: inline-block;
}

.bottom-area {
  padding: 10px 15px;
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #ffffff;
}

.back {
  width: 28px;
  height: 24px;
}

.more-icon {
  width: 28px;
  height: 24px;
  position: absolute;
  right: 38px;
}

.comment-list {
  width: 28px;
  height: 24px;
  position: absolute;
  right: 88px;
}
</style>