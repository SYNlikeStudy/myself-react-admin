import React,{Component} from 'react'
import {Layout} from 'antd'
import {Switch,Route,Redirect} from 'react-router-dom'

import MemoryUtils from '../../utils/memoryUtils'
import LeftNav from "../../components/left-nav/index";
import ThisHeader from "../../components/header";
import ThisFooter from "../../components/footer/index";
import Home from "../home";
import Category from "../category/index";
import Product from "../product/product";
import User from "../user/index";
import Role from "../role/index";
import ChartsBat from "../charts-bar/index";
import ChartsLine from "../charts-line/index";
import ChartsPie from "../charts-pie/index";
import './index.less'

const {Sider, Content,} = Layout;

export default class Admin extends Component{
  render(){
    //读取用户是否登录过
    const value = MemoryUtils.user
    if(!value || !value._id){
      return <Redirect to="/login"/>
    }
    return(
        <Layout style={{height:'100vh'}}>
          <Sider>
            <LeftNav/>
          </Sider>
          <Layout>
              <ThisHeader/>
            <Content className="switch">
                <Switch>
                  <Route path="/home" component={Home}/>
                  <Route path="/category" component={Category}/>
                  <Route path="/product" component={Product}/>
                  <Route path="/user" component={User}/>
                  <Route path="/role" component={Role}/>
                  <Route path="/charts/bar" component={ChartsBat}/>
                  <Route path="/charts/line" component={ChartsLine}/>
                  <Route path="/charts/pie" component={ChartsPie}/>
                  <Redirect to="/home"/>
                </Switch>
            </Content>
              <ThisFooter/>
          </Layout>
        </Layout>
    )
  }
}