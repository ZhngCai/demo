import { FC } from "react";
import { View, Text } from "@tarojs/components";
import './index.scss'
import { IOSSubjectProps } from "./types";

const OSSubjectPredef: FC<IOSSubjectProps> = ({
  title,
  data,
  handleClick
}) => {
  return (
    <View className='content-link'>
      <View className='content-topic__tit '>
        <View>{title}</View>
      </View>
      <View className='content-topic__link' onClick={() => { handleClick && handleClick(data.data.local_id, 'predef') }}>
        <View>
          <Text>查看全部回答</Text>
          <Text className='iconfont icon-enter'> </Text>
        </View>
      </View>
    </View>
  );
};

export default OSSubjectPredef;
