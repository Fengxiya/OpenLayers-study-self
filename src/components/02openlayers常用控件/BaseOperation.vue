<template>
  <div id="map">
    <div class="MapTool">
      <el-row>
        <el-button
          type="primary"
          @click="zoomOut"
          >缩小</el-button
        >
        <el-button
          type="success"
          @click="zoomIn"
          >放大</el-button
        >
        <el-button
          type="info"
          @click="translate"
          >平移</el-button
        >
        <el-button
          type="warning"
          @click="rotate"
          >旋转</el-button
        >
        <el-button
          type="danger"
          @click="reset"
          >复位</el-button
        >
      </el-row>
    </div>
  </div>
</template>
<script>
import { Map, View } from "ol"
import OSM from "ol/source/OSM"
import TileLayer from "ol/layer/Tile"
import { defaults as defaultControls } from "ol/control.js"
import { fromLonLat } from "ol/proj"
export default {
  name: "BaseOperation",
  data() {
    return {
      map: null,
      zoom: null,
      center: null,
      rotation: null,
    }
  },
  mounted() {
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
    var view = this.map.getView()
    this.zoom = view.getZoom()
    this.center = view.getCenter()
    this.rotation = view.getRotation()
  },
  methods: {
    zoomOut() {
      let view = this.map.getView()
      let zoom = view.getZoom()
      view.setZoom(zoom - 1)
    },
    zoomIn() {
      let view = this.map.getView()
      let zoom = view.getZoom()
      view.setZoom(zoom + 1)
    },
    translate() {
      let view = this.map.getView()
      // 将坐标从经纬度转换为平面坐标
      var wh = fromLonLat([116.36, 39.91], "EPSG:4326")
      view.setCenter(wh)
      view.setZoom(12)
    },
    rotate() {
      let view = this.map.getView()
      let rotation = view.getRotation()
      view.setRotation(rotation + Math.PI / 3)
    },
    reset() {
      let view = this.map.getView()
      view.setCenter(this.center)
      view.setRotation(this.rotation)
      view.setZoom(this.zoom)
    },
  },
}
</script>
<style scoped>
.MapTool {
  position: absolute;
  right: 50px;
  top: 50px;
  z-index: 999;
}
</style>
