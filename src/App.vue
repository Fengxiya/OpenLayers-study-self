<template>
  <div id="app">
    <Index />
  </div>
</template>

<script>
import Index from "./index/Index"

export default {
  name: "App",
  components: {
    Index,
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width: 100%;
  height: 100%;
}
</style>
