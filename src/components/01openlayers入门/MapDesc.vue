<template>
  <div
    id="map"
    class="map"
    ref="mapRef"
  ></div>
</template>
<script>
import { Map, View } from "ol"
import TileLayer from "ol/layer/Tile"
import OSM from "ol/source/OSM"
import { XYZ } from "ol/source"
// 地图控件的库
import { defaults as defaultControls } from "ol/control.js"
// 地图交互的库
import { defaults as defaultInteractions } from "ol/interaction.js"
export default {
  name: "MapDesc",
  data() {
    return {
      map: null,
    }
  },
  mounted() {
    this.map = new Map({
      //   target: "map", //挂载的DOM对象，这个是指明id的时候
      target: this.$refs.mapRef, //也可以指明ref，通过ref绑定到DOM上
      //   加载的图层，可以加载多个
      layers: [
        // 一个图层对象
        new TileLayer({
          //图层按提供的顺序呈现
          title: "OpenStreetMap",
          source: new OSM(), //加载图层数据的来源
        }),
        // 加载天地图的图层
        // 后渲染的会把先渲染的覆盖掉
        new TileLayer({
          title: "天地图路网",
          source: new XYZ({
            url: "http://t4.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&z={z}&tk=38b1d96a75827a1b40b59e1b5e8f5b7e",
          }),
          name: "tdtLayer",
          data: "aaa",
        }),
      ],
      // 添加控件
      controls: defaultControls({
        attribution: false, // 禁用右下角的地图属性组件
        rotate: false, // 禁用旋转组件，会在右上角出现一个方框的控件，旋转地图之后就可以出现这个控件 同时按下 alt+shift键同时拖动鼠标就可以进行旋转
        zoom: false, // 禁用左上角缩放组件，就是那个加号和减号的两个方框
      }),
      // 地图交互的配置
      pixelRatio: window.devicePixelRatio, //物理像素与css像素分辨率的比值
      interactions: defaultInteractions({
        altShiftDragRotate: false, //禁用按住alt+shift拖拽旋转
        doubleClickZoom: false, //禁用双击缩放
        dragPan: false, //禁用平面拖拽
      }),
      // 加载瓦片数
      maxTilesLoading: 16, //同时加载的最大的瓦片数量，默认是16
      // 光标必须移动的最小的距离（以像素为单位）才能被监测为地图移动事件而不是单击
      moveTolerance: 500,
      //   有图层之后还要配置视口
      view: new View({
        center: [113.24, 23.12], //设置中心位置
        projection: "EPSG:4326", //指定投影
        zoom: 12, //缩放级别
      }),
    })
  },
}
</script>
<style scoped>
#map {
  height: 100%;
  width: 100%;
}
</style>
