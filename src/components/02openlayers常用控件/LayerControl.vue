<template>
  <div id="map">
    <div class="MapTool">
      <el-checkbox-group v-model="checkList">
        <el-checkbox
          label="OSM"
          @change="(checked) => layerCtl(checked, 0)"
        ></el-checkbox>
        <el-checkbox
          label="矢量图层"
          @change="(checked) => layerCtl(checked, 1)"
        ></el-checkbox>
        <el-checkbox
          label="矢量注记"
          @change="(checked) => layerCtl(checked, 2)"
        ></el-checkbox>
        <el-checkbox
          label="影像图层"
          @change="(checked) => layerCtl(checked, 3)"
        ></el-checkbox>
        <el-checkbox
          label="影像注记"
          @change="(checked) => layerCtl(checked, 4)"
        ></el-checkbox>
      </el-checkbox-group>
    </div>
  </div>
</template>
<script>
import { Map, View } from "ol"
import { XYZ, OSM } from "ol/source"
import TileLayer from "ol/layer/Tile"
// import { View } from "ol"
export default {
  name: "LayerControl",
  data() {
    return {
      map: null,
      checkList: ["OSM"],
    }
  },
  mounted() {
    var osm = new TileLayer({
      name: "OSM",
      source: new OSM(), //加载OpenStreetMap
    })
    var TiandiMap_vec = new TileLayer({
      name: "天地图矢量图层",
      source: new XYZ({
        url: "http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&z={z}&tk=38b1d96a75827a1b40b59e1b5e8f5b7e",
      }),
    })
    var TiandiMap_cia = new TileLayer({
      name: "天地影像图层",
      source: new XYZ({
        url: "http://t0.tianditu.com.DataServer?T=cia_w&x={x}&y={y}&z={z}&tk=38b1d96a75827a1b40b59e1b5e8f5b7e",
      }),
      visible: false,
    })
    this.map = new Map({
      target: "map",
      layers: [
        // new TileLayer({
        //   source: new OSM(),
        // }),
        osm,
        TiandiMap_vec,
        TiandiMap_cva,
        TiandiMap_img,
        TiandiMap_cia,
      ],
      view: new View({
        zoom: 12,
        center: [114, 30],
        projection: "EPSG:4326",
      }),
    })
  },
  methods: {
    layerCtl(checked, index) {
      console.log(checked)
      let layers = this.map.getLayer()
      console.log(layers)
      layers.getArray()[index].setVisible(checked)
    },
  },
}
</script>
<style scoped>
.MapTool {
  position: absolute;
  top: 50px;
  right: 50px;
  z-index: 999;
}
</style>
