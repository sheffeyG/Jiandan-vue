<template>
  <div class="safe-area">
    <div class="news">
      <div class="main">
        <div class="title">
          {{ newsObject.title }}
        </div>

        <div class="bottom-row">
          <div class="author">{{ newsObject.author.name }}</div>

          <div class="comments-number">{{ newsObject.comment_count }}评论</div>

          <div class="post-time">
            {{ timeStr }}
          </div>
        </div>
      </div>
      <div class="image">
        <var-image class="news-img" :src="newsObject.custom_fields.thumb_c[0]" :error=logo lazy />
      </div>
    </div>
    <div class="divider" v-show="!lastOne"></div>
  </div>
</template>

<script>
import { computed, reactive } from "vue";
import logo from '../../assets/images/image_load_fail.svg'
import TimeUtil from '@/utils/time.js'
export default {
  name: "NewsItem",
  props: {
    news: Object,
    lastOne: Boolean
  },
  setup(props) {


    const newsObject = reactive(props.news)
    const timeStr = computed(() => {
      return TimeUtil.formatTime(newsObject.date)

    })


    return {
      newsObject,
      timeStr,
      logo
    }
  }
}
</script>

<style scoped>
.safe-area {
  display: flex;
  flex-direction: column;
  padding: 4px;
}

.news {
  display: flex;
  justify-content: space-between;
  background: #fff;
}

.news-img {
  width: 120px;
  height: 90px;
}

.news-img img {
  width: 120px;
  height: 90px;
}

.title {
  font-size: 16px;
  line-height: 17px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  color: #333333;
}

.author {
  font-size: 14px;
  line-height: 15px;
  align-self: baseline;
}

.comments-number {
  display: inline-block;
  padding-right: 5px;
  font-size: 14px;
}

.post-time {
  align-self: baseline;
  max-width: 50%;
  font-size: 14px;
  padding-right: 5px;
}

.bottom-row {
  display: flex;
  justify-content: space-between;
}

.main {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  min-width: 0;
  padding: 2px 0;
}

.divider {
  height: 1px;
  background: #999999;
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>