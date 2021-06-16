import { FC, useEffect, useRef } from "react";
import { View } from "@tarojs/components";
import echarts from "./echarts";
import { IMapRadarProps } from "./types";

const OSMapRadar: FC<IMapRadarProps> = ({
  label,
  seriesData
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
      legend: {
        data: label[0].isMul ? label : []
      },
      radar: {
        indicator: label
      },
      series: [{
        type: 'radar',
        data: seriesData
      }]
    };
    chartInstance.setOption(option);
  }
  useEffect(() => {
    renderChart();
  }, [seriesData])
  return <View ref={main} style={{ width: '100%', height: '300px' }}></View>;
};

export default OSMapRadar;
