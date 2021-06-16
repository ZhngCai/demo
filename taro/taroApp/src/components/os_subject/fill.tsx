import { FC } from "react";
import { View, Text } from "@tarojs/components";
import { IOSSubjectProps } from "./types";
import './index.scss'
import OSHr from "../os_base/os_hr";

const OSSubjectFill: FC<IOSSubjectProps> = ({
  title,
  data,
  handleClick
}) => {
  return (
    <View className='content-link'>
      <View className='content-topic__tit '>
        <View className='os-h3'>{title}</View>
      </View>
      <OSHr direction='hor'></OSHr>
      <View className='content-topic__link' onClick={() => { handleClick && handleClick(data.data.local_id, 'fill') }}>
        <View className='os-p'>
          <Text>查看全部回答</Text>
          <Text className='iconfont icon-enter'> </Text>
        </View>
      </View>
    </View>
  );
};

export default OSSubjectFill;
