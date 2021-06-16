import { FC, useEffect, useState } from "react";

import './index.scoped.scss'

import OSDetailTable from "./report_table/detail";
import { HTTPGridHeaderRow } from "../../../service";
import OSReportMap from "./report_map";
import { getLocalStorage } from "../../../utils/common";
import { useGlobalContext } from "../../../context";

const OSContent: FC = () => {
  const {
    editScrollEvent: { getScrollEventFun },
    editHeaderRow: { headerRow, setHeaderRow },
  } = useGlobalContext();
  const [tab, setTab] = useState<string>('report');
  const survey_id = getLocalStorage('surveyId');
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
    <div className='content'>
      <div className='content-menu'>
        <p className={tab == 'report' ? 'active' : ''} onClick={handleTabChange('report')}>
          <span>统计报表</span>
        </p>
        <p className={tab == 'detail' ? 'active' : ''} onClick={handleTabChange('detail')}>
          <span>数据详情</span>
        </p>
      </div>
      {
        tab == 'report' && headerRow.headers &&
        (
          <OSReportMap></OSReportMap>
        )
      }
      {
        tab == 'detail' && headerRow.headers &&
        (
          <OSDetailTable></OSDetailTable>
        )
      }

    </div>
  );
};

export default OSContent;
