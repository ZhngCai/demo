import React, { Component } from 'react';
import PropTypes from 'prop-types'

class XiaojiejieItem extends Component {
  constructor(props) {
    super(props)
    this.state={

    }
  }

  shouldComponentUpdate(nextProps,nextState){
    
  }

  //组件第一次存在dom中，函数不会被执行
  //如果已经存在于Dom中，函数才会被执行
  componentWillReceiveProps(){
    //过时的，避免使用，将继续使用至 React 17
    console.log("child-componentWillReceiveProps------")
  }

  componentWillUnmount(){
    console.log("child-componentWillUnmount------")
  }

  render() { 
    console.log("child-render----")
    return ( 
      <li onClick={()=>this.handleClick()}>
        {this.props.avname}为你服务-{this.props.content}
      </li>
     );
  }
  handleClick(){
    this.props.deleteItem(this.props.index)
  }
}

XiaojiejieItem.protoTypes = {
  avname:PropTypes.string.isRequired,
  content:PropTypes.string,
  index:PropTypes.number,
  deleteItem:PropTypes.func,
}

XiaojiejieItem.defaultProps={
  avname:"松岛枫"
}
 
export default XiaojiejieItem;