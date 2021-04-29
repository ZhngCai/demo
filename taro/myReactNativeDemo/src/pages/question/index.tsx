import { Component } from 'react'
import { View, Text, MovableArea, MovableView, Swiper, SwiperItem, Button, Checkbox, Form, Switch,Input } from '@tarojs/components'
import './index.scss'


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
            <Input type='text' placeholder='将会获取焦点' focus/>
            <Text>控制最大输入长度的 input</Text>
           <Input type='text' placeholder='最大输入长度为 10' />
            <Text>数字输入的 input</Text>
            <Input type='number' placeholder='这是一个数字输入框'/>
            <Text>带小数点的 input</Text>
            <Input type='digit' placeholder='带小数点的数字键盘'/>
            <Text>身份证输入的 input</Text>
            <Input type='idcard' placeholder='身份证输入键盘'/>
            <Text>控制占位符颜色的 input</Text>
            <Input type='text' placeholder='占位符字体是红色的' placeholderStyle='color:red'/>
        </View>
    </View>
  )
}


export default User;