/**
 * Created by Administrator on 2019/2/27.
 */
import ajax from './ajsx'
import jsonp from 'jsonp'

//登录发送请求
const prefix = ''
//登录请求
export const reqLogin =(username,password) => ajax(prefix+'/login',{username,password},'POST')
//添加用户
export const reqAddUser = user => ajax(prefix+'manage/user/add',user,'POST')
//请求天气
export const reqWeather = () => {
  return new Promise((resolve,reject)=>{
    jsonp('http://api.map.baidu.com/telematics/v3/weather?location=北京&output=json&ak=3p49MVra6urFRGOT9s8UBWr2',
      {},
      (err,data)=>{
        if(!err){
          const result = data.results[0].weather_data[0]
          resolve(result)
        }else{
          reject('天气请求出现问题')
        }
      }
    )
  })
}
//请求品类管理
export const reqCategory = parentId => ajax(prefix+'/manage/category/list',{parentId})
//添加分类
export const reqAddCategory = (parentId,categoryName) => ajax(prefix+'/manage/category/add',{parentId,categoryName},'POST')
//更新品类名称
export const reqUpdateCategoryName = (categoryId,categoryName)=> ajax(prefix+'/manage/category/update',{categoryId,categoryName},'POST')
//请求商品后台分页列表
export const reqProductsLisst = (pageNum,pageSize) => ajax(prefix+'/manage/product/list',{pageNum,pageSize})
//商品搜索的请求
export const reqSearchProductsLisst = ({pageNum,pageSize,searchType,searchName}) => ajax(prefix+'/manage/product/search',{pageNum,pageSize,[searchType]:searchName})

