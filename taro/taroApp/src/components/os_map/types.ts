/** @format */

export type mapType =
  | "circle" //饼图
  | "ring" //环图
  | "column" //柱状图
  | "bar" //条状图
  | "radar" //雷达图
  | "stackedHorBar" //条状堆叠图
  | "stackedColBar"; //柱状堆叠图

export type dataType = "count" | "percent";

export const EMAP = {
  ring: "圆环图",
  circle: "饼图",
  column: "柱形图",
  bar: "条形图",
  radar: "雷达图",
  stackedHorBar: "条状堆叠图",
  stackedColBar: "柱状堆叠图",
};

export type labelType = Array<string | number>;

//bar column
export interface IMapBarSeriesProps {
  name?: number | string;
  data: Array<number>;
  type: "bar";
  label: {
    show: true;
    formatter?: Function | string;
  };
}

export type TMapBarSeriesDataType = Array<IMapBarSeriesProps>;
export interface IMapBarProps {
  dataType?: dataType;
  label: labelType;
  seriesData: TMapBarSeriesDataType;
}

// circle，ring
export interface IMapCircleSeriesProps {
  name: string;
  value: number;
  label: {
    formatter?: Function | string;
  };
}
export type TMapCircleDataType = Array<IMapCircleSeriesProps>;
export interface IMapCircleProps {
  seriesData: TMapCircleDataType;
}
//radar

export type TRaderLabel = Array<{
  isMul: false;
  name: string;
}>;
export interface IMapRadarSeriesProps {
  name: string;
  value: Array<string | number>;
}
export type TMapRadarDataType = Array<IMapRadarSeriesProps>;
export interface IMapRadarProps {
  label: TRaderLabel;
  seriesData: TMapRadarDataType;
}

//stackedColBar  stackedHorBar
export interface IMapStackedSeriesProps {
  name: number | string;
  data: Array<number>;
  type: "bar";
  stack: "total";
  label: {
    show: true;
    formatter?: Function | string;
  };
}

export type TMapStackedDataType = Array<IMapStackedSeriesProps>;

export interface MapStackedProps {
  label: labelType;
  seriesData: TMapStackedDataType;
}

export type MapDataProps =
  | TMapBarSeriesDataType
  | TMapCircleDataType
  | TMapRadarDataType
  | TMapStackedDataType;

export interface IOSMapProps {
  mapType?: mapType;
  label?: labelType | TRaderLabel;
  seriesData: MapDataProps;
}
