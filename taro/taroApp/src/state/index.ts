/** @format */

/* eslint-disable no-unused-vars */
import { IHeader } from "@choiceform/os-api/dist/es6/data-grid";
import { useState } from "react";

/**
 * 缓存survey_id
 */
export interface ISurveyIdState {
  survey_id: string;
  setSurveyId(id: string): void;
}

export function useSurveyId() {
  const [survey_id, setSurveyId] = useState<string>("");
  return {
    survey_id,
    setSurveyId: (id: string) => setSurveyId(id),
  };
}

/**
 * 缓存headRow
 */
export interface IHeaderRow {
  headers: IHeader<any>[];
}

export interface IHeaderRowState {
  headerRow: IHeaderRow;
  setHeaderRow(head: IHeaderRow): void;
}

export function useHeaderRow(): IHeaderRowState {
  const [headerRow, setHeaderRow] = useState<IHeaderRow>({} as IHeaderRow);
  return {
    headerRow,
    setHeaderRow: (head: IHeaderRow) => setHeaderRow(head),
  };
}

/**
 * 缓存scroll监听事件
 */

interface IScrollGetProps {
  add: Function;
  remove: Function;
}

interface IScrollSetProps {
  add(cb: Function): void;
  remove(cb: Function): void;
}

export interface IScollState {
  getScrollEventFun: IScrollGetProps;
  setScrollEventFun: IScrollSetProps;
}

export function useScollState() {
  let eventFun: IScrollGetProps = {
    add: () => {},
    remove: () => {},
  };
  return {
    getScrollEventFun: {
      add: () => {
        eventFun.add();
      },
      remove: () => {
        eventFun.remove();
      },
    },
    setScrollEventFun: {
      add: (cb: Function) => {
        eventFun.add = cb;
      },
      remove: (cb: Function) => {
        eventFun.remove = cb;
      },
    },
  };
}
