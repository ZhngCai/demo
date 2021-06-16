import { FC, useEffect, useRef } from "react";
import { View } from "@tarojs/components";
import echarts from "./echarts";
import { IMapCircleProps } from "./types";
// import * as echarts from './echarts';

const OSMapRing: FC<IMapCircleProps> = ({
  seriesData,
}) => {

  const main = useRef<HTMLDivElement>(null);
  let chartInstance: echarts.ECharts;
  let renderChart = () => {
    const myChart = echarts.getInstanceByDom(main.current as HTMLDivElement);
    if (myChart) {
      chartInstance = myChart;
    } else {
      chartInstance = echarts.init(main.current as HTMLDivElement);
    }
    fetchData()
  }

  const fetchData = () => {
    let option = {
      tooltip: {
        trigger: 'item',
        formatter: ' {c} ({d}%)'
      },

      series: [
        {
          type: 'pie',
          radius: ['40%', '60%'],
          center: ['50%', '50%'],
          // selectedMode: 'single',
          data: seriesData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    chartInstance.setOption(option);
  }
  useEffect(() => {
    renderChart();
  }, [seriesData])
  return <View ref={main} style={{ width: '100%', height: '300px' }}></View>;
};

export default OSMapRing;
