/** @format */

import { IPageInfo } from "@choiceform/os-api";
import { IBodyRow } from "@choiceform/os-api/dist/es6/data-grid";
import {
  ICardDataWeight,
  ICardDataCateAndCheck,
  TSubjectData,
} from "../os_subject/subject";

/** @format */
export interface IHeadDataProps {
  title: string;
  key: string;
  isElse?: boolean;
}

export interface ITableCateAndCheckProps {
  headData: Array<IHeadDataProps>;
  bodyData: Array<ICardDataCateAndCheck | ICardDataWeight>;
}

export interface ITableProps {
  headData: Array<IHeadDataProps>;
  bodyData: Array<TSubjectData>;
}

export interface ITableAnswerProps {
  bodyData: IPageInfo<IBodyRow>;
}

export interface ITableRankProps {
  bodyData: Array<TSubjectData>;
}
