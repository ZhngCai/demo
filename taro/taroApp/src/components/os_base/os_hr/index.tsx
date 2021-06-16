
import { FC } from "react";
import { View } from "@tarojs/components";
import './index.scss'
import { OSHrProps } from "./type";

const OSHr: FC<OSHrProps> = ({ direction, }) => {

  return (
    <View className={direction == 'hor' ? 'os-hr-hor' : 'os-hr-ver'}></View>
  );
};

export default OSHr;
