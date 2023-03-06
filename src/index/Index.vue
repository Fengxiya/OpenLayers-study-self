<template>
  <el-container>
    <el-aside>
      <Navigation />
    </el-aside>
    <el-main class="data-main">
      <router-view />
    </el-main>
  </el-container>
</template>
<script>
import Navigation from "../navigation/Navigation.vue"
export default {
  name: "index",
  components: {
    Navigation,
  },
  data() {
    return {
      activeHeader: false,
      navWidth: 64,
    }
  },
}
</script>
