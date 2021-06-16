import { FC } from "react";
import { View } from "@tarojs/components";
import OSMap from "../os_map";
import OSModalTable from "../os_modal/modal_table";
import OSTable from "../os_table";
import { useBehavior, useTableData, useTypeBehvios } from "./behavior";
import './index.scss'
import { IOSSubjectProps, selectMapType } from "./types";



const OSSubjectMenu: FC<IOSSubjectProps> = ({
  title,
  data,
}) => {

  const { tData, fdata, visiable, setVisiable, handleEvent } = useBehavior(selectMapType);
  const { headData, bodyData } = useTableData(fdata, data.data);


  const { label, seriesData } = useTypeBehvios(fdata.mapType, bodyData, 'select', fdata.numType)

  return (
    <View className='content-map'>
      <View className='content-topic__tit'>
        <View>{title}</View>
        <View className='iconfont icon-menu' onClick={() => { setVisiable(!visiable) }}></View>
      </View>
      <View className='content-topic__map'>
        <OSModalTable data={tData} mapType={selectMapType} visiable={visiable} handleEvent={handleEvent}></OSModalTable>
        {fdata.showType[0] && <OSMap mapType={fdata.mapType} label={label} seriesData={seriesData}></OSMap>}
        {fdata.showType[1] && <OSTable headData={headData} bodyData={bodyData}></OSTable>}
      </View>
    </View>
  );
};

export default OSSubjectMenu;
