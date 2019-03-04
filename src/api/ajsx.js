import axios from 'axios'
import {message} from 'antd'

//封装ajax函数
export default function ajax(url,data={},method = 'GET'){
  let promise = null
  if(method==='GET'){
    promise = axios.get(url,{params:data})
  }else if(method==='POST'){
    promise = axios.post(url,data)
  }
  //处理结果
  return new Promise((resolve,reject)=>{
    promise
      .then(res=>resolve(res.data))
      .catch(err=>{
        console.log('请求失败err:', err)
        message.error('请求失败~~~')
      })
  })
}