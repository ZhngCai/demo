import { FC, useEffect, useRef } from "react";
import { View } from "@tarojs/components";
import echarts from "./echarts";
import { IMapBarProps } from "./types";

const OSMapBar: FC<IMapBarProps> = ({
  label,
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
    fetchData();
  }

  const fetchData = () => {
    let option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
      },
      yAxis: {
        type: 'category',
        data: label
      },
      series: seriesData
    };
    chartInstance.setOption(option);
  }
  useEffect(() => {
    renderChart();
  }, [seriesData])
  return <View ref={main} style={{ width: '100%', height: '300px' }}></View>;
};

export default OSMapBar;
