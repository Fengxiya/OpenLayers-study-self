<template>
  <div
    id="map"
    class="map"
  ></div>
</template>

<script>
// 引入依赖
import { Map, View } from "ol"
// import proj from "ol/proj/Projection"
import OSM from "ol/source/OSM"
import TileLayer from "ol/layer/Tile"
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  mounted() {
    this.initMap()
  },
  methods: {
    initMap() {
      var map = new Map({
        target: "map",
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: [113.2, 23.12],
          projection: "EPSG:4326",
          zoom: 4,
        }),
      })
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map{
  width:100%;
  height:500px
}
</style>
