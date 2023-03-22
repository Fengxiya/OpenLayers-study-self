<template>
  <div id="map">
    <div
      id="mouse-position"
      ref="position"
    ></div>
  </div>
</template>
<script>
import { Map, View } from "ol"
import { XYZ, OSM } from "ol/source"
import TileLayer from "ol/layer/Tile"
import { defaults as defaultControls } from "ol/control.js"
import { OverviewMap } from "ol/control"
export default {
  name: "OverViewControl",
  data() {
    return {
      map: null,
    }
  },
  monted() {
    this.map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [113.249, 23.126],
        projection: "EPSG:4326",
        zoom: 12,
      }),
    })
    this.overViewCtl()
  },
  methods: {
    overViewCtl() {
      let overviewMap = new OverviewMap({
        // 鹰眼样式
        className: "ol-overviewmap ol-custom-overviewmap",
        // 鹰眼中加载同坐标系下不同数据源的图层
        layers: [
          new TileLayer({
            source: new XYZ({
              url: "http://t0.tianditu.com/DataServer?T=img_w&x={x}&y={y}&z={z}&tk=38b1d96a75827a1b40b59e1b5e8f5b7e",
            }),
          }),
        ],
        // 当前的鹰眼图是否会跟随当前的视图旋转
        rotateWithView: true,
        // 鹰眼空间展开时功能按钮上的标识
        collapseLabel: "\u00BB", //这个是双箭头的符号
        // 鹰眼控件折叠时功能按钮上的标识
        label: "\u00AB",
        // 初始为展开显示方式
        collapsed: false,
        view: this.map.getView(),
      })
    },
  },
}
</script>
<style scoped>
#map {
  position: relative;
}
#mouse-position {
  position: absolute;
  left: 50px;
  bottom: 50px;
  z-index: 999;
}
/* 鹰眼控件中地图容器样式 */
#map >>> .ol-custom-overviewmap .ol-overviewmap-map {
  border: none;
}
/* 鹰眼控件中显示当前窗口中主图区域的边框 */
#map >>> .ol-custom-overviewmap .ol-overviewmap-box {
  border: 2px solid red;
}
/* 鹰眼控件展开时其控件按钮图标的样式 */
#map >>> .ol-custom-overviewmap:not(.ol-collapsed) button {
  right: 2px;
  top: 2px;
}
</style>
