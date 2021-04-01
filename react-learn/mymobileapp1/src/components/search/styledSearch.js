import styled from "styled-components"
import border from "../styled/border"

export const SearchWrap = border({
  Comp:styled.div`
    pading:10px 15px;
    div{
      border:1px solid #000;
      display:flex;
      justify-content:center;
      align-items:center;
      img{
        width:30px;
        height:30px;
      }
    }
  `
})


export const BorderSearchWrap = styled(SearchWrap) `
    border-width:${props=>props.border.width};
    border-color:${props=>props.border.color};
    border-style:${props=>props.border.style};
`