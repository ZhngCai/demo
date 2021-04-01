import React, { Component } from 'react';
import store from './store'
import {changeInputAction , addItemAction ,deleteItemAction,getListAction,getTodoList,getMyListAction} from './store/actionCreators' 
import TodoListUI from './TodoListUI'
import Test from './Test'

const data=[
    
]

class TodoList extends Component {
  constructor(props){
    super(props)
    this.state = store.getState()
    console.log(this.state)
    this.storeChange=this.storeChange.bind(this)
    //subscribe当store中数据发生变化就会更新数据
    store.subscribe(this.storeChange)
  }

  changeInputValue(e){
    const action = changeInputAction(e.target.value)
    store.dispatch(action)
  }

  componentDidMount(){
    // const action = getTodoList()
    // store.dispatch(action)

    const action =getMyListAction()
    store.dispatch(action)
  }

  storeChange(){
    
    this.setState(store.getState())
}
  clickBtn(){
    const action = addItemAction()
    store.dispatch(action)
  }
  deleteItem(index){
    const action = deleteItemAction(index)
    store.dispatch(action)
  }

  handleAdd(){
    let num = this.state.test;
    this.setState({
      test:num+1
    })
  }

  render() { 
      return ( 
        <div>
          <button
            onClick={()=>{this.handleAdd()}}
          >+</button>
          <Test
            test={this.state.test}
          ></Test>
          <TodoListUI
            inputValue={this.state.inputValue}
            list={this.state.list}
            
            changeInputValue = {(e)=>{this.changeInputValue(e)}}
            clickBtn = {()=>{this.clickBtn()}}
            deleteItem = {(index)=>{this.deleteItem(index)}}
            
         ></TodoListUI>
        </div>
         
      );
  }
}
export default TodoList;