import { FC } from "react";
import { View } from "@tarojs/components";
import OSMap from "../os_map";
import OSModalTable from "../os_modal/modal_table";
import OSTableRank from "../os_table/rank";
import { useBehavior, useTableMarkData, useTypeBehvios } from "./behavior";
import './index.scss'

import { IOSSubjectProps, sequenceMapType } from "./types";

const OSSubjectValueMark: FC<IOSSubjectProps> = ({
  title,
  data
}) => {

  const { tData, fdata, visiable, setVisiable, handleEvent } = useBehavior(sequenceMapType);
  const { bodyData } = useTableMarkData(data.data);
  const { label, seriesData } = useTypeBehvios(fdata.mapType, data.data, 'value_mark', fdata.numType)

  return (
    <View className='content-map'>
      <View className='content-topic__tit'>
        <View>{title}</View>
        <View className='iconfont icon-menu' onClick={() => { setVisiable(!visiable) }}></View>
      </View>
      <View className='content-topic__map'>
        <OSModalTable data={tData} mapType={sequenceMapType} visiable={visiable} handleEvent={handleEvent}></OSModalTable>
        {fdata.showType[0] && <OSMap mapType={fdata.mapType} label={label} seriesData={seriesData}></OSMap>}
        {fdata.showType[1] && <OSTableRank bodyData={bodyData}></OSTableRank>}
      </View>
    </View>
  );
};

export default OSSubjectValueMark;
