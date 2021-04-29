import React, { useEffect, useRef, useState } from 'react';
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'
// import { Button } from 'react-native-elements';
import { Animated } from 'react-native'
import { Avatar, Badge, withBadge, Button, ButtonGroup, Card, ListItem, Input, Overlay, PricingCard, Rating, AirbnbRating, SearchBar, Slider, SpeedDial, Switch, Tab, Tooltip } from 'react-native-elements'
// import { ListItem } from 'react-native-elements/dist/list/ListItem';
import Icon from 'react-native-vector-icons/FontAwesome';
// import Modal from 'modal-react-native-web';

function My() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(2);
  const [search, setSearch] = useState("");
  const [sliderValue, setSliderValue] = useState("");
  const [open, setOpen] = useState(false);


  function handelClick() {
    console.log("handelClick>>>1")
    Taro.navigateTo({ url: '/pages/user/index' })
  }


  const buttons = ['Hello', 'World', 'Buttons']

  function updateIndex(selectedIndex) {
    console.log("updateIndex")
    setSelectedIndex(selectedIndex)
  }

  const users = [
    {
      name: 'brynn',
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
    },
  ]
  const list = [
    {
      name: 'Amy Farha',
      subtitle: 'Vice President'
    },
    {
      name: 'Chris Jackson',
      subtitle: 'Vice Chairman'
    },
  ]

  const toggleOverlay = () => {
    setIsVisible(!isVisible);
  };
  const ratingCompleted = (rating) => {
    console.log("Rating is: " + rating)
  }
  const updateSearch = (search) => {
    setSearch(search);
  };


  return (

    <View>
      {/* <Tooltip ModalComponent={Modal} popover={<Text>Info here</Text>}>
        <Text>Press me</Text>
      </Tooltip> */}
      <Tooltip popover={<Text>Info here</Text>}>
        <Text>Press me</Text>
      </Tooltip>
      <Tab>
        <Tab.Item title="Recent" />
        <Tab.Item title="favourite" />
        <Tab.Item title="cart" />
      </Tab>
      <Switch value={true} />
      <Switch value={false} color="orange"></Switch>
      {/* <SpeedDial
        open={open}
        icon={{ name: 'edit', color: '#fff' }}
        openIcon={{ name: 'close', color: '#fff' }}
        onChange={() => setOpen(!open)}
      >
        <SpeedDial.Action
          icon={{ name: 'add', color: '#fff' }}
          title="Add"
          onPress={() => console.log('Add Something')}
        />
        <SpeedDial.Action
          icon={{ name: 'delete', color: '#fff' }}
          title="Delete"
          onPress={() => console.log('Delete Something')}
        />
      </SpeedDial> */}
      <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
        <Slider
          value={sliderValue}
          onValueChange={(value) => setSliderValue(value)}
          thumbStyle={{ height: 40, width: 40, backgroundColor: 'transparent' }}
          thumbProps={{
            Component: Animated.Image,
            source: {
              uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
            },
          }}
        />
        <Text>Value: {sliderValue}</Text>
      </View>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={(search) => { updateSearch(search) }}
        value={search}
      />
      <AirbnbRating
        count={11}
        reviews={["Terrible", "Bad", "Meh", "OK", "Good", "Hmm...", "Very Good", "Wow", "Amazing", "Unbelievable", "Jesus"]}
        defaultRating={11}
        size={20}
      />

      <Rating
        showRating
        onFinishRating={(rating) => { ratingCompleted(rating) }}
        style={{ paddingVertical: 10 }}
      />
      <PricingCard
        color="#4f9deb"
        title="Free"
        price="$0"
        info={['1 User', 'Basic Support', 'All Core Features']}
        button={{ title: 'GET STARTED', icon: 'flight-takeoff' }}
      />;
      <Button title="Open Overlay" onPress={toggleOverlay} />

      <Overlay isVisible={isVisible} onBackdropPress={toggleOverlay}>
        <Text>Hello from Overlay!</Text>
      </Overlay>
      {
        list.map((l, i) => (
          <ListItem key={i} bottomDivider>
            {/* <Avatar source={{uri: l.avatar_url}} /> */}
            <ListItem.Content>
              <ListItem.Title>{l.name}</ListItem.Title>
              <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))
      }
      <Input
        placeholder='BASIC INPUT'
      />
      <Card>
        <Card.Title>HELLO WORLD</Card.Title>
        <Card.Divider />
        <Card.Image source={require('../src/asset/images/icon_API.png')}>
          <Text style={{ marginBottom: 10 }}>
            The idea with React Native Elements is more about component structure than actual design.
    </Text>
          <Button
            icon={<Icon name='code' color='#ffffff' />}
            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
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
        onPress={(index) => { updateIndex(index) }}
        selectedIndex={selectedIndex}
        buttons={buttons}
        containerStyle={{ height: 100 }}
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