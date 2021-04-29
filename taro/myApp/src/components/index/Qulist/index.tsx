
import { useContext, useEffect, useState } from 'react';
import { View, Text, Input, Button } from '@tarojs/components'
import './index.scss'


// import { IRequestParams } from "@choiceform/os-api";
// import { request } from "@tarojs/taro";
// import axios from 'axios';



function Qulist(props) {
    const [trigger,setTrigger] = useState(false);
    
  return (
      <>
      <View >
      {
          props.questList&&props.questList.map((item)=>(
              <View className="grid">
                <Text>{item.time}</Text>
                <View>{item.name}</View>
                <View>
                    <View>
                        <View className="grid-ul">
                        <View className="grid-li">
                            <View>o</View>
                            <View>状态</View>
                        </View>
                        <View className="grid-li">
                            <View>5</View>
                            <View>问题</View>
                        </View>
                        <View className="grid-li">
                            <View>-</View>
                            <View>回复</View>
                        </View>
                        </View>
                        <View className="grid-ul">
                            <View className="grid-sj">收集</View>
                            <View className="grid-Dropdown" onClick={()=>{setTrigger(!trigger)}}>...</View>
                        </View>
                        {trigger&&(
                            <View className="delete">
                                <View onClick={(e)=>{props.handleDelete(e,item.id)}}>删除</View>
                            </View>
                        )}
                    </View>
                </View>
            </View>
            )
          )
      }
    </View>
    </>
    )
}

export default  Qulist;
