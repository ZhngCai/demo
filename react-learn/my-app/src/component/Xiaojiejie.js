import React,{Component,Fragment} from 'react'
import './style.css'
import XiaojiejieItem from './XiaojiejieItem'
import axios from 'axios'
import Boss from './Boss'

class Xiaojiejie extends Component{
  constructor(props){
    super(props)
    this.state={
      inputValue:'',
      list:['111','222']
    }
  }


  componentWillMount(){
    //过时的，避免使用，将继续使用至 React 17
    // console.log("componentWillMount--------组件将要挂载")
  }
  componentDidMount(){
    // console.log("componentDidMount--------组件挂载完成")
    axios.post('http://rap2api.taobao.org/app/mock/269960/example/1604476476440')
        .then((res)=>{
          // console.log('axios 获取数据成功:'+JSON.stringify(res))  
        })
        .catch((error)=>{
          // console.log('axios 获取数据失败'+error)
        })
  }

  shouldComponentUpdate(nextProps,nextState){
    // console.log("shouldComponentUpdate--------")

    return true;
  }

  componentWillUpdate(){
    //过时的，避免使用，将继续使用至 React 17
    // console.log("componentWillUpdate--------")
  }

  componentDidUpdate(){
    // console.log("componentDidUpdate--------")
  }


  render(){
    // console.log("render--------组件挂载中ing")
    return(
      <Fragment>
        <div>
          <label htmlFor='inputTest'>增加服务: </label>
          <input 
            id="inputTest" 
            className='input' 
            value={this.state.inputValue} 
            onChange={(e) => this.inputChange(e)} 
            ref={(input)=>{this.input=input}}
          />
          <button onClick={()=>this.addList()}>增加服务</button>
        </div>
        <ul>
          {
            this.state.list.map((value,index)=>{
              return (
                <XiaojiejieItem 
                  key={value+index}
                  content={value}
                  index={index}
                  deleteItem={(index)=>this.deleteItem(index)}
                />
              )
            })
          }
        </ul>

        <Boss />
      </Fragment>
    )
  }

  inputChange(){
    this.setState({
      inputValue : this.input.value
    })
  }

  addList(){
    
    this.setState({
      list:[...this.state.list,this.state.inputValue]
    })
  }

  deleteItem(index){
    //不允许往state里的指直接赋值，否则react不会重新render，会产生性能障碍
    let list = this.state.list
    list.splice(index,1)
    
    this.setState({
      list,
    })
  }
}

export default Xiaojiejie