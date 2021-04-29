
import { useContext, useEffect, useState } from 'react';
import { View, Text, Input, Button } from '@tarojs/components'
import './index.scss'


function Todolist(props) {
    console.log("Todolist>>",props)
  return (
      <>
      <View className="list-ul">
      {
          props.sclist&&props.sclist.filter((item=>{
              return item.startsWith(props.inputVal)
          })).map((item,index)=>(
              <View className="list-li">
                  <View className="list-cont">{item}</View>
                  
                  <View className="list-x" onClick={()=>{props.handleDelete(index)}}>x</View>
            </View>
          ))
      }
      </View>
        </>
    )
}

export default  Todolist;
