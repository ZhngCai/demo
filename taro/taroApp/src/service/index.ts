/** @format */

import { ICollectorResponseStat } from "@choiceform/os-api";
import { IGetCardsParams } from "@choiceform/os-api/dist/es6/data-analysis";
import {
  GetBodyRowsParams,
  ILayout,
} from "@choiceform/os-api/dist/es6/data-grid";
import { getApi } from "../api";
import storage from "../utils/storage";

/**
 *  获取问卷信息
 *
 *  @param surveyId
 * @returns
 */
export async function HTTPSurveyGet(surveyId: string) {
  const survey = await getApi().survey.get(surveyId);
  return survey;
}

/**
 * 获取收集器
 *
 * @returns
 */
export async function HTTPCollectorGet() {
  const collector_id = storage.get("collectorId")
  const collector = await getApi().collector.get(Number(collector_id));
  return collector;
}

/**
 * 获取问卷的标题行
 *
 * @param survey_id
 * @returns
 */
export async function HTTPGridHeaderRow(surveyId: string) {
  const collector = await getApi().dataGrid.getHeaderRow({
    survey_id: surveyId,
  });
  return collector;
}

/**
 * 获取问卷布局
 *
 * @param surveyId
 * @returns
 */
export async function HTTPGridLayout(surveyId: string) {
  const layouts = await getApi().dataGrid.getLayouts({ survey_id: surveyId });
  const layoutItems = layouts.items;
  const layoutItem = layoutItems.filter((item: ILayout) => item.default);
  return layoutItem[0];
}

/**
 * 获取问卷数据列表
 *
 * @param data
 * @returns
 */
export async function HTTPGridBodyRows(data: GetBodyRowsParams) {
  const api = getApi();
  const bodyRows = await api?.dataGrid.getBodyRows(data);
  return bodyRows;
}

/**
 * 获取收集器的回复统计
 *
 * @returns
 */
export async function HTTPGetResponseStat(): Promise<ICollectorResponseStat> {
  const collector_id = storage.get("collectorId");
  try {
    const data = await getApi().collector.getResponseStat(Number(collector_id));
    return data;
  } catch (error) {
    return {} as Promise<ICollectorResponseStat>;
  }
}

/**
 * 获取分析的工作空间列表
 *
 * @param surveyId
 * @returns
 */
export async function HTTPGetWorkspaces(surveyId: string) {
  const data = await getApi().dataAnalysis.getWorkspaces({
    survey_id: surveyId,
  });
  return data;
}

/**
 * 分析变量，由题目转换而来
 *
 * @param surveyId
 * @returns
 */
export async function HTTPGetVariables(surveyId: string) {
  const data = await getApi().dataAnalysis.getVariables({
    survey_id: surveyId,
  });
  return data;
}

/**
 * 获取分析卡片列表
 *
 * @param surveyId
 * @returns
 */

interface Ivariables {
  local_id: string;
}

export async function HTTPGetCards(
  workspace_id: number,
  variables?: Ivariables[]
) {
  let Hdata: IGetCardsParams = {
    workspace_id,
  };
  if (variables) {
    Hdata = {
      workspace_id,
      variables: variables,
    };
  }

  const data = await getApi().dataAnalysis.getCards(Hdata);
  return data;
}

/**
 * 获取分析卡片列表
 *
 * @param surveyId
 * @returns
 */
export async function HTTPGetCardStat<T>(id: number) {
  const data = await getApi().dataAnalysis.getCardStat<T>(id);
  return data;
}
