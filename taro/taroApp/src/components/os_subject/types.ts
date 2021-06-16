/** @format */

import { mapType } from "../os_map/types";

export type numType = "count" | "percent";

export interface IOSSubjectProps {
  title?: string; //标题（暂时）
  index?: number; //序号
  data: any; //数据
  handleClick?: Function; //非图像传入点击事件
}

export interface IFilterData {
  mapType: mapType;
  numType: numType;
  showType: Array<boolean>;
}

export const selectMapType: Array<mapType> = [
  "bar",
  "column",
  "ring",
  "circle",
];

export const selectMulMapType: Array<mapType> = ["bar", "column", "radar"];

export const sequenceMapType: Array<mapType> = [
  "stackedColBar",
  "stackedHorBar",
  "radar",
];
