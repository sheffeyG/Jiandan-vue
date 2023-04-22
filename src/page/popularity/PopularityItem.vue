<template>
  <div class="safe-area">
    <div class="var-elevation--3">
      <div>
        {{ item.content }}
      </div>

      <div class="footer-row">
        <div @click="votePositive">OO[{{ getVotePositive }}]</div>
        <div @click="voteNegative">XX[{{ getVoteNegative }}]</div>
        <div @click="showPopUp = true">吐槽[{{ getCommentCount }}]</div>
        <div></div>
      </div>
    </div>
  </div>
  <teleport to="body">
    <var-dialog v-model:show="showPopUp" @before-close="beforeClose">
      <var-input type="text" :rules="[v => v.length > 0 || '请输入昵称']" placeholder="请输入昵称" v-model="commentName" />
      <var-input type="text" :rules="[v => /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(v) || '邮箱格式不正确']"
        placeholder="请输入邮箱" v-model="commentEmail" />
      <var-input type="text" placeholder="请输入评论" v-model="commentContent" textarea />
    </var-dialog>
  </teleport>
  <teleport to="body">
    <var-snackbar v-model:show="showSnackbar" position="center" type="info">
      {{ snackbarContent }}
    </var-snackbar>
  </teleport>
</template>

<script>


import GirlsService from "../../service/girls";
import { Snackbar } from "@varlet/ui";

export default {
  name: "PopularityItem",
  props: {
    item: Object
  },
  data() {
    return {
      votePos: false,
      voteNeg: false,
      hasComment: false,
      showPopUp: false,
      showSnackbar: false,
      snackbarContent: "",
      commentName: "",
      commentEmail: "",
      commentContent: ""
    }
  },
  computed: {
    getVotePositive: function () {
      if (this.votePos) {
        return this.item.vote_positive + 1
      } else {
        return this.item.vote_positive;
      }

    },
    getVoteNegative: function () {
      if (this.voteNeg) {
        return this.item.vote_negative + 1
      } else {
        return this.item.vote_negative;
      }
    },
    getCommentCount: function () {
      if (this.item.sub_comment_count) {
        if (this.hasComment) {
          return this.item.sub_comment_count
        }
        return this.item.sub_comment_count
      } else {
        return 0
      }
    },
  },
  methods: {
    async votePositive() {
      const voteResult = await GirlsService.votePositive(this.item.id)
      console.log(voteResult)
      if (voteResult && voteResult.error === 0) {
        this.votePos = true
        this.showSnackbarWithContent("赞成成功")
      } else {
        this.showSnackbarWithContent(voteResult.msg)
      }
    },
    async voteNegative() {
      const voteResult = await GirlsService.votePositive(this.item.id)
      console.log(voteResult)
      if (voteResult && voteResult.error === 0) {
        this.voteNeg = true
        this.showSnackbarWithContent("反对成功")
      } else {
        this.showSnackbarWithContent(voteResult.msg)
      }
    },
    async postComment(data) {

      const commentResult = await GirlsService.postComment(data)
      console.log("吐槽结果", commentResult)
      if (commentResult && commentResult.code === 0) {
        this.showSnackbarWithContent("吐槽成功")
      } else {
        this.showSnackbarWithContent(commentResult.msg)
      }
    },
    beforeClose(action, done) {
      if (action === 'confirm') {
        const data = {
          author: this.commentName,
          email: this.commentEmail,
          content: this.commentContent,
          comment_id: this.item.id,
          comment_post_ID: this.item.post_id
        }
        let that = this
        if (!this.commentName && this.commentName.length === 0) {
          Snackbar.error({
            content: "昵称不能为空",
            position: "center",
            onClosed: () => {
              that.showPopUp = true
            }
          })
          return;
        }

        let emailReg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/

        if (!emailReg.test(this.commentEmail)) {
          Snackbar.error({
            content: "邮箱格式不正确",
            position: "center",
          })
          return
        }

        if (!this.commentContent && this.commentContent.length === 0) {
          Snackbar.error({
            content: "评论内容不能为空",
            position: "center",
            onClosed: () => {
              that.showPopUp = true
            }
          })
          return;
        }

        this.postComment(data)
      }
      this.commentContent = ''
      done()

    },
    showSnackbarWithContent(content) {
      if (content && content.length > 0) {
        this.snackbarContent = content
        this.showSnackbar = true
      }
    }
  }
}
</script>

<style scoped>
.safe-area {}

.var-elevation--3 {
  padding: 10px;
  margin: 6px;
}

.footer-row {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}
</style>