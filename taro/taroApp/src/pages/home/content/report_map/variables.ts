/** @format */

export interface ICardCategoriesStat {
  categories_stat: {
    id: string;
    name: string;
    count: number;
    percent: number;
  }[];
}

// checkboxes
export interface ICardMulSelectState {
  checkboxes_stat: {
    id: string;
    name: string;
    count: number;
    percent: number;
  }[];
}

// MATRIX_NUMBERS
export interface ICardMatrixNumbersState {
  variables_stat: {
    avg: number;
    id: string;
    name: string;
    median: number;
    count: number;
    numbers_stat: {
      count: number;
      percent: number;
      value: number;
    }[];
  }[];
}

// export enum ECARDSTATE{
//   CATEGORIES = <ICardCategoriesStat>,
//   CHECKBOXES=<ICardMulSelectState>,
//   MATRIX_NUMBERS=<ICardMatrixNumbersState>,
// }
