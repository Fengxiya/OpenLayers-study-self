<template>
  <div>
    <el-menu
      :default-active="this.$route.path"
      router
      class="rl-menu-vertical-demo"
      :unique-opened="true"
    >
      <el-submenu
        :index="i + ''"
        v-for="(item, i) in navList"
        :key="i"
      >
        <template slot="title">
          <i :class="item.icon">
            <span slot="title">{{ item.title }}</span>
          </i>
        </template>
        <el-menu-item
          :index="nav.name"
          v-for="(nav, i) in item.subNav"
          :key="i"
        >
          {{ nav.navItem }}
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: "Navigation",
  data() {
    return {
      isCollapse: true,
      navList: [
        {
          title: "快速入门",
          subNav: [
            {
              name: "/introduction/hello",
              navItem: "快速开始",
            },
            {
              name: "/introduction/map",
              navItem: "map地图",
            },
            {
              name: "/introduction/view",
              navItem: "view视图",
            },
          ],
        },
      ],
    }
  },
}
</script>
<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  position: relative;
}
[class*="el-icon-arrow"] {
  font-size: 25px;
  color: white;
  opacity: 0.6;
}
ul >>> .el-menu-popup {
}
</style>
