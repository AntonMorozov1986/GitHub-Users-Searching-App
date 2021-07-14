<template>
  <div>
    <div>{{ greetings }}</div>
    <button @click="greetings = 'Hello Smith'">change</button>
  </div>
</template>

<script>
export default {
  name: "App",
  data () {
    return {
      greetings: 'Hello World'
    }
  }
}
</script>

<style scoped>

</style>