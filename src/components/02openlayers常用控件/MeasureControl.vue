<template>
  <div id="map">
    <div class="MapTool">
      <el-row>
        <el-button
          type="primary"
          @click.stop.prevent="measureCtl('polygon')"
          >面积</el-button
        >
        <el-button
          type="success"
          @click.stop.prevent="measureCtl('LineString')"
          >距离</el-button
        >
      </el-row>
    </div>
  </div>
</template>
<script>
import * as ol from "ol"
import VectorSource from "ol/source/Vector"
import VectorLayer from "ol/layer/Vector"
import Style from "ol/style/Style"
import { Fill, Stroke, Circle } from "ol/style"

import { Map, View } from "ol"
import { XYZ, OSM } from "ol/source"
import TileLayer from "ol/layer/Tile"
import Style from "ol/style/Style"
import Fill from "ol/style/Fill"
import Stroke from "ol/style/Stroke"
import { defaults as defaultControl } from "ol/control.js"
import Draw from "ol/interaction/Draw"
import { Polygon, LineString } from "ol/geom"
import * as sphere from "ol/sphere"
import { unByKey } from "ol/Observable"
import { RuntimeGlobals } from "webpack"
// import { View } from "ol"
// 当前绘制的要素
let sketch
// 帮助提示框对象
let helpTooltipElement
// 帮助提示框显示的信息
let helpTooltip
// 测量工具提示框对象
let measureTooltipElement
// 用户正在绘制时的提示信息文本
let continueLineMsg = "点击继续绘制线"
let continuePolygonMsg = "点击继续绘制面"
// 事件监听
let listener
// 绘制交互
let draw
export default {
  name: "Measurecontrol",
  data() {
    return {
      map: null,
      checkList: ["OSM"],
    }
  },
  mounted() {
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
      layers: [TiandiMap_vec, TiandiMap_cia],
      view: new View({
        zoom: 12,
        center: [114, 30],
        projection: "EPSG:4326",
      }),
    })
  },
  methods: {
    // 定义测量方法
    measureCtl(measureType) {
      if (draw) {
        // 去掉上一次的交互绘制结果
        this.map.removeInteraction(draw)
      }
      // 定义一个数据源
      this.source = new VectorSource()
      this.vectorLayer = new vectorLayer({
        source: this.source,
        style: new Style({
          fill: new Fill({
            color: "rgba(255,255,255,0.2)",
          }),
          stroke: new Stroke({
            color: "#ffcc33",
            widht: 2,
          }),
          image: new Circle({
            radius: 7,
            fill: new Fill({
              color: "#ffcc33",
            }),
          }),
        }),
      })
      this.map.addLayer(this.vectorLayer)
      // 地图容器绑定鼠标移动事件，动态显示帮助提示框内容
      this.map.on("pointmove", this.pointerMoveHandler)
      // 地图绑定鼠标移出事件，鼠标移出时为帮助提示框设置隐藏样式
      this.map.getViewport().addEventListener("mouseout", () => {
        helpTooltipElement.addClass("hidden")
      })
      // 根据不同类型绘制交互
      this.addInteraction(measureType)
    },
    // 控制移动的函数
    pointerMoveHandler(event) {
      if (event.dragging) {
        return
      }
      // 当前默认提示信息
      var helpMsg = "点击开始绘制"
      // 判断集合类型设置相应的帮助提示信息
      if (sketch) {
        var geom = sketch.getGeometry()
        if (geom instanceof Polygon) {
          // 绘制多边形时提示相应内容
          helpMsg = continuePolygonMsg
        } else if (geom instanceof LineString) {
          // 绘制线时提示相应内容
          helpMsg = continueLineMsg
        }
      }
      helpTooltipElement.innerHTML = helpMsg //将提示信息设置到对话框中显示
      helpTooltip.setPosition(event.coordinate) //设置帮助提示框的位置
    },
    // 创建一个帮助提示框
    createHelpTooltip() {
      if (helpTooltipElement) {
        helpTooltipElement.parentNode.removeChild(helpTooltipElement)
      }
      helpTooltipElement = document.createElement("div")
      helpTooltipElement.className = "tooltip hidden"
      helpTooltip = new ol.Overlay({
        element: helpTooltipElement,
        offset: [15, 0],
        positioning: "center-left",
      })
      this.map.addOverlay(helpTooltip)
    },
    // 加载交互绘制控件函数
    addInteraction(measureType) {
      // 绘制的交互
      draw = new Draw({
        source: this.source, //测量绘制层数据源
        type: measureType, //几何图形类型
        style: new Style({
          // 绘制几何图形的样式
          fill: new Fill({
            color: "rgba(255,255,255,0.8)",
          }),
          stroke: new Stroke({
            color: "rgba(0,0,0,0.5)",
            lineDash: [10, 10],
            width: 2,
          }),
          image: new Circle({
            radius: 5,
            stroke: new Stroke({
              color: "rgba(0,0,0,0.7)",
            }),
            fill: new Fill({
              color: "rgba(255,255,255,0.5)",
            }),
          }),
        }),
      })
      // 将绘制交互事件添加到地图中
      this.map.addInteraction(draw)
      // 创建测量工具提示框
      this.createMeasureTooltip()
      // 创建帮助提示框
      this.createHelpTooltip()
      let _this = this
      // 绑定交互绘制工具开始绘制的事件
      draw.on("drawstart", (event) => {
        sketch = event.feature //绘制的要素
        var tooltipCoord = event.coordinate //绘制的坐标
        // 绑定change事件，根据绘制几何类型得到测量长度值或面积值，并将其设置到测量工具提示框中显示
        listener = sketch.getGeometry().on("change", (event) => {
          var geom = event.target //绘制几何要素
          var output
          if (geom instanceof Polygon) {
            output = _this.formatArea(geom) //面积值
            // 获取一个在几何体中内部的坐标点
            tooltipCoord = geom.getInteriorPoint().getCoordinates() //坐标
          } else if (geom instanceof LineString) {
            output = _this.formatLength(geom) //长度值
            // 测量长度获取到最后一个坐标
            tooltipCoord = geom.getLastCoordinate() //坐标
          }
          measureTooltipElement.innerHTML = output //将测量值设置到测量工具提示框中显示
          measureTooltip.setPosition(tooltipCoord) //设置测量工具提示框的显示位置
        })
      })
      // 绑定交互绘制工具结束绘制的事件
      draw.on("drawend", (event) => {
        measureTooltipElement.className = "tooltip tooltip-static" //设置测量提示框的样式
        measureTooltip.setOffset([0, -7])
        sketch = null //置空当前绘制的要素对象
        measureTooltipElement = null //置空测量工具提示框对象
        _this.createMeasureTooltip() //重新创建一个测试工具提示框显示结果
        // 解绑监听事件
        unByKey(listener)
      })
    },
    // 添加一个新的测量工具提示框
    createMeasureTooltip() {
      // 重置提示框
      if (measureTooltipElement) {
        measureTooltipElement.parentNode.removeChild(measureTooltipElement)
      }
      measureTooltipElement = document.createElement("div")
      measureTooltipElement.className = "tooltip tooltip-measure"
      // 提示框的覆盖层
      measureTooltip = new Overlay({
        element: measureTooltipElement,
        offset: [0, -15],
        positioning: "bottom-center",
      })
      this.map.addOverlay(measureTooltip)
    },
    // 测量面积
    formatArea(polygon) {
      var area
      // 使用测地学方法测量
      var sourceProj = this.map.getView().getProjection() //地图数据源投影坐标系
      var geom = polygon.clone().transform(sourceProj, "EPSG:4326") //将多边形要素坐标投影设置为EPSG:4326
      area = Math.abs(
        sphere.getArea(geom, { projection: sourceProj, radius: 6378137 })
      ) //获取面积
      var output
      if (area > 10000) {
        output =
          Math.round((area / 1000000) * 100) / 100 + " " + "km<sup>2</sup>" //换成km单位
      } else {
        output = Math.round(area * 100) / 100 + " " + "m<sup>2</sup>" //m为单位
      }
      return output //返回多边形的面积
    },
    // 测量长度
    formatLength(line) {
      var length
      // 使用测地学方法测量
      var sourceProj = this.map.getView().getProjection() //地图数据源投影坐标系
      length = sphere.getLength(line, {
        porjection: sourceProj,
        radius: 6378137,
      })
      var output
      if (length > 100) {
        output = Math.round((length / 1000) * 100) / 100 + " " + "km"
      } else {
        output = Math.round(length * 100) / 100 + " " + "m"
      }
      return output
    },
  },
}
</script>
<style scoped>
#map {
  width: 100%;
  height: 100%;
}
.MapTool {
  position: absolute;
  top: 0.5em;
  right: 0.5em;
  z-index: 999;
}
/* 提示框样式 */
#map >>> .tooltip {
  position: relative;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  border-left: 6px solid transparent;
  content: "";
  position: absolute;
  bottom: -6px;
  margin-left: -7px;
  left: 50%;
}
#map >>> .tooltip-static:before {
  border-top-color: #ffcc33;
}
</style>
