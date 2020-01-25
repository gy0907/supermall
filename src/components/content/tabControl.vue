<template>
  <div class="tab-control">
    <div v-for="(item, index) in titles" :key="item" 
    class="controlItem"
    :class="{active: index === currentIndex}"
    @click="itemClick(index)"
    >
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: Array
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    itemClick (index) {
      this.currentIndex = index
    }
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