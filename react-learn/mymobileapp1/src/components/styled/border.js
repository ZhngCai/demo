import styled from "styled-components"

const border = ({Comp})=>{
  const BorderdComp=styled(Comp)`
  border-width:${props=>props.width||"1px"};
  border-color:${props=>props.color||"#ccc"};
  border-style:${props=>props.style||"solid"};
  `
  return BorderdComp;
}

export default border;