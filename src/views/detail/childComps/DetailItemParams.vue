<template>
  <div class="itemParams" v-if="itemParams.rule">

    <div class="key">{{ itemParams.info.key }}</div>
    <div v-for="item in itemParams.info.set" :key="item.key" class="ItemStyle">
      <span>{{ item.key }}</span>
      <span class="value">{{ item.value }}</span>
    </div>
    <div 
    v-for="(item, index) in itemParams.rule.tables[0]" 
    :key="index" 
    class="ItemStyle ParamsStyle"
    >
      <span v-for="(i, index) in item" :key="index">{{ i }}</span>
    </div>
    <div>{{itemParams.rule.key}}：</div>
    <div>{{itemParams.rule.disclaimer}}</div>
  </div>
</template>

<script>
export default {
  props: {
    itemParams: Object
  }
}
</script>

<style scoped>
  .ItemStyle {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ddd;
    font-size: 14px;
    overflow: hidden;
  }
  .ItemStyle span {
    margin: 0 10px;
  }
  .value {
    padding-left: 20px;
    color: var(--color-tint)
  }
  .ParamsStyle {
    display: flex;
  }
  .ParamsStyle span{
    width: 60px;
    overflow: hidden;
  }
  .key {
    margin-top: 30px;
  }
</style>