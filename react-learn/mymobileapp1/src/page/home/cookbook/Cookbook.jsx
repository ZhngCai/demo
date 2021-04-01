import React, { Component } from 'react'
import Search from '@comp/search/Search'
import Header from "./Header"

import Swiper from './Swiper'
import HotCate from './HotCate'

export default class Cookbook extends Component {
  render() {
    return (
      <div>
        <Header></Header>
        <Swiper></Swiper>
        <Search></Search>
        <HotCate></HotCate>
      </div>
    )
  }
}
