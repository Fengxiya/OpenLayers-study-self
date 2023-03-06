import App from "./App.vue"
import "./common/css/reset.css"
import router from "./router"
import Vue from "vue/dist/vue.js"
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import "ol/ol.css"
Vue.use(ElementUI)
Vue.config.productionTip = false
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>",
})
