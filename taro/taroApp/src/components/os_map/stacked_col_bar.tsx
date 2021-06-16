import { FC, useEffect, useRef } from "react";
import { View } from "@tarojs/components";
import echarts from "./echarts";
import { MapStackedProps } from "./types";

const OSMapStackedColBar: FC<MapStackedProps> = ({
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
        data: seriesData.map((item) => item.name)
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: label
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: seriesData
    };
    chartInstance.setOption(option);
  }
  useEffect(() => {
    renderChart();
  }, [seriesData])
  return <View ref={main} style={{ width: '100%', height: '300px' }}></View>;
};

export default OSMapStackedColBar;
