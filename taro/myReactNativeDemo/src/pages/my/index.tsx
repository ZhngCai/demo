import React, { useEffect, useRef, useState } from 'react';
import Taro from '@tarojs/taro'
import { View, Text,Button } from '@tarojs/components'
import './index.scss'
// import { Button } from 'react-native-elements';

function My(){
  function handelClick(){
    console.log("handelClick>>>1")
    Taro.navigateTo({ url: '/pages/user/index' })
  }

  return (
    <View className='index'>
      <Button
        onClick={()=>{handelClick()}}
      >用户</Button>
    </View>
  )
}

export default My