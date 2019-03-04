import React,{Component} from 'react'
import {NavLink,withRouter} from 'react-router-dom'
import {Menu,Icon} from 'antd'
import imgSrc from '../../assets/image/logo.png'
import './index.less'
import menuList from '../../config/menuConfig'
const Item = Menu.Item
const SubMenu = Menu.SubMenu

class LeftNav extends Component{
  componentWillMount(){
    this.menu = this.createMenu(menuList)
  }
  createMenu = (menu) => {
    return menu.map(item=>{
      if(item.children){
        const {pathname} = this.props.location
        const result = item.children.find(item=>pathname.indexOf(item.key)===0)
        if(result){
          this.openKey=item.key
        }
        return(
          <SubMenu key={item.key} title={<span><Icon type={item.icon} /><span>{item.title}</span></span>}>
            {this.createMenu(item.children)}
          </SubMenu>
        )
      }else{
        return(
          <Item key={item.key}>
            <NavLink to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </NavLink>
          </Item>
        )
      }
    })
  }
  render(){
    let {pathname} = this.props.location
    if(/^\/product/.test(pathname)){
      pathname = '/product'
    }
    return(
      <div className="leftNav">
        <NavLink to="/home" className="leftHeader">
          <img src={imgSrc} alt="logo" className="adminLogo"/>
          <h3>硅谷后台</h3>
        </NavLink>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[pathname]}
          defaultOpenKeys={[this.openKey]}
        >
          {this.menu}
        </Menu>
      </div>
    )
  }
}
export default withRouter(LeftNav)