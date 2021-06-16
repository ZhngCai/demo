/** @format */

export type TCardNameTypeMeta = "meta_data";
export type ICardMeta = {
  type: TCardNameTypeMeta;
  data: [];
};

export type TCardNameTypeCateAndCheck = "select" | "select_mul" | "menu";

export interface ICardDataCateAndCheck {
  [propName: string]: any;
  count: string | number;
  percent: string | number;
  name: string | number;
  isElse: boolean;
}

export interface ICardCateAndCheck {
  type: TCardNameTypeCateAndCheck;
  data: ICardDataCateAndCheck[];
}

export type TCardNameTypeBlank =
  | "fill"
  | "predef"
  | "location"
  | "upload"
  | "verify";
export interface ICardBlank {
  type: TCardNameTypeBlank;
  data: {
    local_id: string;
  };
}

export type TCardNameTypeMatrix =
  | "icon_mark"
  | "value_mark"
  | "sequence"
  | "slide_rate"
  | "weight";

export interface ICardDataMatrix {
  value: {
    rank: string | number;
    count: string | number;
    percent: string | number;
  }[];
  name: string | number;
  rankList: Array<string | number>;
}
export type TCardMatrix = {
  type: TCardNameTypeMatrix;
  data: ICardDataMatrix[];
};

export interface ICardDataWeight {
  [propName: string]: any;
  name: string;
  max: number;
  min: number;
  average: number;
}

export type TSubjectName =
  | TCardNameTypeMeta
  | TCardNameTypeCateAndCheck
  | TCardNameTypeBlank
  | TCardNameTypeMatrix;

export type TSubjectData =
  | ICardDataCateAndCheck
  | ICardDataMatrix
  | ICardDataWeight;

export type TSubjectProps =
  | ICardMeta
  | ICardCateAndCheck
  | ICardBlank
  | TCardMatrix;

export type TCardData = Array<TSubjectProps>;

export const VariableTypes = {
  select: "CATEGORIES",
  select_mul: "CHECKBOXES",
  icon_mark: "MATRIX_NUMBERS",
  value_mark: "MATRIX_NUMBERS",
  slide_rate: "MATRIX_NUMBERS",
  weight: "MATRIX_NUMBERS",
  sequence: "MATRIX_NUMBERS",
  menu: "CATEGORIES",
  predef: "BLANK",
  fill: "BLANK",
  verify: "BLANK",
  // region: "BLANK",
  location: "BLANK",
  upload: "BLANK",
  meta_data: "META",
};
