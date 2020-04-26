<template>
  <div class="checkButton" :class='{ checkBefore: !isActive }'>
    <img class="checkImg" src="~assets/img/duihao.svg" alt="">
  </div>
</template>

<script>
export default {
  props: {
    isActive: Boolean
  }
}
</script>

<style scoped>
.checkButton {
  width: 25px;
  height: 25px;
  border: 2px solid #ccc;
  border-radius: 50%;
  overflow: hidden;
}
.checkBefore::before {
  position: absolute;
  border-radius: 50%;
  content: '';
  width: 21px;
  height: 21px;
  background-color: #fff;
}
.checkImg {
  width: 25px;
  /* border-radius: 50%; */
}
  
</style>