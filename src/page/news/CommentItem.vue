<template>

  <div class="top">
    <label class="author"> {{ commentItem.name }}</label>
    <label class="OO">OO  {{ commentItem.vote_positive }}</label>
    <label class="XX">XX  {{ commentItem.vote_negative }}</label>
  </div>

  <div class="time"> {{ timeStr }}</div>

  <div class="content" v-html="commentItem.content">

  </div>
  <var-divider></var-divider>
</template>

<script>
import TimeUtil from '@/utils/time.js'

export default {
  name: "CommentItem",
  props: {
    isFirstHotComment: Boolean,
    isLastComment: Boolean,
    commentItem: Object
  },
  setup(props) {
    const timeStr = TimeUtil.formatTime(props.commentItem.date)

    return {
      timeStr,
    }
  }
}
</script>

<style scoped>
.top{
  display: flex;
}
.author {
  font-size: 14px;
  color: #444444;
  flex: 1;
}

.OO {
  margin-left: 10px;
  font-size: 12px;
  color: #999999;
  position: relative;
  text-align: right;

}

.XX {
  font-size: 12px;
  color: #999999;
  margin-left: 10px;



}

.time {
  margin-top: 6px;
  font-size: 12px;
  color: #999999;
}

.content {
  color: #444444;
  font-size: 16px;
}

</style>