<template>
    <div id="loader"></div>
</template>

<script>
export default {
  name: "Loader",
}
</script>

<style scoped lang="scss">

#loader {
  display: block;
  position: fixed;
  z-index: 120;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-width: 1000px;
  background: rgba(0, 0, 0, 0.4) url(http://hello-site.ru//main/images/preloads/three-dots.svg) center center no-repeat;
  background-size: 72px;
}
</style>
