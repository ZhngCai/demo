import Taro, {
    Component
  } from '@tarojs/taro';
  import {
    View,
    Text,
    Image
  } from '@tarojs/components';
  import './index.scss'
  import * as echarts from "@/ec-canvas/echarts";
import { useEffect, useState } from 'react';
  let chart = null;
 function Eccanvas(props) {
     console.log(props)
     const [updateEchart,setUpdateEchart] = useState(false);
     const serList =  props.sclist.map(()=>{return 1})
    function initChart(canvas, width, height, dpr) {
        chart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        canvas.setChart(chart);
      
        var option = {
            title: {
                text: 'ECharts'
            },
            tooltip: {},
            legend: {
                data:['todolist']
            },
            xAxis: {
                data: props.sclist
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: serList
            }]
        };
      
        chart.setOption(option);
        return chart;
      }

      useEffect(()=>{
        setUpdateEchart(true);
        console.log("useEffect")
      },[])

      const ss = {
          ec:{
            onInit: initChart
          }
           
      }
     
    return (
        <>
        <View className="echartClass">
        <ec-canvas id="mychart-dom-bar" canvas-id="mychart-bar" ec={ss.ec} ></ec-canvas>
            
        </View>
      </>
      )
 }
export default  Eccanvas;
