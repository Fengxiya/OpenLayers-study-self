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
import { defaults as defaultControls, Zoom } from "ol/control.js"
// 地图交互的库
import { defaults as defaultInteractions, DragPan } from "ol/interaction.js"
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
    // map方法
    // add开头的方法
    // 添加缩放的控件
    this.map.addControl(new Zoom())
    // 添加交互
    this.map.addInteraction(new DragPan())
    // 添加图层
    this.map.addLayer(
      new TileLayer({
        title: "OpenStreetMap",
        source: new OSM(), //加载openstreetmap
        name: "OpenStreetMap",
      })
    )
    // 拿到所有的图层
    console.log(this.map.getLayer())
    // 添加叠加层
    // this.map.addOverlay()
    // on是用来绑定事件的
    this.map.on("click", (event) => {
      console.log("调度事件并调用所有侦听此类型事件的侦听器")
      this.map.dispatchEvent("dbclick")
    })
    // 单击事件
    this.map.on("singleclick", (event) => {
      // 获取到地图上加载的所有的控件
      let controls = this.map.getControls()
      console.log(controls)
      // 获取给定像素的投影坐标
      let coordinateFromPixel = this.map.getCoordinateFromPixel(event.pixel)
      console.log(coordinateFromPixel)
    })
  },
  methods: {
    // on开头的函数
    onMethodHandler() {
      this.map.once("singleclick", (event) => {
        console.log("once")
      })
    },
  },
  // remove开头的事件
  removeMethodHandler() {
    let zoom = new Zoom()
    this.map.addControl(zoom)
    let controls = this.map.getControls()
    for (let i = 0; i < controls.getArray().length; i++) {
      const control = controls.getArray()[i]
      this.map.removeControl(control)
    }
  },
  // set开头的方法
  setMethodHandler() {
    // 设置属性
    this.map.setProperties("a", "aa")
    let htmlDivElement = document.createElement("div")
    htmlDivElement.id = "newMap"
    document.body.appendChild(htmlDivElement)
    // 放置到另外一个元素里面
    this.map.setTarget(htmlDivElement)
    // 渲染
    this.map.render()
    this.map.getProperties() //获取属性值
    this.map.getTarget() //获取地图容器，这个就会返回地图容器的id
  },
  unMethodHandler() {
    // 不监听某种类型的事件，与on对应
    // un(type,listener)
    // 取消设置属性,与set对应
    // unset(key,opt_silent)
  },
  // 强制重新计算地图视口的大小
  undateSize() {},
  // 渲染的方法
  renderMethodHandler() {
    // 在下一个动画帧请求地图渲染
    render()
    // 以同步方式请求立即渲染
    renderSync()
  },
}
</script>
<style scoped>
#map {
  height: 100%;
  width: 100%;
}
</style>
