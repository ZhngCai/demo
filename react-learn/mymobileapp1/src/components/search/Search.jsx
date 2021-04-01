import React, { Component } from 'react'
import { SearchWrap } from './styledSearch'

export default class Search extends Component {
  render() {
    return (
      <div>
        <SearchWrap border={
          {
            width:"1px",
            color:"red",
            style:"solid",
          }
        }>
        search
        </SearchWrap>
        
      </div>
    )
  }
}
