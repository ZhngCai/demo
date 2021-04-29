
import { useContext, useEffect, useState } from 'react';
import { View, Text, Input, Button } from '@tarojs/components'
import './index.scss'



function Headers(props) {
    const [tClass ,setTClass] = useState("header")
    
    function handleClick() {
        setTClass("header header2")
        // tClass.legnth?tClass="header2":tClass="";
    }
  return (
      <>
      <View className={tClass}>
          <View  onClick={()=>{handleClick()}} className="ember">=</View>
          <View >退出</View>
          <View>我的调查问卷</View>
          <View>我的账户</View>
          <View>我的团队</View>
      </View>
    </>
    )
}

export default  Headers;
