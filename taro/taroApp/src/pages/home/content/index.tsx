import { FC, useEffect, useState } from "react";
import { View, Text } from "@tarojs/components";

import OSDetailTable from "./report_table/detail";
import { HTTPGridHeaderRow } from "../../../service";
import OSReportMap from "./report_map";
import { useGlobalContext } from "../../../context";
import storage from "../../../utils/storage";
import './index.scss'


const OSContent: FC = () => {
  const {
    editScrollEvent: { getScrollEventFun },
    editHeaderRow: { headerRow, setHeaderRow },
  } = useGlobalContext();
  const [tab, setTab] = useState<string>('report');
  const survey_id = storage.get('surveyId');
  const handleTabChange = (val: string) => () => {
    getScrollEventFun.remove();
    setTab(val);
  }

  useEffect(() => {
    getHTTPGridHeaderRow(survey_id);
  }, [])



  const getHTTPGridHeaderRow = (surveyId: string) => {
    HTTPGridHeaderRow(surveyId).then(resp => {
      setHeaderRow(resp)
    })
  }


  return (
    <View className='content'>
      <View className='content-menu'>
        <View className={`content-menu-p ${tab == 'report' ? 'active' : ''}`} onClick={handleTabChange('report')}>
          <Text className='content-menu-text'>统计报表</Text>
        </View>
        <View className={`content-menu-p ${tab == 'detail' ? 'active' : ''}`} onClick={handleTabChange('detail')}>
          <Text className='content-menu-text'>数据详情</Text>
        </View>
      </View>
      {
        tab == 'report' && headerRow.headers &&
        (
          <OSReportMap></OSReportMap>
        )
      }
      {/* {
        tab == 'detail' && headerRow.headers &&
        (
          <OSDetailTable></OSDetailTable>
        )
      } */}

    </View>
  );
};

export default OSContent;
