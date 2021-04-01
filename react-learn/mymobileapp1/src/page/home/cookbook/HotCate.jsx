
import React, { Component } from 'react'
import { Grid } from 'antd-mobile'
import { get } from '../../../utils/http';

// get

// const data1 = Array.from(new Array(9)).map(() => ({
//   icon: 'https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png',
// }));

export default class HotCate extends Component {
  state={
    hotList:[]
  }
  async componentDidMount(){
    let result = await get({
      url:"hotcate"
    })
    result = [
      {
        "icon":"https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png",
        "title":"123",
        id:1
      }
    ]
    

    let data=result.map((value)=>({
      key:value.id,
      title:value.title,
      icon:value.icon
    }))
    this.setState({
      hotList:data
    })
    console.log(result)

    
  }
  _rederItem=dataItem=>(
    <div className="item" style={{ padding: '12.5px' }}>
      {
        <img src={dataItem.icon} style={{ width: '75px', height: '75px' }} alt="" />
      }
      <div style={{ color: '#888', fontSize: '14px', marginTop: '12px' }}>
        <span>{dataItem.title}</span>
      </div>
    </div>
  )
  render() {
    return (
      <div>
        <header>热门分类</header>
        <Grid data={this.state.hotList}
          columnNum={3}
          hasLine={false}
          renderItem={this._rederItem}
        />
      </div>
    )
  }
}
