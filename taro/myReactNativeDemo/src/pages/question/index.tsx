import { Component } from 'react'
import { View, Text, MovableArea, MovableView, Swiper, SwiperItem, Button, Checkbox, Form, Switch } from '@tarojs/components'
import './index.scss'
import { Input } from 'hammerjs'


function User() {
function formSubmit() {
  console.log("formSubmit")
}
function formReset() {
  console.log("formReset")
}

  return (
    <View className='index'>
      <Text>question</Text>
      <Swiper
        className='test-h'
        indicatorColor='#999'
        indicatorActiveColor='#333'
        vertical
        indicatorDots
        autoplay>
        <SwiperItem>
          <View className='demo-text-1'>1</View>
        </SwiperItem>
        <SwiperItem>
          <View className='demo-text-2'>2</View>
        </SwiperItem>
        <SwiperItem>
          <View className='demo-text-3'>3</View>
        </SwiperItem>
      </Swiper>

      <Button className='btn-max-w' plain type='primary'>按钮</Button>
      <Button className='btn-max-w' plain type='warn'>按钮</Button>
      <Button className='btn-max-w' plain disabled type='warn'>按钮</Button>
      <View className='page-section'>
          <Text>默认样式</Text>
          <Checkbox value='选中' checked>选中</Checkbox>
          <Checkbox value='未选中'>未选中</Checkbox>
        </View>
        <Form onSubmit={()=>{formSubmit}} onReset={()=>{formReset}} >
        <View className='example-body'>
          <Switch name='switch' className='form-switch'></Switch>
          <Button className='btn-max-w' type='primary'> 按钮</Button>
        </View>
      </Form>

      <View className='example-body'>
          <Text>可以自动聚焦的 input</Text>
        </View>
    </View>
  )
}


export default User;