<template>
  <div v-if="commentInfo.created" class="comment-info">
    <div class="herder">
      <span>用户评价</span>
      <span>更多></span>
    </div>
    <div>
      <div class="touxiang">
        <img :src="commentInfo.user.avatar" alt="">
        <span>{{ commentInfo.user.uname }}</span>
      </div>
      <p> {{ commentInfo.content }} </p>
      <span> {{ commentInfo.created | showDate }} </span>
      <span>{{ commentInfo.style }}</span>
    </div>
    <div class="commImg">
      <img :src="item" v-for="(item, index) in commentInfo.images" :key="index">
    </div>
  </div>
</template>

<script>
import { dateFormat } from 'network/getDate'

export default {
  props: {
    commentInfo: Object
  },
  filters: {
    showDate (msg) {
      // 服务器返回的时间戳是秒 所以要*1000才是毫秒时间戳
      const date = new Date(msg * 1000)
      return dateFormat(date, 'YYYY-MM-DD hh:mm:ss')
    }
  }
}
</script>

<style scoped>
.comment-info {
  padding: 0 10px;
}
.herder {
  line-height: 50px;
  border-bottom: 1px solid #ccc;
}
.herder span:last-child {
  float: right;
}
[alt] {
    width: 50px;
    height: 50px;
    margin: 10px 10px;
    border-radius: 50%;
    vertical-align: middle;
}
.touxiang {
    font-weight: 700;
}
p {
  text-indent: 1em;
  line-height: 1.3em;
}
p+span,
p+span+span {
  color: #aaa;
  line-height: 40px;
}
.commImg img {
  width: 80px;
  height: 80px;
}
</style>