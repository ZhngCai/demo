import { FC } from "react";
import { View } from "@tarojs/components";
// import { useHistory } from "react-router";
import { useGlobalContext } from "../../context";
import { accMul } from "../../utils/common";
import './index.scss'
import { ITableCateAndCheckProps } from "./types";

const OSTable: FC<ITableCateAndCheckProps> = ({
  headData,
  bodyData,
}) => {
  const {
    editScrollEvent: { getScrollEventFun },
  } = useGlobalContext();

  // let history = useHistory();
  const handleElseClick = (localId: string) => () => {
    let id = encodeURIComponent(localId + "/comment");
    getScrollEventFun.remove();
    // history.push(`/elseAnswer/${id}`);
  }
  return (
    <View>
      <View className='ostable'>
        {/* <table>
          <thead>
            <tr>
              {
                headData.map((item, index) => (
                  <th key={item.title + index}>
                    <p>{item.title}</p>
                  </th>
                ))
              }
            </tr>
          </thead>
          <tbody>
            {
              bodyData.map((item, index) => (
                <tr key={index} >
                  {
                    headData.map((kitem, kindex) => (
                      <td key={kindex}>
                        {
                          item.isElse && kitem.key == 'isElse' ?
                            <p onClick={handleElseClick(item.id)} className='iconfont icon-enter'></p>
                            :
                            <p>{kitem.key == 'percent' ? (accMul(item.percent, 100) + "%") : item[kitem.key]}</p>
                        }
                      </td>
                    ))
                  }
                </tr>
              ))
            }

          </tbody>
        </table> */}
      </View>
    </View>
  );
};

export default OSTable;
