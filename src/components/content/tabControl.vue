<template>
  <div class="tab-control">
    <div v-for="(item, index) in titles" :key="item" 
    class="controlItem"
    :class="{active: index === homeBusIndex}"
    @click="itemClick(index, item)"
    >
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: Array, 
    homeBusIndex: Number
  },
  data() {
    return {
    }
  },
  methods: {
    itemClick (index) {
      this.$bus.$emit('fun', index)
    },
  }
}
</script>

<style scoped>
  .tab-control {
    width: 100%;
    height: 40px;
    display: flex;
    text-align: center;
    align-items: center;
    font-size: 15px;
    background-color: #fff;
    z-index: 88;
  }
  .controlItem {
    flex: 1;
  }
  .active {
    color: deeppink;
  }
  .active span {
    border-bottom: 2px solid deeppink;
    padding: 5px;
  }
</style>