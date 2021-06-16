import { FC } from "react";
import { View } from "@tarojs/components";
import { EMAP } from "../os_map/types";
import { IModalTableProps } from "./types";
import './index.scss'
import OSButton from "../os_base/os_button";


const OSModalTable: FC<IModalTableProps> = ({
  data,
  visiable,
  mapType,
  handleEvent,
}) => {
  return (
    <View className='conten-topic__map-modal' style={{ display: visiable ? 'block' : 'none' }}>
      <View className='conten-topic__map-modal-table'>
        <View className='os-h4'>图表内型</View>
        <View className='conten-topic__map-modal-table-tr'>
          {
            mapType.map((item, index) => (
              <View key={index} className={`os-p ${data.mapType == item ? 'active' : ''}`} onClick={handleEvent('mapChange', item)}>{EMAP[item]}</View>
            ))
          }
        </View>
        <View className='os-h4'>数值/百分比</View>
        <View className='conten-topic__map-modal-table-tr'>
          <View className={`os-p ${data.numType == 'count' ? 'active' : ''}`} onClick={handleEvent('numChange', 'count')}>显示数值</View>
          <View className={`os-p ${data.numType == 'percent' ? 'active' : ''}`} onClick={handleEvent('numChange', 'percent')}>显示百分比</View>
        </View>
        <View className='os-h4'>显示设置</View>

        <View className='conten-topic__map-modal-table-tr'>
          <View className={`os-p ${data.showType[0] ? '' : 'active'}`} onClick={handleEvent('showChange', 'map')}>隐藏图表</View>
          <View className={`os-p ${data.showType[1] ? '' : 'active'}`} onClick={handleEvent('showChange', 'table')}>隐藏表格</View>
        </View>
      </View>
      <View className='conten-topic__map-modal-btn'>
        <OSButton className='conten-topic__map-modal-btn__cancle' onClick={handleEvent('cancle')}>取消</OSButton>
        <OSButton className='conten-topic__map-modal-btn__submit' onClick={handleEvent('submit')}>确定</OSButton>
      </View>

    </View>
  );
};

export default OSModalTable;
