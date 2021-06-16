/** @format */

import { mapType } from "../os_map/types";

export type numType = "count" | "percent";

export interface IFilterData {
  mapType: mapType;
  numType: numType;
  showType: Array<boolean>;
}

export interface IModalTableProps {
  data: IFilterData;
  visiable: boolean;
  mapType: Array<mapType>;
  handleEvent: Function;
}
