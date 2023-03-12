<template>
  <div id="map"></div>
</template>
<script>
import { Map, View } from "ol"
import TileLayer from "ol/layer/Tile"
import OSM from "ol/source/OSM"
import { inAndOut, easeIn, easeOut, linear, upAndDown } from "ol/easing"
export default {
  name: "ViewDesc",
  data() {
    return {
      map: null,
    }
  },
  mounted() {
    this.map = new Map({
      target: "map", //指定挂载DOM,注意必须是id
      layers: [
        new TileLayer({
          source: new OSM(), //加载openstreetmap
        }),
      ],
      //   配置视图
      view: new View({
        center: [113.24, 23.12], //视图中心位置
        projection: "EPSG:4326", //指定投影，1984参考系的投影
        zoom: 12, //缩放到的级别
        // constrainRotation:4,//true/false没有约束，值为4就是将旋转限制为0,90,180,270度
        //enableRotation:true,
        extent: [-180.0, 0.0, 180.0, 90.0], //左下角经度，左下纬度，右上经度，右上纬度
        constrainOnlyCenter: false, //如果为true,则范围约束将仅适用于视图中心而不是整个范围
        smoothExtentConstraint: true, //如果为true,范围约束将被平滑的应用，即允许视图稍微超出给定的extent
        maxResolution: 256, //如果未指定，则以投影的有效范围适合256*256像素图块的方式计算
        minResolution: 256, //如果未指定，则以投影的有效范围适合256*256像素图块的方式计算
        maxZoom: 29, //用于确定分辨率约束的最大缩放级别
        minZoom: 0,
        multiWorld: true, //如果false视图受到约束，因此只有一个世界可见，并且无法平移边缘，如果是true地图
        constrainResolution: false, //如果为true,则视图将始终在交互后以最接近的缩放级别进行动画处理，false
        smoothResolutionConstraint: true, //如果为true,则视图将始终在交互后以最接近的缩放
        showFullExtent: true, //允许缩小视图以显示完整的配置范围
        resolution: "", //视图的初始分辨率，单位是projection每像素的单位（例如每像素米）
        resolutions: [50, 40, 30, 20, 10, 5, 2], //指定缩放级别的分辨率，数组中的索引对应于缩放级别，因此分辨率必须
        rotation: Math.PI / 2, //以弧度为单位的视图初始旋转（顺时针旋转，0，表示北）
        zoomfactor: 2, //用于计算相应的分辨率的缩放因子
        padding: [150, 150, 150, 150], //与四周的边距，填充顺序是上右下左（以css像素为单位）
      }),
    })
    setTimeout(() => {
      // this.adjustMethod()
      this.animateMethod()
    }, 5000)
  },
  methods: {
    adjustMethod() {
      console.log(this.map.getView())
      let view = this.map.getView()
      view.adjustCenter([-10, 3]) //将相对坐标添加到视图的中心
      view.adjustResolution(3) //将试图分辨率乘以一个比率
      view.adjustRotation(Math.PI / 2) //向视图旋转添加一个值
      view.adjustZoom(3, [100, 25])
    },
    animateMethod() {
      let view = this.map.getView()
      view.animate(
        { zoom: 10, rotation: Math.PI / 2, duration: 2000 },
        { center: [116.3, 39.9], easing: easeOut, duration: 10000 }
      )
      setTimeout(() => {
        // 取消动画
        view.cancelAnimations()
      }, 3000)
    },
    otherMethod() {
      let view = this.map.getView()
      let extent = [106.36, 30.9, 116.36, 39.9]
      view.fit(extent, {
        constrainResolution: false,
        earest: true,
        duration: 3000,
        callback: () => {
          console.log("111111")
        },
      })
    },
  },
}
</script>
<style scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>
