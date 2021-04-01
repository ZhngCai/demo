import React, { Component } from 'react'
class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  shouldComponentUpdate(newProps,newState){
    console.log("newProps",newProps)
    console.log("props",this.props)
    if(newProps.test !==this.props.test){
      console.log("shouldComponentUpdate--------Test")
      return true
    }else{
      return false
    }
    // console.log("shouldComponentUpdate--------Test")
    // return true
  }
  render() { 
    return ( 
      <div>
        {this.props.test}
      </div>
     );
  }
}
 
export default Test;