import { takeEvery ,put } from 'redux-saga/effects'  
import {GET_MY_LIST} from './actionTypes'
import {getListAction} from './actionCreators'
import axios from 'axios'

//generator函数
function* mySaga() {
    //等待捕获action
    yield takeEvery(GET_MY_LIST, getList)
}

function* getList(){
    let httpUrl = "http://rap2api.taobao.org/app/mock/269960/example/1604476476440";
    // axios.post(httpUrl).then((res)=>{
    //     const data = res.data
    //     const action = getMyListAction(data)
    //     put(action)
    // })

    
    const res = yield axios.post(httpUrl)
    const action = getListAction(res.data)
    console.log("action",action)
    yield put(action)
}

export default mySaga;