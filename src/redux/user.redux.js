import axios from 'axios'
import {getRedirectPath} from '../util'

const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'
const LOAD_OUT = 'LOAD_OUT'
const AUTH_SUCCESS = 'AUTH_SUCCESS'

const initState = {
    redirectTo:'',
    msg:'',
    user:'',
    type:''
}
//reducer
export function user(state=initState, action){
    switch(action.type){
        case AUTH_SUCCESS:
            return {...state,msg:'', redirectTo:getRedirectPath(action.payload),...action.payload}
        case ERROR_MSG:
            return {...state,isAuth:false,msg:action.msg}
        case LOAD_DATA:
            return {...state, ...action.payload}
        case LOAD_OUT:
            return {...initState, redirectTo:'./login'}
        default:
            return state
    }
}

function authSuccess(obj){
    const {pwd,...data}=obj
    return {type:AUTH_SUCCESS, payload:data}
}

export function login({user,pwd}){
    if(!user || !pwd){
        return errorMsg('用户或者密码错误')
    }
    return dispatch=>{
        axios.post('/user/login',{user,pwd})
        .then(res=>{
            if(res.status===200 && res.data.code ===0){
                dispatch(authSuccess(res.data.data))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}


function errorMsg(msg){
    return { msg, type:ERROR_MSG }
}

export function regisger({user,pwd,repeatpwd,type}){
    if(!user || !pwd || !type){
        return errorMsg('用户名密码必须输入')
    }
    if(pwd !==repeatpwd){
        return errorMsg('密码和确认密码不通')
    }
    return dispatch=>{
        axios.post('/user/register',{user,pwd,type})
        .then(res=>{
            if(res.status===200 && res.data.code ===0){
                dispatch(authSuccess({user,pwd,type}))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    } 
}

export function loadData(userinfo){
    return {type:LOAD_DATA, payload:userinfo}
}

export function update(data){
    return dispatch=>{
        axios.post('/user/update',data)
        .then(res=>{
            if(res.status===200 && res.data.code ===0){
                dispatch(authSuccess(res.data.data))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}

export function logoutSubmit(){
    return {type:LOAD_OUT}
}