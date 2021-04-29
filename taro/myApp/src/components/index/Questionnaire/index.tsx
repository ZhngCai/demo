
import React, { createContext, useEffect, useState } from 'react';
import Taro from '@tarojs/taro'
import { View, Text, Input, Button } from '@tarojs/components'
import './index.scss'
import { useDidShow } from '@tarojs/taro';
import Qulist from '../Qulist'


function Question() {
  const [resp ,setResp] = useState();
  const [questList,setQuestList] = useState([]);
  const [questFlag,setQuestFlag] = useState(false)
  useEffect(()=>{
    (async ()=>{
      const resp = await Taro.request({
        url:'http://rap2api.taobao.org/app/mock/269960/example/1604476476440'
      })
      setQuestList(resp.data.list);
      setResp(resp.data.list);
      setQuestFlag(true);
      console.log(`useEffect=>首页`,questList)
    })()
    
    return ()=>{
      console.log('老弟，你走了!Index页面')
    }
  },[])

  useDidShow(()=>{
    console.log("onShow")
  })

  function handleSearch(value){
    setQuestList([...resp.filter((item)=>{return item.name.startsWith(value)})])
  }

  function handleDelete(e,id) {
    e.stopPropagation();
    console.log("handleDelete")
    setQuestList([...resp.filter((item)=>{return item.id!=id})]);
  }
  return (
      <View className='index'>
        <View className="tit">我的调查问卷</View>
        <Input className="search" type='text' placeholder='搜索' focus onInput={(val)=>{handleSearch(val.detail.value)}}></Input>
        {questFlag&&(
            <Qulist questList={questList} handleDelete={handleDelete}></Qulist>
        )}
      </View>
    )
}

export default  Question;
