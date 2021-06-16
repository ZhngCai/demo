/** @format */

import { useState } from "react";
import { ICardDataWeight } from "./subject";
import { accMul, deepClone } from "../../utils/common";
import {
  IOSMapProps,
  IMapBarProps,
  IMapBarSeriesProps,
  IMapRadarProps,
  IMapRadarSeriesProps,
  MapStackedProps,
  IMapStackedSeriesProps,
  mapType,
} from "../os_map/types";
import { IHeadDataProps } from "../os_table/types";
import { IFilterData, numType } from "./types";

/**
 * 处理表单 ， headData表单头 ， bodyData表单body
 */
export function useTableData(hData: IFilterData, bDAta: Array<any>) {
  let headData: IHeadDataProps[] = [
    { title: "选项", key: "name" },
    { title: "回复情况", key: hData.numType },
  ];
  let isElse = false;
  bDAta.map((item: any) => {
    if (item.isElse) {
      isElse = true;
    }
  });
  if (isElse) {
    headData = [
      { title: "选项", key: "name" },
      { title: "回复情况", key: hData.numType },
      { title: "其他", key: "isElse" },
    ];
  }
  return {
    headData,
    bodyData: bDAta,
  };
}

/**
 * 处理打分题表单 ，  bodyData表单body
 */
export function useTableMarkData(bDAta: Array<any>) {
  let bodyData = deepClone(bDAta);
  bDAta.map((item: any, index) => {
    //  获得最大值
    let max = Math.max(
      ...item.value.map((item2: { rank: number }) => item2.rank)
    );
    //  获得最小值
    let min = Math.min(...item.value.map((item2: { rank: any }) => item2.rank));
    //  获得平均值
    let average = Math.round(
      item.value.reduce(
        (total: number, item: { count: number; rank: number }) => {
          let value = accMul(item.count, item.rank);
          return total + value;
        },
        0
      ) / item.total
    );

    bodyData[index].rankList.push("最大值", "最小值", "平均值");

    bodyData[index].value.push(
      {
        rank: "最大值",
        count: max,
      },
      {
        rank: "最小值",
        count: min,
      },
      {
        rank: "平均值",
        count: average,
      }
    );
  });

  return {
    bodyData: bodyData,
  };
}

/**
 * 处理权重题表单 ， headData表单头 ， bodyData表单body
 */
export function useTableWeightData(bDAta: Array<any>) {
  let headData = [
    { title: "选项", key: "name" },
    { title: "平均数", key: "average" },
    { title: "最小值", key: "min" },
    { title: "最大值", key: "max" },
  ];

  const bodyData: ICardDataWeight[] = bDAta.map((item: any) => {
    //  获得最大值
    let max = Math.max(
      ...item.value.map((item2: { rank: number }) => item2.rank)
    );
    //  获得最小值
    let min = Math.min(...item.value.map((item2: { rank: any }) => item2.rank));
    //  获得平均值
    let average = Math.round(
      item.value.reduce(
        (total: number, item: { count: number; rank: number }) => {
          let value = accMul(item.count, item.rank);
          return total + value;
        },
        0
      ) / item.total
    );
    return {
      name: item.name,
      max,
      min,
      average,
    };
  });

  return {
    headData,
    bodyData,
  };
}

/**
 * 处理弹窗的交互 ， tdata弹窗数据 ， fdata图形数据
 */
export function useBehavior(_SMapType: Array<mapType>) {
  const [visiable, setVisiable] = useState(false);
  let initData: IFilterData = {
    mapType: _SMapType[0],
    numType: "count",
    showType: [true, false],
  };
  const [tData, setTdata] = useState<IFilterData>(initData);
  const [fdata, setFdata] = useState<IFilterData>(initData);

  const handleEvent = (type: string, val?: any) => () => {
    switch (type) {
      case "mapChange":
        handleMapChange(val);
        break;
      case "numChange":
        handleNumChange(val);
        break;
      case "showChange":
        handleShowChange(val);
        break;
      case "submit":
        handleSubmit();
        break;
      case "cancle":
        handleCancle();
        break;
      default:
        break;
    }
  };

  const handleMapChange = (val: mapType) => {
    setTdata({ ...tData, mapType: val });
  };

  const handleNumChange = (val: numType) => {
    setTdata({ ...tData, numType: val });
  };

  const handleShowChange = (val: string) => {
    let data = JSON.parse(JSON.stringify(tData));
    switch (val) {
      case "map":
        data.showType[0] = !tData.showType[0];
        break;
      case "table":
        data.showType[1] = !tData.showType[1];
        break;
      default:
        break;
    }
    setTdata(data);
  };

  const handleSubmit = () => {
    setFdata(tData);
    setVisiable(!visiable);
  };

  const handleCancle = () => {
    setTdata(fdata);
    setVisiable(!visiable);
  };

  return {
    tData,
    fdata,
    visiable,
    setVisiable,
    handleEvent,
  };
}

/**
 * 环形，饼图 数据转换
 */
function toMapCircleData(params: Array<any>, numType: string) {
  let data = params.map((item) => {
    return {
      name: item.name,
      value: numType == "percent" ? accMul(item.percent, 100) : item.count,
      label: {
        formatter: numType == "percent" ? "{c}%" : "{c}",
      },
    };
  });

  return data;
}

/**
 * 雷达图 数据转换
 */
function toMapRaderData(params: Array<any>, subType: string, numType: string) {
  const data: IMapRadarProps = {
    label: [],
    seriesData: [],
  };
  data.label = params;
  if (subType == "select_mul") {
    params[0].isMul = false;
    let seriesDataJson: IMapRadarSeriesProps = {
      name: "",
      value: [],
    };
    seriesDataJson.value = params.map((item) =>
      numType == "percent" ? accMul(item.percent, 100) : item.count
    );
    data.seriesData.push(seriesDataJson);
  } else {
    params[0].isMul = true;
    params.map((item) => {
      let seriesDataJson: IMapRadarSeriesProps = {
        name: "",
        value: [],
      };
      seriesDataJson.name = item.name;
      seriesDataJson.value = item.value.map(
        (item2: { percent: number; count: any }) =>
          numType == "percent" ? accMul(item2.percent, 100) : item2.count
      );
      data.seriesData.push(seriesDataJson);
    });
  }

  return data;
}

/**
 * 权重题条形图 数据转换
 */
function toMapWeightBarData(params: Array<any>, numType: string) {
  const data: IMapBarProps = {
    label: [],
    seriesData: [],
  };
  let seriesDataJson: IMapBarSeriesProps = {
    name: "",
    data: [],
    type: "bar",
    label: {
      show: true,
      formatter: numType == "percent" ? "{c}%" : "{c}",
    },
  };

  params.map((item: { name: any; value: any }) => {
    data.label.push(item.name);
  });

  //  获得最大值
  let max = params.map((item) => {
    return Math.max(...item.value.map((item2: { rank: any }) => item2.rank));
  });

  let maxData: IMapBarSeriesProps = {
    ...seriesDataJson,
    name: "最大值",
    data: max,
  };

  //  获得最小值
  let min = params.map((item) => {
    return Math.min(...item.value.map((item2: { rank: any }) => item2.rank));
  });
  let minData: IMapBarSeriesProps = {
    ...seriesDataJson,
    name: "最小值",
    data: min,
  };

  //  获得平均值
  let average = params.map((item) => {
    return Math.round(
      item.value.reduce(
        (total: number, item: { count: number; rank: number }) => {
          let value = accMul(item.count, item.rank);
          return total + value;
        },
        0
      ) / item.total
    );
  });
  let averageData: IMapBarSeriesProps = {
    ...seriesDataJson,
    name: "平均值",
    data: average,
  };

  data.seriesData = [maxData, averageData, minData];

  return data as IMapBarProps;
}

/**
 * 条形图 数据转换
 */
function toMapBarData(params: Array<any>, numType: string) {
  const data: IMapBarProps = {
    label: [],
    seriesData: [
      {
        data: [],
        type: "bar",
        label: {
          show: true,
        },
      },
    ],
  };
  params.map((item) => {
    let value: number;
    if (numType == "percent") {
      value = accMul(item.percent, 100);
      data.seriesData[0].label.formatter = "{c}%";
    } else {
      value = item.count;
      data.seriesData[0].label.formatter = "{c}";
    }
    data.seriesData[0].data.push(value);
    data.label.push(item.name);
  });
  return data as IMapBarProps;
}

/**
 * 堆积图 数据转换
 */
function toMapStackedData(params: Array<any>, numType: string) {
  const data: MapStackedProps = {
    label: params[0].rankList,
    seriesData: [],
  };
  let seriesDataJson: IMapStackedSeriesProps = {
    name: "",
    data: [],
    type: "bar",
    stack: "total",
    label: {
      show: true,
      formatter: numType == "percent" ? "{c}%" : "{c}",
    },
  };
  params.map((item: { name: any; value: any }) => {
    const json: IMapStackedSeriesProps = {
      ...seriesDataJson,
      name: item.name,
      data: item.value.map((item2: { percent: any; count: any }) =>
        numType == "percent" ? accMul(item2.percent, 100) : item2.count
      ),
    };
    data.seriesData.push(json);
  });
  return data;
}

/**
 * 对传入的data重新封装成os_map对应的seriesData
 */
export function useTypeBehvios(
  type: string,
  data: any,
  subType: string,
  numType: string
) {
  let datas: IOSMapProps = {} as IOSMapProps;
  switch (type) {
    case "circle":
    case "ring":
      datas.label = [];
      datas.seriesData = toMapCircleData(data, numType);
      break;
    case "radar":
      datas = toMapRaderData(data, subType, numType);
      break;
    case "column":
    case "bar":
      if (subType == "weight") {
        datas = toMapWeightBarData(data, numType);
      } else {
        datas = toMapBarData(data, numType);
      }
      break;
    case "stackedHorBar":
    case "stackedColBar":
      datas = toMapStackedData(data, numType);
      break;

    default:
      break;
  }
  return datas;
}
