import { FC } from "react";

import './else_answer.scoped.scss'
import { ITableAnswerProps } from "./types";

const OSTableElseAnswer: FC<ITableAnswerProps> = ({
  bodyData,
}) => {

  return (
    <div className='ostable-else'>
      <table >
        <thead>
          <tr>
            <th colSpan={2}>
              <p>在选项 <span>其他</span> 中填写的内容</p>
            </th>
          </tr>
        </thead>
        <tbody>
          {
            bodyData.items &&
            bodyData.items.map((item, index) => (
              <tr key={index}>
                <td >
                  <p>{item.cells[0].local_id}</p>
                </td>
                <td >
                  <p>{item.cells[0].values[0]}</p>
                </td>
              </tr>
            ))
          }

        </tbody>
        {/* <tfoot>
          <tr>
            <th colSpan={2}>
              {
                bodyData.items &&
                <div>
                  <p>共{bodyData.page_info.total_count}人回答</p>
                  <p>1/{bodyData.page_info.total_pages}<input type="text" /> 跳转</p>
                </div>
              }
            </th>
          </tr>
        </tfoot> */}

      </table>
    </div>
  );
};

export default OSTableElseAnswer;
