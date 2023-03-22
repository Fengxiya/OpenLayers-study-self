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
import OSM from "ol/source/OSM"
import TileLayer from "ol/layer/Tile"
import { MousePosition } from "ol/control"
import { createStringXY } from "ol/coordinate"
export default {
  name: "PositionControl",
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
    this.mousePositionCtl()
  },
  methods: {
    mousePositionCtl() {
      let mousePosition = new MousePosition({
        // 坐标格式
        coordinateFormat: createStringXY(9),
        // 地图投影坐标系（如果没有设置就输出为默认坐标系下的坐标）
        // 坐标的投影默认使用的是view视图的投影
        projection: "EPSG:4326",
        // 可以设置样式
        className: "cuatom-mouse-position",
        // 显示鼠标位置信息的目标容器
        // 指定鼠标控件挂载的位置
        target: this.$refs.position,
        // 未定义坐标的标记
        placeholder: "未识别鼠标位置",
        render: this.renderPosition(), //重新呈现控件时调用的函数
      })
      this.map.addControl(mousePosition)
    },
    renderPosition() {
      console.log("renderPosition")
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
</style>
