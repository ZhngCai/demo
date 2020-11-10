import {CHANGE_INPUT , ADD_ITEM,DELETE_ITEM,GET_LIST,GET_MY_LIST}  from './actionTypes'
import axios from 'axios'

export const changeInputAction = (value)=>({
    type:CHANGE_INPUT,
    value
})

export const addItemAction = ()=>({
    type:ADD_ITEM
})

export const deleteItemAction = (index)=>({
    type:DELETE_ITEM,
    index
})


export const getListAction = (data)=>({
  type:GET_LIST,
  data
})

export const getTodoList = () =>{
    return (dispatch)=>{
        let httpUrl = "http://rap2api.taobao.org/app/mock/269960/example/1604476476440";
        axios.post(httpUrl)
        .then((res)=>{
            const data = res.data
            const action = getListAction(data)
            dispatch(action)
        })
    }
}

export const getMyListAction = ()=>({
    type:GET_MY_LIST
})