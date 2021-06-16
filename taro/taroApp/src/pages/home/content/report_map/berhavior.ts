/** @format */

import React, { useCallback, useState } from "react";

import {
  HTTPGetCards,
  HTTPGetCardStat,
  HTTPGetVariables,
  HTTPGetWorkspaces,
} from "../../../../service";
import { ICard } from "@choiceform/os-api/dist/es6/data-analysis";
import {
  ICardCategoriesStat,
  ICardMulSelectState,
  ICardMatrixNumbersState,
} from "./variables";
import { useGlobalContext } from "../../../../context";
import {
  IHeader,
  ISelectHeaderExtra,
} from "@choiceform/os-api/dist/es6/data-grid";
import {
  TCardNameTypeCateAndCheck,
  TCardNameTypeBlank,
  TCardNameTypeMatrix,
  ICardCateAndCheck,
  ICardBlank,
  TCardMatrix,
  TSubjectName,
  VariableTypes,
  TSubjectProps,
} from "../../../../components/os_subject/subject";

export function useBehavior(loadingRef: React.RefObject<HTMLDivElement>) {
  const {
    editHeaderRow: { headerRow },
  } = useGlobalContext();

  const [fdata, setfData] = useState<TSubjectProps[]>([]);
  const [loading, setLoading] = useState(true);
  const DHeight = document.documentElement.clientHeight;

  let loadHttpFlag = true;
  let cardsList: ICard[] = [];
  let fdataList: TSubjectProps[] = [];
  const headData = headerRow.headers;

  const handleScroll = useCallback(() => {
    let offsetTop = 0;
    let hLength = 0;

    if (headData) {
      hLength = headData.length;
    }

    if (loadingRef && loadingRef.current) {
      offsetTop = loadingRef.current.offsetTop;
    }

    if (fdataList.length >= hLength - 1) {
      setLoading(false);
      window.removeEventListener("scroll", handleScroll);
      return;
    }
    if (
      fdataList.length < hLength - 1 &&
      loadHttpFlag &&
      offsetTop - document.documentElement.scrollTop < DHeight + 100
    ) {
      loadHttpFlag = false;
      let flength = fdataList.length;
      let header = headerRow.headers[flength + 1];
      let type = header.type as TSubjectName;

      let isMultiSelect =
        header.type == "select" &&
        (header as IHeader<ISelectHeaderExtra>).extra.is_multi_sel;

      if (isMultiSelect) {
        type = "select_mul";
      }

      let varType = VariableTypes[type],
        cardId;
      if (
        varType == "CATEGORIES" ||
        varType == "CHECKBOXES" ||
        varType == "MATRIX_NUMBERS"
      ) {
        cardId = cardsList.shift()?.id;
      }

      HTTPDataAnalysisType(VariableTypes[type], cardId as number, type);
    }
  }, []);

  const isElseFun = (id: string) => {
    const idc = id + "/comment";
    let isElse = false;

    headData[fdataList.length + 1].sub_headers.map((sItem) => {
      if (sItem.local_id == idc) {
        isElse = true;
      }
    });
    return isElse;
  };

  const HTTPDataAnalysisType = (
    varType: string,
    id: number,
    subType: TSubjectName
  ) => {
    let data: ICardBlank = {} as ICardBlank;
    let flength = fdataList.length;
    switch (varType) {
      case "CATEGORIES":
        HTTPGetCardStat<ICardCategoriesStat>(id).then((resp) => {
          const data: ICardCateAndCheck = {
            type: subType as TCardNameTypeCateAndCheck,
            data: resp.categories_stat.map((item) => {
              return {
                id: item.id,
                count: item.count,
                percent: item.percent,
                name: item.name,
                isElse: isElseFun(item.id),
              };
            }),
          };
          fdataList = [...fdataList, data];
          setfData(fdataList);
          loadHttpFlag = true;
          handleScroll();
        });
        break;
      case "CHECKBOXES":
        HTTPGetCardStat<ICardMulSelectState>(id).then((resp) => {
          const data: ICardCateAndCheck = {
            type: subType as TCardNameTypeCateAndCheck,
            data: resp.checkboxes_stat.map((item) => {
              return {
                id: item.id,
                count: item.count,
                percent: item.percent,
                name: item.name,
                isElse: isElseFun(item.id),
              };
            }),
          };
          fdataList = [...fdataList, data];
          setfData(fdataList);
          loadHttpFlag = true;
          handleScroll();
        });
        break;
      case "MATRIX_NUMBERS":
        HTTPGetCardStat<ICardMatrixNumbersState>(id).then((resp) => {
          let _subType = subType as TCardNameTypeMatrix;
          const data: TCardMatrix = {
            type: _subType,
            data: resp.variables_stat.map((item) => {
              return {
                name: item.name,
                total: item.count,
                value: item.numbers_stat.map((item2: any) => {
                  return {
                    rank: item2.value,
                    count: item2.count,
                    percent: item2.percent,
                    isElse: isElseFun(item.id),
                  };
                }),
                rankList: item.numbers_stat.map((item2: any) => item2.value),
              };
            }),
          };

          fdataList = [...fdataList, data];
          setfData(fdataList);
          loadHttpFlag = true;
          handleScroll();
        });
        break;

      case "BLANK":
        data = {
          type: subType as TCardNameTypeBlank,
          data: {
            local_id: headData[flength + 1].local_id,
          },
        };

        fdataList = [...fdataList, data];
        setfData(fdataList);
        loadHttpFlag = true;
        handleScroll();
        break;
      default:
        break;
    }
  };

  const getHTTPGetDataAnalysis = (surveyId: string) => {
    Promise.all([HTTPGetWorkspaces(surveyId), HTTPGetVariables(surveyId)]).then(
      (result) => {
        const RWorkId = result[0].items.filter((item) => item.default)[0].id;
        const RVariables = result[1].items.map((item) => {
          return {
            local_id: item.local_id,
          };
        });
        HTTPGetCards(RWorkId, RVariables).then((resp) => {
          cardsList = resp.items;
          handleScroll();
        });
      }
    );
  };

  return {
    fdata,
    loading,
    getHTTPGetDataAnalysis,
    handleScroll,
  };
}
