import React, { useEffect, useRef, useState } from 'react';
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'
// import { Button } from 'react-native-elements';
import {  Image } from 'react-native'
import { Avatar, Badge, withBadge,Button,ButtonGroup,Card ,ListItem} from 'react-native-elements'
// import { ListItem } from 'react-native-elements/dist/list/ListItem';
import Icon from 'react-native-vector-icons/FontAwesome';

function My(){
  const [isVisible, setIsVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(2);
const list = [
  { title: 'List Item 1' },
  { title: 'List Item 2' },
  {
    title: 'Cancel',
    containerStyle: { backgroundColor: 'red' },
    titleStyle: { color: 'white' },
    onPress: () => setIsVisible(false),
  },
];

  function handelClick(){
    console.log("handelClick>>>1")
    Taro.navigateTo({ url: '/pages/user/index' })
  }


  const buttons = ['Hello', 'World', 'Buttons']

  function updateIndex (selectedIndex) {
    console.log("updateIndex")
    setSelectedIndex(selectedIndex)
  }

  const users = [
    {
       name: 'brynn',
       avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
    },
   ]

  return (
    <View>
  <Card>
  <Card.Title>HELLO WORLD</Card.Title>
  <Card.Divider/>
  <Card.Image source={require('../src/asset/images/icon_API.png')}>
    <Text style={{marginBottom: 10}}>
      The idea with React Native Elements is more about component structure than actual design.
    </Text>
    <Button
      icon={<Icon name='code' color='#ffffff' />}
      buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
      title='VIEW NOW' />
  </Card.Image>
</Card>

<Avatar
  rounded
  source={{
    uri:
      'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
  }}
/>
<Badge value="99+" status="error" />
<Badge value={<Text>My Custom Badge</Text>} />
<Badge status="success" />
<Badge status="error" />
<Badge status="primary" />
<Badge status="warning" />
<Button
  icon={
    <Icon
      name="arrow-right"
      size={15}
      color="white"
    />
  }
  title="Button with icon component"
/>
<Button
  icon={
    <Icon
      name="arrow-right"
      size={15}
      color="white"
    />
  }
  iconRight
  title="Button with right icon"
/>

<Button
  title="Loading button"
  loading
/>

<ButtonGroup
      onPress={(index)=>{updateIndex(index)}}
      selectedIndex={selectedIndex}
      buttons={buttons}
      containerStyle={{height: 100}}
    />

{/* <BottomSheet
  isVisible={isVisible}
  containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }}
>
  {list.map((l, i) => (
    <ListItem key={i} containerStyle={l.containerStyle} onPress={l.onPress}>
      <ListItem.Content>
        <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  ))}
</BottomSheet> */}
    </View>
  )
}

export default My