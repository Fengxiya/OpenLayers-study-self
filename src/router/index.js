import Router from "vue-router"
import Vue from "vue/dist/vue.js"
import HelloWorld from "../components/01openlayers入门/HelloWorld"
import MapDesc from "../components/01openlayers入门/MapDesc"
import ViewDesc from "../components/01openlayers入门/ViewDesc"
import ZoomControl from "../components/02openlayers常用控件/ZoomControl"
import BaseOperation from "../components/02openlayers常用控件/BaseOperation"
import LayerControl from "../components/02openlayers常用控件/LayerControl"
import PositionControl from "../components/02openlayers常用控件/PositionControl"
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
    {
      path: "/control/zoom",
      component: ZoomControl,
    },
    {
      path: "/control/operation",
      component: BaseOperation,
    },
    {
      path: "/control/operation",
      component: BaseOperation,
    },
    {
      path: "control/layer",
      component: LayerControl,
    },
    {
      path: "control/position",
      component: PositionControl,
    },
  ],
})
