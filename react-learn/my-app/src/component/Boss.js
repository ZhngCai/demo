import React, { Component } from 'react';

class Boss extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isShow:true
     }
  }
  render() { 
    return ( 
      <div>
        <div className={this.state.isShow?'show':'hide'}>Boss级任务</div>
        <div><button onClick={()=>{this.toToggole()}}>召唤Boss</button></div>
      </div>
     );
  }

  toToggole(){
    console.log("toToggole")
    this.setState({
      isShow:this.state.isShow?false:true
    })
  }
}
 
export default Boss;