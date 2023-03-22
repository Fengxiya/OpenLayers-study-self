<template>
  <div id="map"></div>
</template>
<script>
// 引入依赖
import { Map, View } from "ol"
import OSM from "ol/source/OSM"
// import TileLayer from "ol/layerTile"
import { defaults as defaultControls } from "ol/control.js"
import { Zoom, ZoomSlider, ZoomToExtent } from "ol/control"
export default {
  name: "ZoomControl",
  data() {
    return {
      map: null,
    }
  },
  mounted() {
    // 初始化地图
    this.map = new Map({
      target: "map", //指定挂载的DOM,一定要是id名
      layers: [
        new TileLayer({
          source: new OSM(), //加载OpenStreetMap
        }),
      ],
      controls: defaultControls({
        zoom: false, //禁用右上角缩放组件
      }),
      // 地图控件
      view: new View({
        center: [113.24, 23.126],
        projection: "EPSG:4326",
        zoom: 12,
      }),
    })
    this.zoomCtl()
    this.zoomSlider()
    this.zoomToExtent()
  },
  methods: {
    zoomCtl() {
      let zoom = new Zoom({
        duration: 1000,
        zoomInLabel: "+", //用于放大按钮的文本标签
        zoomInTipLabel: "放大", //用于按钮提示的文本标签
        zoomOutTipLabel: "缩小", //用于按钮提示的文本标签
        delta: 2, //每次单机是应用的缩放的级别
        className: "ol-zoom-cunstom", //css类名,可以自己指定样式
      })
      this.map.addControl(zoom)
    },
    render() {
      console.log("render")
    },
    zoomSlider() {
      let slider = new ZoomSlider({
        duration: 1000,
        render: this.render(),
      })
      this.map.addControl(slider)
    },
    zoomToExtent() {
      let extent = new ZoomToExtent({
        extent: [813079, 5929220, 848966, 5936863],
        label: "T",
        tipLabel: "复位",
      })
      this.map.addControl(extent)
    },
  },
}
</script>
<style scoped>
#map {
  width: 100%;
  height: 100%;
}
.ol-viweport .ol-zoom-custom {
  top: 0.5em;
  right: 0.5em;
}
</style>
