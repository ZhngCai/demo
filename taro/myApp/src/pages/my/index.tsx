
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Input, Button } from '@tarojs/components'
import './index.scss'
import Todolist from '../../components/my/Todolist';
import Eccanvas from '../../components/my/Eccanvas';

function Index() {
  const [sclist,setSclist] = useState(["11"]);
  const [inputVal,setInputVal] = useState(["11"]);
  const [echartFlag,setEchartFlag] = useState(false);
  const search = useRef(null)
  useEffect(()=>{
    setEchartFlag(true)
  },[])

  function handleInput(value) {
    setInputVal(value)
    // setSclist([...sclist.filter((item)=>{return item.startsWith(value)})])
  }
  function handleCLick() {
    setEchartFlag(false);
    setSclist([...sclist,search.current.value]);
    setInputVal("")
    search.current.value="";
    setTimeout(() => {
      setEchartFlag(true);
    }, 500);
    
  }

  function handleDelete(index) {
    sclist.splice(index,1)
    setSclist([...sclist]);
  }
  return (
      <View className='index'>
        <View className="panle1">
        <Input className="search" ref={search} type='text' placeholder='todolist' onInput={(e)=>{handleInput(e.detail.value)}}></Input>
        <Button onClick={()=>{handleCLick()}}>搜索</Button>
        </View>
        <Todolist sclist={sclist} inputVal={inputVal} handleDelete={handleDelete}></Todolist>
        {
          echartFlag&&(
            <Eccanvas sclist={sclist}></Eccanvas>
          )
        }
        
      </View>
    )
}

export default  Index;
