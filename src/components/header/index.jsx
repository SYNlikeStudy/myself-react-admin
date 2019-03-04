import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {Row,Col,Modal} from 'antd'
import dayjs from 'dayjs'
import {message} from 'antd'

import './index.less'
import MemoryUtils from '../../utils/memoryUtils'
import {removeItem} from '../../utils/storageUtils'
import menuList from '../../config/menuConfig'
import {reqWeather} from '../../api/index'
import MyButton from '../my-button'

class ThisHeader extends Component {
  state = {
    day:dayjs().format('YYYY-MM-DD HH:mm:ss'),
    weatherMes:{dayPictureUrl:'http://api.map.baidu.com/images/weather/night/duoyun.png',
      weather:'阴呲呼啦'}
  }
  componentDidMount(){
    reqWeather()
      .then((res)=>{
        this.setState({
          weatherMes:res
        })
      })
      .catch(err=>message.error(err))
    this.updateTime()
  }
  updateTime = () => {
    setInterval(()=>{
      this.setState({
        day:dayjs().format('YYYY-MM-DD HH:mm:ss')
      })
    },1000)
  }
  //点击退出的函数
  logOut = () => {
    Modal.confirm({
      title: '是否确认退出登录',
      okText: '确认',
      cancelText: '取消',
      onOk:()=> {
        //console.log('OK');
        MemoryUtils.user={}
        removeItem()
        this.props.history.replace('/login')
      },
    });
  }
  //获取小标题的方法
  getTitle = (menu) => {
    const {pathname} = this.props.location
    //解决商品管理的标题不能显示问题
    if(pathname.indexOf('/product')===0){
      return '商品管理'
    }
    for(let i = 0;i<menu.length;i++){
      if(menu[i].children){
        const childrenTitle = this.getTitle(menu[i].children)
        if(childrenTitle){
          return childrenTitle
        }
      }else{
        if(menu[i].key===pathname){
          return menu[i].title
        }
      }
    }
  }
  render () {
    const {username} = MemoryUtils.user
    const title = this.getTitle(menuList)
    const {day} = this.state
    const {dayPictureUrl,weather} =this.state.weatherMes
    return (
       <div className="header">
         <Row className="header-top">
           <span>欢迎,{username}</span>
           <MyButton onClick={this.logOut} name="退出" style={{margin:'0 15px 0 30px'}}/>
         </Row>
         <Row className="header-bottom">
           <Col span={4} className="bottom-left">{title}</Col>
           <Col span={20} className="bottom-right">
             <span>{day}</span>
             <span className="weather">
               <img src={dayPictureUrl} alt="天气"/>
               {weather}
             </span>
           </Col>
         </Row>
       </div>
    )
  }
}
export default withRouter(ThisHeader)