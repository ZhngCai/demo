/** @format */

import React, { FC, useContext } from "react";
import {
  IHeaderRowState,
  IScollState,
  ISurveyIdState,
  useHeaderRow,
  useScollState,
  useSurveyId
} from "../state";

/**
 * 全局上下文共享的状态
 */
export interface IGlobalContextState {
  /**
   * survey_id
   */
  editSurveyId: ISurveyIdState;
  /**
   * headerRow
   */
  editHeaderRow: IHeaderRowState;
  /**
   * scroll 监听方法
   */
  editScrollEvent: IScollState;
}

/**
 * 全局上下文
 */
export const GlobalContext = React.createContext<IGlobalContextState>(
  {} as IGlobalContextState
);

/**
 * 全局上下文提供者
 * @param props
 * @returns
 */
export const GlobalContextProvider: FC = props => {
  const state: IGlobalContextState = {
    editSurveyId: useSurveyId(),
    editHeaderRow: useHeaderRow(),
    editScrollEvent: useScollState(),
  };
  return (
    <GlobalContext.Provider value={state} >
      {props.children}
    </GlobalContext.Provider>
  );
};

/**
 * 使用全局是上下文
 * @returns
 */
export function useGlobalContext() {
  return useContext(GlobalContext);
}
