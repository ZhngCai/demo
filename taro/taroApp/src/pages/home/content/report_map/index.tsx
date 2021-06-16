import { FC, useEffect, useRef } from "react";
import { View } from "@tarojs/components";

import {
  OSSubjectSelect,
  OSSubjectSelectMul,
  OSSubjectFill,
  OSSubjectIconMark,
  OSSubjectValueMark,
  OSSubjectSequence,
  OSSubjectPredef,
  OSSubjectLocation,
  OSSubjectSlideRate,
  OSSubjectWeight,
  OSSubjectUpload,
  OSSubjectVerify
} from "../../../../components/os_subject";

import { useBehavior } from "./berhavior";
import OSSubjectMenu from "../../../../components/os_subject/menu";
import '../index.scss'
import { useGlobalContext } from "../../../../context";
import { TCardNameTypeBlank } from "../../../../components/os_subject/subject";
import storage from "../../../../utils/storage";
import './index.scss'


const OSReportMap: FC = () => {
  const {
    editScrollEvent: { setScrollEventFun },
  } = useGlobalContext();
  const survey_id = storage.get('surveyId');
  const loadingRef = useRef<HTMLDivElement>(null);
  const { fdata, loading, getHTTPGetDataAnalysis, handleScroll } = useBehavior(loadingRef);

  const handleClick = (id: string, type: TCardNameTypeBlank) => {
    removeEventScroll();
    // history.push(`/answer/${type}/${id}`);
  }

  useEffect(() => {
    addEventScroll();
    getHTTPGetDataAnalysis(survey_id);
    return () => {
      removeEventScroll()
    }
  }, [])


  const addEventScroll = () => {
    window.addEventListener('scroll', handleScroll)
  }
  const removeEventScroll = () => {
    window.removeEventListener('scroll', handleScroll)
  }

  setScrollEventFun.add(addEventScroll);

  setScrollEventFun.remove(removeEventScroll);

  return (
    <View className='os-map'>
      <View className='os-map-row'>
        {
          fdata.map((item, index) => (
            <View className='content-topic' key={index}>
              {
                (item.type == 'select' && <OSSubjectSelect title={`Q${index + 1}.单选题`} data={item}></OSSubjectSelect>
                ) ||
                (item.type == 'select_mul' && <OSSubjectSelectMul title={`Q${index + 1}.多选题`} data={item}></OSSubjectSelectMul>)
                ||
                (item.type == 'fill' && <OSSubjectFill title={`Q${index + 1}.填空题`} handleClick={handleClick} data={item}></OSSubjectFill>)
                ||
                (item.type == 'icon_mark' && <OSSubjectIconMark title={`Q${index + 1}.图形打分题`} data={item}></OSSubjectIconMark>)
                ||
                (item.type == 'value_mark' && <OSSubjectValueMark title={`Q${index + 1}.分值打分题`} data={item}></OSSubjectValueMark>)
                ||
                (item.type == 'menu' && <OSSubjectMenu title={`Q${index + 1}.下拉菜单题`} data={item}></OSSubjectMenu>)
                ||
                (item.type == 'sequence' && <OSSubjectSequence title={`Q${index + 1}.排序题`} data={item}></OSSubjectSequence>)
                ||
                (item.type == 'predef' && <OSSubjectPredef title={`Q${index + 1}.地域题`} handleClick={handleClick} data={item}></OSSubjectPredef>)
                ||
                (item.type == 'location' && <OSSubjectLocation title={`Q${index + 1}.定位题`} handleClick={handleClick} data={item}></OSSubjectLocation>)
                ||
                (item.type == 'slide_rate' && <OSSubjectSlideRate title={`Q${index + 1}.演示评价题`} data={item}></OSSubjectSlideRate>)
                ||
                (item.type == 'weight' && <OSSubjectWeight title={`Q${index + 1}.权重题`} data={item}></OSSubjectWeight>)
                ||
                (item.type == 'verify' && <OSSubjectVerify title={`Q${index + 1}.验证题`} handleClick={handleClick} data={item}></OSSubjectVerify>)
                ||
                (item.type == 'upload' && <OSSubjectUpload title={`Q${index + 1}.上传题`} handleClick={handleClick} data={item}></OSSubjectUpload>)
              }
            </View>
          ))
        }
      </View>
      {
        loading && <View className='loading' ref={loadingRef}></View>
      }
    </View>
  );
};

export default OSReportMap;
