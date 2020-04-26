<template>
    <div id="tab-bar">
     <slot></slot>
    </div>
</template>
<script>
export default {
  
}
</script>

<style scpoed>
  #tab-bar {
    width: 100%;
    display: flex;
    background: #f6f6f6;
    position: fixed;
    bottom: 0;
    left: 0;
    box-shadow: 0 0 3px rgba(0,0,0,.3);
    z-index: 99;
  }

</style>