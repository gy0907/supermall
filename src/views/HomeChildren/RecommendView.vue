<template>
  <div id="recommend">
    <div v-for="item in recommends" :key="item.link" class="RecoItem">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recommends: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style scoped>
  #recommend {
    display: flex;
    text-align: center;
    font-size: 12px;
    padding: 10px 0 20px 0;
    border-bottom: 8px solid #eee;
  }
  .RecoItem {
    flex: 1;
  }
  .RecoItem img{
    width: 70px;
    height: 70px;
    margin-bottom: 5px;
  }
</style>
