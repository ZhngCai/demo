import { IPageInfo } from "@choiceform/os-api";
import { GetBodyRowsParams, IBodyRow } from "@choiceform/os-api/dist/es6/data-grid";
import { FC, useEffect, useState } from "react";
// import { useHistory } from "react-router";
import { BSetHeadData, IHeadData } from "../behavior";
import { HTTPGridBodyRows } from "../../../../service";
import { formatNumber } from "../../../../utils/format";
import './index.scoped.scss'
import { useGlobalContext } from "../../../../context";

const OSDetailTable: FC = () => {
  const {
    editHeaderRow: { headerRow },
  } = useGlobalContext();
  const [page, setPage] = useState(1);
  const [bodyRows, setBodyRows] = useState<IPageInfo<IBodyRow>>({} as IPageInfo<IBodyRow>);
  const layout_id = Number(localStorage.getItem('layoutId'));
  const [headData, setHeadData] = useState<Array<IHeadData>>([] as Array<IHeadData>)
  // const history = useHistory();

  useEffect(() => {
    setHeadData(BSetHeadData(headerRow.headers))
    getHTTPGridBodyRows(page);
  }, [])

  const getHTTPGridBodyRows = (toPage: number) => {
    const data: GetBodyRowsParams = {
      layout_id,
      page: toPage,
      page_size: 10
    }

    HTTPGridBodyRows(data).then(resp => {
      setBodyRows(resp)
    });
  }

  // const handleClick = (id: string) => () => {
  //   history.push(`/detail/${id}`);
  // }

  const handleInput = (e: any) => {
    let value = e.target.value;
    if (formatNumber(value, 'posInteger')) {
      setPage(value)
    }
  }
  const handlePageTo = (type: string) => () => {
    let toPage = 1, totalPages = 1;
    switch (type) {
      case 'add':
        toPage = Number(page) + 1;
        break;
      case 'dec':
        toPage = Number(page) - 1;
        break;
      case 'to':
        totalPages = Number(bodyRows.page_info.total_pages);
        toPage = Number(page) > totalPages ? totalPages : Number(page);
        break;
      default:
        break;
    }
    setPage(toPage);
    getHTTPGridBodyRows(toPage)
  }


  return (
    <div>
      <div className='ostable'>
        <table>
          <thead>
            <tr>
              {
                headData.map((item, index) => (
                  <th colSpan={item.sub_headers.length} key={index}>
                    <p>{item.title}</p>
                  </th>
                ))
              }
              {/* {
                <th className='fixed'>
                </th>
              } */}
            </tr>
            <tr>
              {
                headData.map((item) => (
                  item.sub_headers.map((item2, index2) => (
                    <th key={index2}>
                      <p >{item2.text}</p>
                    </th>
                  ))

                ))
              }
              {/* {
                <th className='fixed'>
                  <p>操作</p>
                </th>
              } */}
            </tr>
          </thead>
          <tbody>
            {
              bodyRows.items &&
              bodyRows.items.map((item, index) => (
                <tr key={index}>
                  {
                    item.cells.map((kitem) => (
                      kitem.values.map((vitem, vindex) => (
                        <td key={vindex}>
                          <p key={vindex}>{vitem}</p>
                        </td>
                      ))
                    ))
                  }
                  {/* {
                    item.response &&
                    <td className='fixed operate' onClick={handleClick(item.response.id)}>
                      <p>查看</p>
                    </td>
                  } */}
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      {
        bodyRows.page_info && bodyRows.page_info.total_count > 0
          ?
          (
            <div className='pagination'>
              <button className='pre iconfont icon-enter' disabled={page == 1} onClick={handlePageTo('dec')}></button>
              <input type="text" value={page} onInput={handleInput} /> / {bodyRows.page_info.total_pages || 1}页
              <button className='next iconfont icon-enter' disabled={page >= bodyRows.page_info.total_pages} onClick={handlePageTo('add')}></button>
              <span className='to-page' onClick={handlePageTo('to')}>跳转</span>
            </div>
          )
          :
          (
            <div className='pagination empty'>
              <p className='iconfont icon-empty-status'></p>
              <p>无回复数据</p>
            </div>
          )
      }
    </div>
  );
};

export default OSDetailTable;
