export interface IParamsDescriptionObject {
  name: string;
  type: string;
  comment: string;
  optional: boolean;
}

export interface IFakeRequestDescriptionObject {
  comment: string;
  loose: boolean;
  params: IParamsDescriptionObject[]
}