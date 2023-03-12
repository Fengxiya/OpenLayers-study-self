import Router from "vue-router"
import Vue from "vue/dist/vue.js"
import HelloWorld from "../components/01openlayers入门/HelloWorld"
import MapDesc from "../components/01openlayers入门/MapDesc"
import ViewDesc from "../components/01openlayers入门/ViewDesc"
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/introduction/hello",
      component: HelloWorld,
    },
    {
      path: "/introduction/map",
      component: MapDesc,
    },
    {
      path: "/introduction/view",
      component: ViewDesc,
    },
  ],
})
