import { FC } from "react";
import { View } from "@tarojs/components";
import { EMAP } from "../os_map/types";
import { IModalTableProps } from "./types";
import './index.scss'


const OSModalTable: FC<IModalTableProps> = ({
  data,
  visiable,
  mapType,
  handleEvent,
}) => {
  return (
    <View className='conten-topic__map-modal' style={{ display: visiable ? 'block' : 'none' }}>
      <View className='conten-topic__map-modal-table'>
        <View>图表内型</View>
        <View className='conten-topic__map-modal-table-tr'>
          {
            mapType.map((item, index) => (
              <View key={index} className={data.mapType == item ? 'active' : ''} onClick={handleEvent('mapChange', item)}>{EMAP[item]}</View>
            ))
          }
        </View>
        <View>数值/百分比</View>
        <View className='conten-topic__map-modal-table-tr'>
          <View className={data.numType == 'count' ? 'active' : ''} onClick={handleEvent('numChange', 'count')}>显示数值</View>
          <View className={data.numType == 'percent' ? 'active' : ''} onClick={handleEvent('numChange', 'percent')}>显示百分比</View>
        </View>
        <View>显示设置</View>

        <View className='conten-topic__map-modal-table-tr'>
          <View className={data.showType[0] ? '' : 'active'} onClick={handleEvent('showChange', 'map')}>隐藏图表</View>
          <View className={data.showType[1] ? '' : 'active'} onClick={handleEvent('showChange', 'table')}>隐藏表格</View>
        </View>
      </View>
      <View className='conten-topic__map-modal-btn'>
        <View className='conten-topic__map-modal-btn__cancle' onClick={handleEvent('cancle')}>取消</View>
        <View className='conten-topic__map-modal-btn__submit' onClick={handleEvent('submit')}>确定</View>
      </View>

    </View>
  );
};

export default OSModalTable;
