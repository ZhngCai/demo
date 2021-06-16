/** @format */

import { IHeader, ISubHeader } from "@choiceform/os-api/dist/es6/data-grid";
// interface ISubHeader {
//   local_id: string;
//   text: string;
//   type: string;
// }

export interface IHeadData {
  title: string;
  key: string;
  sub_headers: Array<ISubHeader>;
}

export function BSetHeadData(headers: IHeader<any>[]) {
  const headData: Array<IHeadData> = [] as Array<IHeadData>;
  headers.map((item, index) => {
    headData.push(
      index == 0
        ? {
            title: "元信息",
            key: item.type,
            sub_headers: item.sub_headers,
          }
        : {
            title: item.title,
            key: item.type,
            sub_headers: item.sub_headers,
          }
    );
  });
  return headData;
}
