import React ,{ Component }from 'react';
import 'antd/dist/antd.css'
import { Input , Button , List } from 'antd'
//无状态组件，无业务逻辑，无state
// const TodoListUI = (props)=>{
//   return ( 
//       <div style={{margin:'10px'}}>
//         <div>
//             <Input 
//               placeholder={props.inputValue} 
//               style={{ width:'250px', marginRight:'10px'}}
//               onChange={(e)=>{props.changeInputValue(e)}}
//               value={props.inputValue} 
//             />
//             <Button 
//               type="primary"
//               onClick={()=>{props.clickBtn()}}
//             >增加</Button>
//         </div>
//         <div style={{margin:'10px',width:'300px'}}>
//             <List
//                 bordered
//                 dataSource={props.list}
//                 renderItem={(item,index)=>(
//                   <List.Item 
//                     onClick={()=>{
//                       props.deleteItem(index)
//                     }}
//                   >{item}</List.Item>
//                 )}
//             />    
//         </div>
//     </div>
//   );
// }

//状态组件
class TodoListUI extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  shouldComponentUpdate(newProps,newState){
    console.log("newProps---TodoListUI",newProps)
    console.log("props---TodoListUI",this.props)
    
    
    // console.log("shouldComponentUpdate--------TodoListUI")
    return true
  }

  render() { 
    return ( 
      <div style={{margin:'10px'}}>
        <div>
            <Input 
              placeholder={this.props.inputValue} 
              style={{ width:'250px', marginRight:'10px'}}
              onChange={(e)=>{this.props.changeInputValue(e)}}
              value={this.props.inputValue} 
            />
            <Button 
              type="primary"
              onClick={()=>{this.props.clickBtn()}}
            >增加</Button>
        </div>
        <div style={{margin:'10px',width:'300px'}}>
            <List
                bordered
                dataSource={this.props.list}
                renderItem={(item,index)=>(
                  <List.Item 
                    onClick={()=>{
                      this.props.deleteItem(index)
                    }}
                  >{item}</List.Item>
                )}
            />    
        </div>
    </div>
     );
  }
}
 
export default TodoListUI;