/**
 * Created by Administrator on 2019/2/28.
 */
import store from 'store'

const USER_KEY = 'user'
//设置保存用户信息
export function setItem(value) {
  if(value && typeof value!=='function'){
    store.set(USER_KEY,value)
  }else{
    console.log('保存失败：保存数据位空或者函数')
  }
}
//读取
export function getItem() {
  const value = store.get(USER_KEY)
  return value || ''
}
//删除
export function removeItem() {
  store.remove(USER_KEY)
}