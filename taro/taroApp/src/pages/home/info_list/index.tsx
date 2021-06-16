import { ICollectorResponseStat } from "@choiceform/os-api";
import { View } from "@tarojs/components";
import { FC, useEffect, useState } from "react";
import { HTTPGetResponseStat } from "../../../service";
import './index.scss'

const OSInfoList: FC = () => {
  const [resp, setResp] = useState<ICollectorResponseStat>({} as ICollectorResponseStat);
  useEffect(() => {
    HTTPGetResponseStat().then((res) => {
      setResp(res);
    })
  }, [])
  return (
    <View className='info'>
      <View className='info-row'>
        <View className='info-row-p'>今日回收</View>
        <View className='info-row-p'>{resp.today_count}</View>
      </View>
      <View className='info-row'>
        <View className='info-row-p'>总回收量</View>
        <View className='info-row-p'>{resp.total_count}</View>
      </View>
      <View className='info-row'>
        <View className='info-row-p'>平均答题时长</View>
        <View className='info-row-p'>{resp.avg_time_consuming}</View>
      </View>
    </View>
  );
};

export default OSInfoList;
