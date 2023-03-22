<template>
  <div id="map"></div>
</template>
<script>
import { Map, View } from "ol"
import { OSM } from "ol/source"
import TileLayer from "ol/layer/Tile"
import { defaults as defaultControls } from "ol/control.js"
import { FullScreen } from "ol/control"
export default {
  name: "FullScreenControl",
  data() {
    return {
      map: null,
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
    this.addFullScreen()
  },
  methods: {
    addFullScreen() {
      let fullScreen = new FullScreen()
      this.map.addControl(fullScreen)
    },
  },
}
</script>
<style scoped></style>
