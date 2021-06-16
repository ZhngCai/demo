import { FC } from "react";
import { accMul } from "../../utils/common";
import './index.scss'
import { ITableRankProps } from "./types";

const OSTableRank: FC<ITableRankProps> = ({
  bodyData,
}) => {
  return (
    <div>
      <div className='ostable'>
        <table>
          <thead>
            <tr>
              <th>选项</th>
              {
                bodyData[0].rankList.map((item: any, index: number) => (
                  <th key={item + index}>
                    <p>{item}</p>
                  </th>
                ))
              }
            </tr>
          </thead>
          <tbody>
            {
              bodyData.map((item, index) => (
                <tr key={index} >
                  <td>{item.name}</td>
                  {
                    item.value.map((kitem: any, kindex: number) => (
                      <td key={kindex}>
                        {
                          kitem.percent ?
                            <p>{(accMul(kitem.percent, 100) + "%")} / {kitem.count}</p>
                            :
                            <p>{kitem.count}</p>
                        }
                      </td>
                    ))
                  }
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OSTableRank;
